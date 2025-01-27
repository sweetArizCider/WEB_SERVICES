const { Sequelize } = require('sequelize');
const config = require('./config.json').database;

class Database{

    async connect(){
        this.sequelize = new Sequelize(config.database, config.username, config.password,{
            host: config.host,
            dialect: config.dialect
        });

        try{
            await this.sequelize.authenticate();
            console.log('Connection has been established successfully');
        }catch(error){
            console.log('Unable to connect to the database:', error)
        }
    }

    get getSequelize (){
        return this.sequelize;
    }
}

if(!global.database_singletone){
    global.database_singletone = new Database();
    global.database_singletone.connect();
}

module.exports = global.database_singletone