import { Task } from "../types/Task";

export interface ITaskCalendar {
  tasksID: Task["id"][];

  createTask(newTask: Task): Promise<Task[]>;
  read(id: Task["id"]): Promise<Task>; // позже уточнить возвращаемый таск, а именно то что он идет с определенным id
  update(id: Task["id"], updatedTask: Partial<Task>): Promise<Task>;
  delete(id: Task["id"]): Promise<void>;

  // сгрести в один filter через перегрузку?
  filterByData(filtredDate: Date): Promise<Task[]>;
  filterByDescription(description: Task["description"]): Promise<Task[]>;
  filterByStatus(status: Task["status"]): Promise<Task[]>;
  filterByTag(tag: Task["tag"]): Promise<Task[]>;
}
