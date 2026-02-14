const http = require("http");
const fs = require("fs").promises;
const querystring = require("querystring");

const server = http.createServer(async (req, res) => {

  if (req.method === "GET") {
    const html = await fs.readFile("index.html");
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(html);
  }

  if (req.method === "POST") {
    let body = "";

    req.on("data", chunk => body += chunk.toString());

    req.on("end", async () => {
      const data = querystring.parse(body);

      const log = `Name: ${data.name} | Salary: ${data.salary} | Time: ${new Date().toLocaleString()}\n`;

      await fs.appendFile("logs.txt", log);

      res.end("Saved successfully ");
    });
  }
});

server.listen(3000);
console.log("Running at http://localhost:3000");