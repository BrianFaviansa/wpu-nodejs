const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

require("./utils/db");
const Contact = require("./model/Contact");

const app = express();
const port = 3000;

// * config flash
app.use(cookieParser("secret"));
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

app.listen(port, () => {
  console.log(`Mongo Contact App is listening at http://localhost:${port}`);
});

// * set up view engine
app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// * halaman home
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

// * halaman about
app.get("/about", (req, res) => {
  res.render("about", {
    title: "Halaman About",
    layout: "layouts/main-layout",
  });
});

// * halaman contact
app.get("/contact", async (req, res) => {
  const contacts = await Contact.find();
  res.render("contact", {
    title: "Halaman Contact",
    layout: "layouts/main-layout",
    contacts,
    msg: req.flash("msg"),
  });
});

// * detail contact
app.get("/contact/:nama", async (req, res) => {
  const contact = await Contact.findOne({
    nama: req.params.nama,
  });

  res.render("detail", {
    title: "Halaman Detail Contact",
    layout: "layouts/main-layout",
    contact,
  });
});
