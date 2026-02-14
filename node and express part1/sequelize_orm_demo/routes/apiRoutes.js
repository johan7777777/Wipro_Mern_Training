const express=require("express");
const router = express.Router();
const {Instructor,Course,Studentss,Enrollment} =require("../models");

router.post("/instructors", async(req,res)=>{
   const instructor= await Instructor.create({name:req.body.name});
   res.status(201).json(instructor);
});

router.post("/courses", async(req,res)=>{
   const course= await Course.create(req.body);
   res.status(201).json(course);
});

router.post("/students", async(req,res)=>{
   const student= await Studentss.create(req.body);
   res.status(201).json(student);
});

router.post("/enroll",async(req,res) => {
    const {studentId,courseId} = req.body
    const student= await Studentss.findByPk(studentId);
    const course = await Course.findByPk(courseId);
    if (!student || !course) {throw new Error("Invalid course Id")}
    await student.addCourse(course)
    res.json({message:"Enrollment Done"})
    });
    

router.get("/instructors",async(req,res)=>{
    const instructor=await Instructor.findAll();
    res.status(200).json(instructor);
    
})
router.get("/courses",async(req,res)=>{
    const course=await Course.findAll({include:Studentss});
    res.status(200).json(course);
    
})

router.get("/instructorsdetails",async(req,res)=>{
    const instructorDetails=await Instructor.findAll({include:Course});
    res.status(200).json(instructorDetails);
    
})

module.exports=router;

