const { Sequelize } = require('sequelize');
const config = require('./config.json').database;

class Database {
    constructor() {
        this.sequelize = new Sequelize(config.database, config.username, config.password, {
            host: config.host,
            dialect: config.dialect
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