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
const express_1 = __importDefault(require("express"));
const logic_1 = require("./logic");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post("/filter", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const emp = req.body;
    let result = (0, logic_1.filterdata)(emp);
    res.json(result);
}));
app.post("/mapdata", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const emp = req.body;
    let result = (0, logic_1.mapdata)(emp);
    res.json(result);
}));
app.post("/reducedata", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const emp = req.body;
    let result = (0, logic_1.reducedata)(emp);
    res.json(result);
}));
app.post("/finddata", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const emp = req.body;
    let result = (0, logic_1.finddata)(emp);
    console.log(result);
    res.json(result);
}));
app.post("/includdata", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const emp = req.body;
    let result = (0, logic_1.includdata)(emp);
    res.json(result);
}));
app.post("/mapdata1", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const person = req.body;
    let result = (0, logic_1.flatMapdata)(person);
    console.log(result);
    res.json(result);
}));
app.post("/groupbyhobbies", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const persons = req.body;
    let result = (0, logic_1.groupByHobbies)(persons);
    res.json(result);
}));
app.post("/sortByAge", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const persons = req.body;
    let result = (0, logic_1.sortByAge)(persons);
    res.json(result);
}));
app.post("/gethobbies", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const persons = req.body;
    let result = (0, logic_1.getUniqueHobbies)(persons);
    res.json(result);
}));
app.post("/shifthobbies", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const persons = req.body;
    let result = (0, logic_1.shiftHobbies)(persons);
    res.json(result);
}));
const PORT = 8000;
app.listen(PORT, () => console.log("Server connected"));
