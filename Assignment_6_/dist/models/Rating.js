"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../database/config"));
class Rating extends sequelize_1.Model {
}
Rating.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    userid: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    bookid: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    rating: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: config_1.default,
    tableName: "Review",
    timestamps: true
});
exports.default = Rating;
