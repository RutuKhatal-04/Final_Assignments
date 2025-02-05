"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../database/config"));
class lineItem extends sequelize_1.Model {
}
lineItem.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    particular: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    amount: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    // sow_id:{
    //     type:DataTypes.INTEGER,
    //     allowNull:false
    // }
}, {
    sequelize: config_1.default,
    modelName: "lineItems",
    timestamps: true
});
exports.default = lineItem;
