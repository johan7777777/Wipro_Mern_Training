const http = require("http");
const users =[{id:1,name:"Niti"},{id:2,name:"sakshi"}]
const server = http.createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.writeHead("Server is healthy");
    console.log("Server is healthy");
  } 
  else if (req.url === "/time"){
     res.writeHead(200, { "Content-Type": "text/plain" });
     res.end(new Date().toString());
  }
   else if (req.url === "/users"){
     res.writeHead(200, { "Content-Type": "application/json" });
     res.end(JSON.stringify(users));
  }
  else{
    res.writeHead(404)
    res.end("No proper routing found");
  }
});
server.listen(3000);