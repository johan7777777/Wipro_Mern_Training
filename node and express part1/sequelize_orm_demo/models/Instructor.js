const {DataTypes} = require("sequelize");
const sequelize =require("../db/connection.js");

const Instructor=sequelize.define("Instructor",{
    name:{
        type:DataTypes.STRING,
        allowNull:false
    }
})
module.exports=Instructor;