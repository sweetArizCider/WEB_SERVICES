const { Sequelize } = require('sequelize');
const config = require('./config.json').database;
const DB_HOST = process.env.DB_HOST;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

class Database {
    constructor() {
        this.sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
            host: DB_HOST,
            port: config.port,
            ssl: config.ssl,
            dialect: config.dialect,
            dialectOptions: {
                ssl: config.ssl
            }
        });
    }

    async connect() {
        try {
            await this.sequelize.authenticate();
            console.log('Connection has been established successfully');
        } catch (error) {
            console.log('Unable to connect to the database:', error);
        }
    }

    async syncModels() {
        try {
            await this.sequelize.sync({ alter: true }); // Use { force: true } to drop and recreate tables
            console.log('Database synchronized');
        } catch (error) {
            console.log('Unable to synchronize the database:', error);
        }
    }

    get getSequelize() {
        return this.sequelize;
    }
}

if (!global.database_singletone) {
    global.database_singletone = new Database();
    global.database_singletone.connect();
}

module.exports = global.database_singletone;