"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Employee_1 = __importDefault(require("./Employee"));
const Shift_1 = __importDefault(require("./Shift"));
const TimeSheet_1 = __importDefault(require("./TimeSheet"));
Employee_1.default.hasMany(Shift_1.default, { foreignKey: 'empid' });
Shift_1.default.belongsTo(Employee_1.default, { foreignKey: 'empid' });
Shift_1.default.hasOne(TimeSheet_1.default, { foreignKey: 'shift_id' });
TimeSheet_1.default.belongsTo(Shift_1.default, { foreignKey: 'shift_id' });
