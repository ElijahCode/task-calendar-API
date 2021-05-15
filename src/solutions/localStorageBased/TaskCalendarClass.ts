import { ITaskCalendar } from "../../Interface/ITaskCalenderAPI";
import { Task } from "../../types/Task";
import { MAX_VALUE_OF_ID, MIN_VALUE_OF_ID } from './config'

export class TaskCalendar implements ITaskCalendar {
  tasksID: Task["id"][] = [];

  constructor() {
    localStorage.setItem("taskCalendar", JSON.stringify([]));
  }

  public async createTask(newTask: Task): Promise<Task[]> {
    const storage = JSON.parse(localStorage.getItem("taskCalendar") as string);
    storage.push(await this.createID(newTask));
    this.tasksID.push(storage[storage.length - 1].id);
    localStorage.setItem("taskCalendar", JSON.stringify(storage));
    return storage;
  }

  // eslint-disable-next-line class-methods-use-this
  public async read(id: Task["id"]): Promise<Task> {
    const storage = JSON.parse(localStorage.getItem("taskCalendar") as string);
    return storage.filter((el: Task) => el.id === id)[0];
  }

  public async update(
    id: Task["id"],
    updateTask: Partial<Task>
  ): Promise<Task> {
    const newTask = await this.read(id);

    Object.keys(newTask).forEach((el) => {
      if (updateTask[el]) {
        newTask[el] = updateTask[el];
      }
    });

    const storage = JSON.parse(localStorage.getItem("taskCalendar") as string);
    localStorage.setItem(
      "taskCalendar",
      JSON.stringify(storage.map((el: Task) => (el.id === id ? newTask : el)))
    );
    return newTask;
  }

  public async delete(id: Task["id"]): Promise<void> {
    const storage = JSON.parse(localStorage.getItem("taskCalendar") as string);
    const preNewStorage = storage.filter((el: Task) => el.id !== id);
    const newStorage = preNewStorage === null ? [] : preNewStorage;
    localStorage.setItem("taskCalendar", JSON.stringify(newStorage));
    const newTasksID = this.tasksID.filter((el: Task["id"]) => el !== id);
    this.tasksID = newTasksID === null ? [] : newTasksID;
  }

  // eslint-disable-next-line class-methods-use-this
  public async filterByDate(filtredDate: Date): Promise<Task[]> {
    const storage = JSON.parse(localStorage.getItem("taskCalendar") as string);
    return storage.filter(
      (el: Task) => JSON.stringify(el.date) === JSON.stringify(filtredDate)
    );
  }

  // eslint-disable-next-line class-methods-use-this
  public async filterByDescription(
    description: Task["description"]
  ): Promise<Task[]> {
    const storage = JSON.parse(localStorage.getItem("taskCalendar") as string);
    return storage.filter((el: Task) => el.description === description);
  }

  // eslint-disable-next-line class-methods-use-this
  public async filterByStatus(status: Task["status"]): Promise<Task[]> {
    const storage = JSON.parse(localStorage.getItem("taskCalendar") as string);
    return storage.filter((el: Task) => el.status === status);
  }

  // eslint-disable-next-line class-methods-use-this
  public async filterByTag(tag: Task["tag"]): Promise<Task[]> {
    const storage = JSON.parse(localStorage.getItem("taskCalendar") as string);
    return storage.filter((el: Task) => el.tag === tag);
  }

  private async createID(task: Task): Promise<Task> {
    const storage = JSON.parse(localStorage.getItem("taskCalendar") as string);
    const preID = Math.floor(Math.random() * (MAX_VALUE_OF_ID - MIN_VALUE_OF_ID) + MIN_VALUE_OF_ID);

    const id =
      storage.filter((el: Task) => el.id === preID).length === 0
        ? preID
        : this.createID(task);
    const newTask = task;
    newTask.id = id as number;

    return newTask;
  }
}
