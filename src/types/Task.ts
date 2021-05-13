export type Task = {
  date: Date;
  description: string;
  status: "in work" | "done" | "waiting to get it in work";
  tag: "high priority" | "low priority" | "regular priority";
  id?: number;
};
