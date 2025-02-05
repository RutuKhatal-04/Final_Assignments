"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../database/config"));
class Timesheet extends sequelize_1.Model {
}
Timesheet.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    empid: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    shift_id: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    projectName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    taskName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    fromDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    endDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    }
}, {
    sequelize: config_1.default,
    tableName: 'Timesheet',
    timestamps: true
});
exports.default = Timesheet;
