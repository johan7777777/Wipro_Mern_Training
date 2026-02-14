const sequelize =require("../db/connection.js");
const Course = require("./Course.js");
const Instructor = require("./Instructor.js");
const Enrollment = require("./enrollment.js");
const Studentss = require("./Studentss.js");
Instructor.hasMany(Course)
Course.belongsTo(Instructor)
Studentss.belongsToMany(Course,{through:Enrollment})
Course.belongsToMany(Studentss,{through:Enrollment})
module.exports={sequelize,Course,Instructor,Studentss,Enrollment};