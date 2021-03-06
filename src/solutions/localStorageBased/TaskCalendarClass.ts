import { ITaskCalendar } from "../../Interface/ITaskCalenderAPI";
import { Task } from "../../types/Task";
import { MAX_VALUE_OF_ID, MIN_VALUE_OF_ID } from "../../config/config";

export namespace LocalStorage {
  export class TaskCalendar implements ITaskCalendar {
    tasksID: Task["id"][] = [];

    private storage: Task[];

    constructor() {
      this.storage = [];
      localStorage.setItem("taskCalendar", JSON.stringify(this.storage));
    }

    public async createTask(newTask: Task): Promise<Task[]> {
      this.storage.push(await this.createID(newTask));
      this.tasksID.push(this.storage[this.storage.length - 1].id);
      localStorage.setItem("taskCalendar", JSON.stringify(this.storage));
      return this.storage;
    }

    public async read(id: Task["id"]): Promise<Task> {
      return this.storage.filter((el: Task) => el.id === id)[0];
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

      localStorage.setItem(
        "taskCalendar",
        JSON.stringify(
          this.storage.map((el: Task) => (el.id === id ? newTask : el))
        )
      );
      return newTask;
    }

    public async delete(id: Task["id"]): Promise<void> {
      const preNewStorage = this.storage.filter((el: Task) => el.id !== id);
      const newStorage = preNewStorage === null ? [] : preNewStorage;
      this.storage = newStorage;
      localStorage.setItem("taskCalendar", JSON.stringify(newStorage));
      const newTasksID = this.tasksID.filter((el: Task["id"]) => el !== id);
      this.tasksID = newTasksID === null ? [] : newTasksID;
    }

    public async filterByDate(filtredDate: Date): Promise<Task[]> {
      return this.storage.filter(
        (el: Task) =>
          JSON.stringify(el.date) === JSON.stringify(filtredDate.toString())
      );
    }

    public async filterByDescription(
      description: Task["description"]
    ): Promise<Task[]> {
      return this.storage.filter((el: Task) => el.description === description);
    }

    public async filterByStatus(status: Task["status"]): Promise<Task[]> {
      return this.storage.filter((el: Task) => el.status === status);
    }

    public async filterByTag(tag: Task["tag"]): Promise<Task[]> {
      return this.storage.filter((el: Task) => el.tag === tag);
    }

    private async createID(task: Task): Promise<Task> {
      const preID = Math.floor(
        Math.random() * (MAX_VALUE_OF_ID - MIN_VALUE_OF_ID) + MIN_VALUE_OF_ID
      );

      const id =
        this.storage.filter((el: Task) => el.id === preID).length === 0
          ? preID
          : this.createID(task);
      const newTask = { ...task };
      newTask.id = id as number;
      return newTask;
    }
  }
}
