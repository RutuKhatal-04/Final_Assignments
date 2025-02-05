"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../database/config"));
class Organization extends sequelize_1.Model {
}
Organization.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    gstNo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        field: 'gstno',
    },
    panNo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        field: 'panno',
    },
    shortName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        field: 'shortname',
    },
    contactName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        field: 'contactname',
    },
    displayName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        field: 'displayname',
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        field: 'email',
    },
    addressId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        field: 'addressid',
    },
    phone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        field: 'phone',
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        field: 'password',
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        field: 'created_at',
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        field: 'updated_at',
    },
}, {
    sequelize: config_1.default,
    tableName: 'organization',
    timestamps: true,
});
// Organization.hasMany(Customer, {
//     foreignKey: 'orgId',
//     as: 'clients'
// });
exports.default = Organization;
