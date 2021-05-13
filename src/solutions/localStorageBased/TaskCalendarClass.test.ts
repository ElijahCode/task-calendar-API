import { TaskCalendar } from "./TaskCalendarClass";
import { someTask, sleep, someTasks } from "../../utils/utils";

const taskCalendar = new TaskCalendar();

it("LocalStorage have taskCalendar", async () => {
  expect(localStorage.getItem("taskCalendar")).toBe(JSON.stringify([]));
});

it("task calendar must contain task", async () => {
  await taskCalendar.createTask(someTask);

  await sleep(10);

  expect(localStorage.getItem("taskCalendar")).toEqual(
    JSON.stringify([someTask])
  );
});

it("Must return task", async () => {
  const result = await taskCalendar.read(taskCalendar.tasksID[0]);

  await sleep(10);

  expect(result).toEqual(someTask);
});

it("Must change task", async () => {
  await taskCalendar.update(taskCalendar.tasksID[0], { status: "done" });

  const result = { ...someTask };
  result.status = "done";

  await sleep(10);

  expect(localStorage.getItem("taskCalendar")).toEqual(
    JSON.stringify([result])
  );
});

it("Must delete task", async () => {
  await taskCalendar.delete(taskCalendar.tasksID[0]);

  await sleep(10);

  expect(localStorage.getItem("tasksCalendar")).toEqual(JSON.stringify([]));
});

it("Must filter tasks by data", async () => {
  someTasks.forEach(async (el) => {
    await taskCalendar.createTask(el);
  });

  const result = await taskCalendar.filterByData(new Date(2021, 5, 11));

  await sleep(10);

  expect(result).toEqual(someTask);
});

it("Must filter tasks by description", async () => {
  const result = await taskCalendar.filterByDescription(
    "Prepare to my birthday!"
  );

  await sleep(10);

  expect(result).toEqual(someTask);
});

it("Must filter tasks by status", async () => {
  const result = await taskCalendar.filterByStatus("waiting to get it in work");

  await sleep(10);

  expect(result).toEqual(someTask);
});

it("Must filter tasks by tag", async () => {
  const result = await taskCalendar.filterByTag("regular priority");

  await sleep(10);

  expect(result).toEqual(someTask);
});
