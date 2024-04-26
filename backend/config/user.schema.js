const {sequelize} = require("./dbConfig");

const {DataTypes} = require("sequelize")

const userModel = sequelize.define("userData",{
    name:{type:DataTypes.STRING,allowNull:false},
    resume:{type:DataTypes.STRING,allowNull:false},
    password:{type:DataTypes.STRING,allowNull:false},
},{
    timestamps:false
})

module.exports = userModel;