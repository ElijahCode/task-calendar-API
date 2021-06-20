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
exports.FireBase = void 0;
const firebase_1 = __importDefault(require("firebase"));
const config_1 = require("../../config/config");
firebase_1.default.initializeApp(config_1.FIREBASE_CONFIG);
var FireBase;
(function (FireBase) {
    class TaskCalendar {
        constructor(placement) {
            this.tasksID = [];
            this.placement = "Tasks";
            this.placement = placement === undefined ? this.placement : placement;
        }
        createTask(newTask) {
            return __awaiter(this, void 0, void 0, function* () {
                firebase_1.default.database().ref(this.placement).push(newTask);
                const storage = yield (yield firebase_1.default.database().ref(this.placement).once("value")).val();
                this.tasksID = Object.keys(storage);
                const result = Object.values(storage);
                return result;
            });
        }
        read(id) {
            return __awaiter(this, void 0, void 0, function* () {
                const task = yield (yield firebase_1.default.database().ref(`${this.placement}/${id}`).once("value")).val();
                return task;
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
                yield firebase_1.default.database().ref(`${this.placement}/${id}`).set(newTask);
                return newTask;
            });
        }
        delete(id) {
            return __awaiter(this, void 0, void 0, function* () {
                yield firebase_1.default.database().ref(`${this.placement}/${id}`).remove();
                this.tasksID = this.tasksID.filter((el) => el !== id);
            });
        }
        filterByDate(filtredDate) {
            return __awaiter(this, void 0, void 0, function* () {
                const storage = Object.values(yield (yield firebase_1.default.database().ref(this.placement).once("value")).val());
                return storage.filter((el) => el.date === filtredDate.toString());
            });
        }
        filterByDescription(description) {
            return __awaiter(this, void 0, void 0, function* () {
                const storage = Object.values(yield (yield firebase_1.default.database().ref(this.placement).once("value")).val());
                return storage.filter((el) => el.description === description);
            });
        }
        filterByStatus(status) {
            return __awaiter(this, void 0, void 0, function* () {
                const storage = Object.values(yield (yield firebase_1.default.database().ref(this.placement).once("value")).val());
                return storage.filter((el) => el.status === status);
            });
        }
        filterByTag(tag) {
            return __awaiter(this, void 0, void 0, function* () {
                const storage = Object.values(yield (yield firebase_1.default.database().ref(this.placement).once("value")).val());
                return storage.filter((el) => el.tag === tag);
            });
        }
    }
    FireBase.TaskCalendar = TaskCalendar;
})(FireBase = exports.FireBase || (exports.FireBase = {}));
