var express = require("express")
var cookieParser = require('cookie-parser')
var session = require('express-session')
var app = express();
app.use(cookieParser()); // It parses the cookie attached to the client request object

// app.use(session({
//   secret:'sample-secretkey',
//   resave:false,
//   saveUninitialized:false
// }));
app.get("/",(req,res)=>{
res.cookie('mycookie','Niti').send("cookie set");
console.log("cookies on server:" ,req.cookies);
res.send(`cookie value is : ${req.cookies.mycookie}`);
});
app.get("/getcookie",(req,res)=>{
console.log("cookies on server:" ,req.cookies);
res.send(`cookie value is : ${req.cookies.mycookie}`);
});

// app.get("/",(req,res)=>{
// if(req.session.page_view){
//     req.session.page_view++;
//     res.send("You have visited this page " + req.session.page_view + "times");
// }
// else{
//     req.session.page_view = 1;
//     res.send("Welcome to this page for the first time you have visited");
// }
// });
app.listen(3000);
console.log("server  started")