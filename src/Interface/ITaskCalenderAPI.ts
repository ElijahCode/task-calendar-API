import {task} from '../types/task'

export interface ITaskCalendar {
    task: task[];
    constructor(): Promise<void>;

    createTask(newTask: task): Promise<task[]>;
    read(id: task['id']): Promise<task>; // позже уточнить возвращаемый таск, а именно то что он идет с определенным id
    update(updatedTask: Partial<task>): Promise<task>;
    delete(id: task['id']): Promise<void>;


    // сгрести в один filter через перегрузку?
    filterByData(data: task["date"], filtredDate: Date): Promise<task[]>;
    filterByDescription(description: task['description']): Promise<task[]>;
    filterByStatus(status: task['status']): Promise<task[]>;
    filterByTag(tag: task['tag']): Promise<task[]>;
}