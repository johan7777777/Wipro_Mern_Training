const express =require("express");
const auth=require("../midelware/authmidelware");
const router = express.Router();
 router.get("/",(req,res)=>{
            res.json([{id:1 ,name: "Niti"}])
        })
        router.post("/"  ,(req,res)=>{
            res.status(201).json({message: "User created"});
        })
        module.exports =router;