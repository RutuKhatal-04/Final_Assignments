"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../Database/config"));
const sequelize_1 = require("sequelize");
class Weather extends sequelize_1.Model {
}
Weather.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    city: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    country: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    weather: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    Latitude: {
        type: sequelize_1.DataTypes.STRING,
    },
    Longitude: {
        type: sequelize_1.DataTypes.STRING,
    }
}, {
    sequelize: config_1.default,
    tableName: 'weather',
    timestamps: true,
});
exports.default = Weather;
