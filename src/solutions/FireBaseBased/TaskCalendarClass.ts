import firebase from "firebase";
import { ITaskCalendar } from "../../Interface/ITaskCalenderAPI";
import { Task } from "../../types/Task";

const firebaseConfig = {
  apiKey: "AIzaSyDCjqlnAqo4dnvftGk9gQIQs6dMjb7rGaM",
  authDomain: "taskcalendarapi.firebaseapp.com",
  databaseURL:
    "https://taskcalendarapi-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "taskcalendarapi",
  storageBucket: "taskcalendarapi.appspot.com",
  messagingSenderId: "321684884651",
  appId: "1:321684884651:web:819fd94bcb4793c5c37bee",
  measurementId: "G-EERJEG7QRE",
};

firebase.initializeApp(firebaseConfig);

export class TaskCalendarClass implements ITaskCalendar {
  public tasksID: string[] = [];

  public placement = "Tasks";

  constructor(placement?: string) {
    this.placement = placement === undefined ? this.placement : placement;
  }

  public async createTask(newTask: Task): Promise<Task[]> {
    firebase.database().ref(this.placement).push(newTask);
    const storage: Task[] = await (
      await firebase.database().ref(this.placement).once("value")
    ).val();
    this.tasksID = Object.keys(storage);
    const result: Task[] = Object.values(storage);
    return result;
  }

  public async read(id: string): Promise<Task> {
    const task: Task = await (
      await firebase.database().ref(`${this.placement}/${id}`).once("value")
    ).val();
    return task;
  }

  public async update(id: string, updateTask: Partial<Task>): Promise<Task> {
    const newTask = await this.read(id);

    Object.keys(newTask).forEach((el) => {
      if (updateTask[el]) {
        newTask[el] = updateTask[el];
      }
    });

    await firebase.database().ref(`${this.placement}/${id}`).set(newTask);
    return newTask;
  }

  public async delete(id: string): Promise<void> {
    await firebase.database().ref(`${this.placement}/${id}`).remove();
    this.tasksID = this.tasksID.filter((el) => el !== id);
  }

  public async filterByDate(filtredDate: Date): Promise<Task[]> {
    const storage: Task[] = Object.values(
      await (await firebase.database().ref(this.placement).once("value")).val()
    );
    return storage.filter((el: Task) => el.date === `${filtredDate}`);
  }

  public async filterByDescription(
    description: Task["description"]
  ): Promise<Task[]> {
    const storage: Task[] = Object.values(
      await (await firebase.database().ref(this.placement).once("value")).val()
    );
    return storage.filter((el: Task) => el.description === description);
  }

  public async filterByStatus(status: Task["status"]): Promise<Task[]> {
    const storage: Task[] = Object.values(
      await (await firebase.database().ref(this.placement).once("value")).val()
    );
    return storage.filter((el: Task) => el.status === status);
  }

  public async filterByTag(tag: Task["tag"]): Promise<Task[]> {
    const storage: Task[] = Object.values(
      await (await firebase.database().ref(this.placement).once("value")).val()
    );
    return storage.filter((el: Task) => el.tag === tag);
  }
}
