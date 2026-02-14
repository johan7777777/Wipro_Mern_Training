require("dotenv").config();

const PORT=process.env.PORT ||3000;

const express=require("express");
const userRoutes=require("./routs/userrouts");

const app=express();

app.use(express.json());

app.use("/users",userRoutes);


app.use((err,req,res,next)=>{
    res.status(500).json({
        message:"Internal Server Error"
    });
});

app.listen(PORT,()=>{
    console.log("Server is running at port");
});
module.exports=app;