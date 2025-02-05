import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/config';
import Customer from './Customer';

class Organization extends Model {
    public id!: number;
    public gstNo!: string;
    public panNo!: string;
    
    
    public shortName!: string;
    public contactName!: string;
    public displayName!: string;
    public email!: string;
    public addressId!: string;
    public phone!: string;
    public password!: string;
}Organization.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    gstNo: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'gstno',
    },
    panNo: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'panno',
    },
    shortName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'shortname',
    },
    contactName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'contactname',
    },
    displayName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'displayname',
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'email',
    },
    addressId: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'addressid',
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'phone',
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'password',
    },
    createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
    },
    updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at',
    },
}, {
    sequelize,
    tableName: 'organization',
    timestamps: true,
});

// Organization.hasMany(Customer, {
//     foreignKey: 'orgId',
//     as: 'clients'
// });
export default Organization;