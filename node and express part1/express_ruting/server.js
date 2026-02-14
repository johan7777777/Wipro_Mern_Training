        const express = require('express');
        const app = express();
        app.use(express.json()); // built in middleware which is required of post & Put
        //custom middleware
        app.use((req,res,next)=>{
            console.log("Middleware :" , req.method, req.url)
            next(); //it is used to pass the control to route
        })
        //Routes
  //http://localhost:3000/user
        app.get("/user" , (req,res)=>{
            res.send("User fetched");
        })
        app.post("/userpost" , (req,res)=>{
            res.send("User data posted ");
        })
        app.put("/userput" , (req,res)=>{
            res.send("User updated");
        })
        app.delete("/userdelete" , (req,res)=>{
            res.send("User deleted");
        })
        app.listen(3000,()=>{
            console.log("Server running")
        })