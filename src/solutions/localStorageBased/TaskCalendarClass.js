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
exports.LocalStorage = void 0;
const config_1 = require("../../config/config");
var LocalStorage;
(function (LocalStorage) {
    class TaskCalendar {
        constructor() {
            this.tasksID = [];
            this.storage = [];
            localStorage.setItem("taskCalendar", JSON.stringify(this.storage));
        }
        createTask(task) {
            return __awaiter(this, void 0, void 0, function* () {
                const newTask = yield this.createID(task);
                this.storage.push(newTask);
                this.tasksID.push(this.storage[this.storage.length - 1].id);
                localStorage.setItem("taskCalendar", JSON.stringify(this.storage));
                return this.storage;
            });
        }
        read(id) {
            return __awaiter(this, void 0, void 0, function* () {
                const result = id ? this.storage.filter((el) => el.id === id)[0] : this.storage;
                return result;
            });
        }
        update(id, updateTask) {
            return __awaiter(this, void 0, void 0, function* () {
                const newTask = yield this.read(id);
                Object.keys(newTask).forEach((el) => {
                    if (updateTask[el]) {
                        newTask[el] = updateTask[el];
                    }
                });
                localStorage.setItem("taskCalendar", JSON.stringify(this.storage.map((el) => (el.id === id ? newTask : el))));
                return newTask;
            });
        }
        delete(id) {
            return __awaiter(this, void 0, void 0, function* () {
                const preNewStorage = this.storage.filter((el) => el.id !== id);
                const newStorage = preNewStorage === null ? [] : preNewStorage;
                this.storage = newStorage;
                localStorage.setItem("taskCalendar", JSON.stringify(newStorage));
                const newTasksID = this.tasksID.filter((el) => el !== id);
                this.tasksID = newTasksID === null ? [] : newTasksID;
            });
        }
        filterByDate(filtredDate) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.storage.filter((el) => JSON.stringify(el.date) === JSON.stringify(filtredDate.toString()));
            });
        }
        filterByDescription(description) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.storage.filter((el) => el.description === description);
            });
        }
        filterByStatus(status) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.storage.filter((el) => el.status === status);
            });
        }
        filterByTag(tag) {
            return __awaiter(this, void 0, void 0, function* () {
                return this.storage.filter((el) => el.tag === tag);
            });
        }
        createID(task) {
            return __awaiter(this, void 0, void 0, function* () {
                const preID = Math.floor(Math.random() * (config_1.MAX_VALUE_OF_ID - config_1.MIN_VALUE_OF_ID) + config_1.MIN_VALUE_OF_ID);
                const id = this.storage.filter((el) => el.id === preID).length === 0
                    ? preID
                    : this.createID(task);
                const newTask = Object.assign({}, task);
                newTask.id = id;
                return newTask;
            });
        }
    }
    LocalStorage.TaskCalendar = TaskCalendar;
})(LocalStorage = exports.LocalStorage || (exports.LocalStorage = {}));
