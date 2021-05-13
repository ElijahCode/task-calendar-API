import { ITaskCalendar } from "../../Interface/ITaskCalenderAPI";
import { Task } from "../../types/Task";

export class TaskCalendar implements ITaskCalendar {
  tasksID: Task["id"][] = [];

  constructor() {}

  async createTask(newTask: Task): Promise<Task[]> {}

  async read(id: Task["id"]): Promise<Task> {}

  async update(id: Task["id"], updateTask: Partial<Task>): Promise<Task> {}

  async delete(id: Task["id"]): Promise<void> {}

  async filterByData(filtredDate: Date): Promise<Task[]> {}

  async filterByDescription(
    description: Task["description"]
  ): Promise<Task[]> {}

  async filterByStatus(status: Task["status"]): Promise<Task[]> {}

  async filterByTag(tag: Task["tag"]): Promise<Task[]> {}
}
