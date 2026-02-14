const fs = require("fs");

// Add text into file
fs.writeFileSync("bigfile.txt", 
`Hello john 👋
This is a big file example.
Node.js file system demo.
Learning sync vs async reading.
End of file 🚀`
);

console.log("Start");

// Read file (non-blocking)
fs.readFile("bigfile.txt", "utf-8", (err, data) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log("File content:");
  console.log(data);
  console.log("File read complete");
});

console.log("End");