import { ITaskCalendar } from "../../Interface/ITaskCalenderAPI";
import { Task } from "../../types/Task";
import { MAX_VALUE_OF_ID, MIN_VALUE_OF_ID } from "../../config/config";

export namespace LocalStorage {
  export class TaskCalendar implements ITaskCalendar {
    tasksID: Task["id"][] = [];

    private storage: Task[];

    constructor() {
      this.storage = [];
      if (localStorage.getItem("taskCalendar")) {
        this.storage = JSON.parse(
          localStorage.getItem("taskCalendar") as string
        );
      } else {
        localStorage.setItem("taskCalendar", JSON.stringify(this.storage));
      }
    }

    public async createTask(task: Task): Promise<Task[]> {
      const newStorage = [...this.storage];
      const newTasksID = [...this.tasksID];
      if (task.id === undefined) {
        const newTask = await this.createID(task);
        newStorage.push(newTask);
      } else {
        newStorage.push(task);
      }
      newTasksID.push(newStorage[newStorage.length - 1].id);
      localStorage.setItem("taskCalendar", JSON.stringify(newStorage));
      this.storage = newStorage;
      this.tasksID = newTasksID;
      return newStorage;
    }

    public async read(id?: Task["id"]): Promise<Task | Task[]> {
      const result = id
        ? this.storage.filter((el: Task) => el.id === id)[0]
        : this.storage;
      return result;
    }

    public async update(
      id: Task["id"],
      updateTask: Partial<Task>
    ): Promise<Task> {
      const newTask = { ...((await this.read(id)) as Task) };
      const storage = [...this.storage];
      Object.keys(newTask).forEach((el) => {
        if (updateTask[el]) {
          newTask[el] = updateTask[el];
        }
      });
      const newStorage = storage.map((el: Task) =>
        el.id === id ? newTask : el
      );
      localStorage.setItem("taskCalendar", JSON.stringify(newStorage));
      this.storage = newStorage;
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
