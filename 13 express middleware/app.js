const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const morgan = require("morgan");
const app = express();
const port = 3000;

// * gunakan ejs
app.set("view engine", "ejs");

// * third-party middleware
app.use(expressLayouts);
app.use(morgan("dev"));

// * built in middleware
app.use(express.static("public"));

// * application level middleware
app.use((req, res, next) => {
  console.log("Time : ", Date.now());
  next();
});

app.get("/", (req, res) => {
  const mahasiswa = [
    {
      nama: "Hibou",
      email: "hibou@gmail.com",
    },
    {
      nama: "Bebou",
      email: "bebou@gmail.com",
    },
    {
      nama: "Furby",
      email: "furby@gmail.com",
    },
  ];
  res.render("index", {
    title: "Halaman Home",
    layout: "layouts/main-layout",
    nama: "Hibou Programming",
    mahasiswa,
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "Halaman About",
    layout: "layouts/main-layout",
  });
});

app.get("/contact", (req, res) => {
  res.render("contact", {
    title: "Halaman Contact",
    layout: "layouts/main-layout",
  });
});

app.get("/product/:id", (req, res) => {
  res.send(
    `Product ID: ${req.params.id} <br> Category : ${req.query.category}`
  );
});

app.use((req, res) => {
  res.status(404);
  res.send("404. Page not found.");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
