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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_1 = __importDefault(require("firebase"));
const TaskCalendarClass_1 = require("./TaskCalendarClass");
const utils_1 = require("../../utils/utils");
const taskCalendar = new TaskCalendarClass_1.FireBase.TaskCalendar("TestTasks");
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield firebase_1.default.database().ref(taskCalendar.placement).remove();
}));
it("task calendar must contain task", () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield taskCalendar.createTask(utils_1.someTask);
    expect(result).toEqual([utils_1.someTask]);
}));
it("Must return task", () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield taskCalendar.read(taskCalendar.tasksID[0]);
    expect(result).toEqual(utils_1.someTask);
}));
it("Must change task", () => __awaiter(void 0, void 0, void 0, function* () {
    yield taskCalendar.update(taskCalendar.tasksID[0], { status: "done" });
    const resultTask = yield taskCalendar.read(taskCalendar.tasksID[0]);
    expect(resultTask.status).toBe("done");
}));
it("Must delete task", () => __awaiter(void 0, void 0, void 0, function* () {
    const storageFirstElem = yield taskCalendar.read(taskCalendar.tasksID[0]);
    expect(storageFirstElem).not.toBe([]);
    yield taskCalendar.delete(taskCalendar.tasksID[0]);
    const result = yield (yield firebase_1.default.database().ref(taskCalendar.placement).once("value")).val();
    expect(result).toEqual(null);
    expect(taskCalendar.tasksID).toEqual([]);
}));
it("Must filter tasks by data", () => __awaiter(void 0, void 0, void 0, function* () {
    // eslint-disable-next-line no-restricted-syntax
    for (const task of utils_1.someTasks) {
        // eslint-disable-next-line no-await-in-loop
        yield taskCalendar.createTask(task);
    }
    const result = yield taskCalendar.filterByDate(new Date(2021, 5, 11));
    expect(result[0]).toEqual(utils_1.someTasks[0]);
}));
it("Must filter tasks by description", () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield taskCalendar.filterByDescription("Call dad!");
    expect(result[0]).toEqual(utils_1.someTasks[1]);
}));
it("Must filter tasks by status", () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield taskCalendar.filterByStatus("in work");
    expect(result[0]).toEqual(utils_1.someTasks[2]);
}));
it("Must filter tasks by tag", () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield taskCalendar.filterByTag("regular priority");
    expect(result).toEqual([utils_1.someTasks[0], utils_1.someTasks[3]]);
}));
