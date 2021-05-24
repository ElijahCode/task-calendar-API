import { LocalStorage } from "./TaskCalendarClass";
import { someTask, someTasks } from "../../utils/utils";
import { Task } from "../../types/Task";

const taskCalendar = new LocalStorage.TaskCalendar();

it("LocalStorage have taskCalendar", async () => {
  expect(localStorage.getItem("taskCalendar")).toEqual(JSON.stringify([]));
});

it("task calendar must contain task with different ID", async () => {
  await taskCalendar.createTask(someTask);

  expect(localStorage.getItem("taskCalendar")).toEqual(
    JSON.stringify([someTask])
  );
  // eslint-disable-next-line no-restricted-syntax
  for (const el of [someTask, someTask, someTask]) {
    // eslint-disable-next-line no-await-in-loop
    await taskCalendar.createTask(el);
  }

  const storage = JSON.parse(localStorage.getItem("taskCalendar") as string);
  let idIsDuplicated = false;
  storage
    .map((el: Task) => el.id)
    .sort()
    .forEach((el: Task["id"], index: number) => {
      idIsDuplicated = el === storage[index + 1] ? true : idIsDuplicated;
    });
  expect(idIsDuplicated).toBe(false);
});

it("Must return task", async () => {
  const result = await taskCalendar.read(taskCalendar.tasksID[0]);

  expect(result).toEqual(
    JSON.parse(localStorage.getItem("taskCalendar") as string)[0]
  );
});

it("Must change task", async () => {
  await taskCalendar.update(taskCalendar.tasksID[0], { status: "done" });

  const resultTask = await taskCalendar.read(taskCalendar.tasksID[0]);

  expect(resultTask.status).toBe("done");
});

it("Must delete task", async () => {
  const IDs = taskCalendar.tasksID;
  // eslint-disable-next-line no-restricted-syntax
  for (const id of IDs) {
    // eslint-disable-next-line no-await-in-loop
    await taskCalendar.delete(id);
  }
  expect(localStorage.getItem("taskCalendar")).toEqual(JSON.stringify([]));
  expect(taskCalendar.tasksID).toEqual([]);
});

it("Must filter tasks by data", async () => {
  // eslint-disable-next-line no-restricted-syntax
  for (const task of someTasks) {
    // eslint-disable-next-line no-await-in-loop
    await taskCalendar.createTask(task);
  }

  const result = await taskCalendar.filterByDate(new Date(2021, 5, 11));

  expect(result[0]).toEqual(
    JSON.parse(localStorage.getItem("taskCalendar") as string)[0]
  );
});

it("Must filter tasks by description", async () => {
  const result = await taskCalendar.filterByDescription(
    "Prepare to my birthday!"
  );

  expect(result[0]).toEqual(
    JSON.parse(localStorage.getItem("taskCalendar") as string)[0]
  );
});

it("Must filter tasks by status", async () => {
  const result = await taskCalendar.filterByStatus("waiting to get it in work");

  expect(result[0]).toEqual(
    JSON.parse(localStorage.getItem("taskCalendar") as string)[0]
  );
});

it("Must filter tasks by tag", async () => {
  const result = await taskCalendar.filterByTag("regular priority");

  expect(result[0]).toEqual(
    JSON.parse(localStorage.getItem("taskCalendar") as string)[0]
  );
});
