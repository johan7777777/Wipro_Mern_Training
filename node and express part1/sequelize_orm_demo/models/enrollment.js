const {DataTypes} = require("sequelize");
const sequelize =require("../db/connection.js");

const Enrollment=sequelize.define("Enrollment",{
    enrolledAt:{
        type:DataTypes.DATE,
        defaultValue:DataTypes.NOW
    }
})
module.exports=Enrollment;