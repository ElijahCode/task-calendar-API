"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.someTasks = exports.someTask = void 0;
exports.someTask = {
    date: new Date(2021, 5, 11).toString(),
    description: "Prepare to my birthday!",
    status: "waiting to get it in work",
    tag: "low priority",
};
exports.someTasks = [
    {
        date: new Date(2021, 5, 11).toString(),
        description: "Prepare to my birthday!",
        status: "waiting to get it in work",
        tag: "regular priority",
    },
    {
        date: new Date(2021, 6, 8).toString(),
        description: "Call dad!",
        status: "done",
        tag: "high priority",
    },
    {
        date: new Date(2021, 2, 5).toString(),
        description: "Send gift to friend!",
        status: "in work",
        tag: "low priority",
    },
    {
        date: new Date(2022, 3, 17).toString(),
        description: "Await relesase Victoria III",
        status: "waiting to get it in work",
        tag: "regular priority",
    },
];
