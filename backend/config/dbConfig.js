const { Sequelize } = require('sequelize');
console.log(process.env.DATABASE, process.env.USERNAME, process.env.password)
const sequelize = new Sequelize(process.env.SQL_URL);


  async function connect(){
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }

  module.exports = {
    connect,sequelize
  }