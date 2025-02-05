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
const appRoutes_1 = __importDefault(require("./router/appRoutes"));
const config_1 = __importDefault(require("./Database/config"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = 8000;
app.use(body_parser_1.default.json());
app.use("/", appRoutes_1.default);
app.listen(PORT, () => console.log("Server started"));
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield config_1.default.authenticate();
        console.log("Connection authenticated");
        yield config_1.default.sync({ alter: true });
        console.log("Database synchronised");
    }
    catch (error) {
        console.log("error connecing to db");
    }
});
startServer();
