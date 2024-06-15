const http = require("http");
const fs = require("fs");

const port = 3000;

const renderHTML = (path, res) => {
  fs.readFile(path, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.write("Error: File Not Found");
    } else {
      res.write(data);
    }
    res.end();
  });
};

http
  .createServer((req, res) => {
    res.writeHead(200, {
      "Content-Type": "text/html",
    });

    const url = req.url;
    if (url === "/about") {
      renderHTML("./about.html", res);
    } else if (url === "/contact") {
      res.write("<h1>This is the contact page</h1>");
      res.end();
    } else {
      renderHTML("./index.html", res);
    }
  })
  .listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
