"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logic_1 = require("./logic");
const postgres_1 = require("./postgres/postgres");
(0, postgres_1.connection)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post('/data', (req, res) => {
    const data = req.body.items;
    const result = (0, logic_1.handleFilterdata)(data);
    result.forEach(orderId => {
        (0, logic_1.insertdata)(orderId);
    });
    res.status(200).json({
        status: "success",
        data: {
            result: result
        }
    });
});
app.listen(8000, () => console.log('server started'));
