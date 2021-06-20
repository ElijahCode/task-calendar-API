import { Task } from "../types/Task";

export interface ITaskCalendar {
  tasksID: string[] | Task["id"][];

  createTask(newTask: Task): Promise<Task[]>;
  read(id: Task["id"] | string): Promise<Task | Task[]>;
  update(id: Task["id"] | string, updatedTask: Partial<Task>): Promise<Task>;
  delete(id: Task["id"] | string): Promise<void>;

  filterByDate(filtredDate: Date): Promise<Task[]>;
  filterByDescription(description: Task["description"]): Promise<Task[]>;
  filterByStatus(status: Task["status"]): Promise<Task[]>;
  filterByTag(tag: Task["tag"]): Promise<Task[]>;
}
