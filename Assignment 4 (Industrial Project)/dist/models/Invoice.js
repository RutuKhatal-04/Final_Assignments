"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../database/config"));
class Invoice extends sequelize_1.Model {
}
Invoice.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    value: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    customer_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    pay_received: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    organization_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, { sequelize: config_1.default,
    tableName: "invoice",
    timestamps: true
});
exports.default = Invoice;
