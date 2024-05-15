import { Sequelize, DataTypes } from 'sequelize';
import { DB_HOST, DB_NAME, DB_PASS, DB_TABLE_CLIENT, DB_USER } from '../constants/constants';
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    dialect: 'mysql'
});

const Client = sequelize.define(DB_TABLE_CLIENT, {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    CIN: { type: DataTypes.STRING, validate: { len: [21, 21] } },
    PIN: { type: DataTypes.STRING, validate: { len: [6, 6] } },
    status: { type: DataTypes.STRING },
    address: { type: DataTypes.TEXT }
});

sequelize.sync();

export default Client;