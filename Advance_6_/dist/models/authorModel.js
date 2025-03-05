"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../database/config"));
class Author extends sequelize_1.Model {
}
Author.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    bio: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Bio for author'
    },
    birthdate: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: '1999-10-27'
    },
    isSystemUser: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    sequelize: config_1.default, tableName: "Author", timestamps: true
});
exports.default = Author;
//# sourceMappingURL=authorModel.js.map