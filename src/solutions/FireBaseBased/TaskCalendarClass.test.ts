import firebase from "firebase";
import { FireBase } from "./TaskCalendarClass";
import { someTask, someTasks } from "../../utils/utils";

const taskCalendar = new FireBase.TaskCalendar("TestTasks");
someTask.date = String(someTask.date);
someTasks.map((el) => {
  const newEl = el;
  newEl.date = `${el.date}`;
  return newEl;
});

afterAll(async () => {
  await firebase.database().ref(taskCalendar.placement).remove();
});

it("task calendar must contain task", async () => {
  const result = await taskCalendar.createTask(someTask);
  expect(result).toEqual([someTask]);
});

it("Must return task", async () => {
  const result = await taskCalendar.read(taskCalendar.tasksID[0]);
  expect(result).toEqual(someTask);
});

it("Must change task", async () => {
  await taskCalendar.update(taskCalendar.tasksID[0], { status: "done" });

  const resultTask = await taskCalendar.read(taskCalendar.tasksID[0]);

  expect(resultTask.status).toBe("done");
});

it("Must delete task", async () => {
  await taskCalendar.delete(taskCalendar.tasksID[0]);

  const result = await (
    await firebase.database().ref(taskCalendar.placement).once("value")
  ).val();
  expect(result).toEqual(null);
  expect(taskCalendar.tasksID).toEqual([]);
});

it("Must filter tasks by data", async () => {
  // eslint-disable-next-line no-restricted-syntax
  for (const task of someTasks) {
    // eslint-disable-next-line no-await-in-loop
    await taskCalendar.createTask(task);
  }

  const result = await taskCalendar.filterByDate(new Date(2021, 5, 11));

  expect(result[0]).toEqual(someTasks[0]);
});

it("Must filter tasks by description", async () => {
  const result = await taskCalendar.filterByDescription(
    "Prepare to my birthday!"
  );

  expect(result[0]).toEqual(someTasks[0]);
});

it("Must filter tasks by status", async () => {
  const result = await taskCalendar.filterByStatus("waiting to get it in work");

  expect(result[0]).toEqual(someTasks[0]);
});

it("Must filter tasks by tag", async () => {
  const result = await taskCalendar.filterByTag("regular priority");

  expect(result[0]).toEqual(someTasks[0]);
});
