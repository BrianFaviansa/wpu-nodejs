const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const port = 3000;

// * gunakan ejs
app.set("view engine", "ejs");
app.use(expressLayouts);

app.get("/", (req, res) => {
  // res.sendFile("./index.html", { root: __dirname });
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

app.use("/", (req, res) => {
  res.status(404);
  res.send("404. Page not found.");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
