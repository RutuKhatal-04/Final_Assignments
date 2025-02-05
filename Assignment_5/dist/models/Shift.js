"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../database/config"));
class Shift extends sequelize_1.Model {
}
Shift.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    empid: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    startTime: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    endTime: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    actualTime: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize: config_1.default,
    tableName: 'Shift',
    timestamps: true
});
exports.default = Shift;
