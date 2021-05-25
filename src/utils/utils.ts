import { Task } from "../types/Task";

export const someTask: Task = {
  date: new Date(2021, 5, 11).toString(),
  description: "Prepare to my birthday!",
  status: "waiting to get it in work",
  tag: "low priority",
};

export const someTasks: Task[] = [
  {
    date: new Date(2021, 5, 11).toString(),
    description: "Prepare to my birthday!",
    status: "waiting to get it in work",
    tag: "regular priority",
  },
  {
    date: new Date(2021, 6, 8).toString(),
    description: "Call dad!",
    status: "done",
    tag: "high priority",
  },
  {
    date: new Date(2021, 2, 5).toString(),
    description: "Send gift to friend!",
    status: "in work",
    tag: "low priority",
  },
  {
    date: new Date(2022, 3, 17).toString(),
    description: "Await relesase Victoria III",
    status: "waiting to get it in work",
    tag: "regular priority",
  },
];
