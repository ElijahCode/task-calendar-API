import { Task } from "../types/Task";

export const someTask: Task = {
  date: new Date(2021, 5, 11),
  description: "Prepare to my birthday!",
  status: "waiting to get it in work",
  tag: "low priority",
};

export const someTasks: Task[] = [
  {
    date: new Date(2021, 5, 11),
    description: "Prepare to my birthday!",
    status: "waiting to get it in work",
    tag: "regular priority",
  },
  {
    date: new Date(2021, 6, 8),
    description: "Call dad!",
    status: "done",
    tag: "high priority",
  },
  {
    date: new Date(2021, 2, 5),
    description: "Send gift to friend!",
    status: "in work",
    tag: "low priority",
  },
];

export const sleep = (x: number) =>
  new Promise((resolve) => setTimeout(resolve, x));
