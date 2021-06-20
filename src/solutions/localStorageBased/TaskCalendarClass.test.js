"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const TaskCalendarClass_1 = require("./TaskCalendarClass");
const utils_1 = require("../../utils/utils");
const taskCalendar = new TaskCalendarClass_1.LocalStorage.TaskCalendar();
it("LocalStorage have taskCalendar", () => __awaiter(void 0, void 0, void 0, function* () {
    expect(localStorage.getItem("taskCalendar")).toEqual(JSON.stringify([]));
}));
it("task calendar must contain task with different ID", () => __awaiter(void 0, void 0, void 0, function* () {
    // eslint-disable-next-line no-restricted-syntax
    for (const el of [utils_1.someTask, utils_1.someTask, utils_1.someTask, utils_1.someTask]) {
        // eslint-disable-next-line no-await-in-loop
        yield taskCalendar.createTask(el);
    }
    const storage = JSON.parse(localStorage.getItem("taskCalendar"));
    let idIsDuplicated = false;
    storage
        .map((el) => el.id)
        .sort()
        .forEach((el, index) => {
        idIsDuplicated = el === storage[index + 1] ? true : idIsDuplicated;
    });
    expect(idIsDuplicated).toBe(false);
}));
it("Must return task", () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield taskCalendar.read(taskCalendar.tasksID[0]);
    expect(result).toEqual(JSON.parse(localStorage.getItem("taskCalendar"))[0]);
}));
it("Must change task", () => __awaiter(void 0, void 0, void 0, function* () {
    yield taskCalendar.update(taskCalendar.tasksID[0], { status: "done" });
    const resultTask = yield taskCalendar.read(taskCalendar.tasksID[0]);
    expect(resultTask.status).toBe("done");
}));
it("Must delete task", () => __awaiter(void 0, void 0, void 0, function* () {
    const IDs = taskCalendar.tasksID;
    expect(JSON.parse(localStorage.getItem("taskCalendar"))).not.toBe([]);
    // eslint-disable-next-line no-restricted-syntax
    for (const id of IDs) {
        // eslint-disable-next-line no-await-in-loop
        yield taskCalendar.delete(id);
    }
    expect(localStorage.getItem("taskCalendar")).toEqual(JSON.stringify([]));
    expect(taskCalendar.tasksID).toEqual([]);
}));
it("Must filter tasks by data", () => __awaiter(void 0, void 0, void 0, function* () {
    // eslint-disable-next-line no-restricted-syntax
    for (const task of utils_1.someTasks) {
        // eslint-disable-next-line no-await-in-loop
        yield taskCalendar.createTask(task);
    }
    const result = yield taskCalendar.filterByDate(new Date(2021, 5, 11));
    expect(result[0]).toEqual(JSON.parse(localStorage.getItem("taskCalendar"))[0]);
}));
it("Must filter tasks by description", () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield taskCalendar.filterByDescription("Call dad!");
    expect(result[0]).toEqual(JSON.parse(localStorage.getItem("taskCalendar"))[1]);
}));
it("Must filter tasks by status", () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield taskCalendar.filterByStatus("in work");
    expect(result[0]).toEqual(JSON.parse(localStorage.getItem("taskCalendar"))[2]);
}));
it("Must filter tasks by tag", () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield taskCalendar.filterByTag("regular priority");
    expect(result).toEqual([
        JSON.parse(localStorage.getItem("taskCalendar"))[0],
        JSON.parse(localStorage.getItem("taskCalendar"))[3],
    ]);
}));
