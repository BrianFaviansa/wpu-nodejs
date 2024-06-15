const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const { loadContact, getContactByName } = require("./utils/contacts");

const app = express();
const port = 3000;

// * gunakan ejs
app.set("view engine", "ejs");

// * third-party middleware
app.use(expressLayouts);

// * built in middleware
app.use(express.static("public"));

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
  const contacts = loadContact();
  res.render("contact", {
    title: "Halaman Contact",
    layout: "layouts/main-layout",
    contacts,
  });
});

app.get("/contact/:nama", (req, res) => {
  const contact = getContactByName(req.params.nama);
  res.render("detail", {
    title: "Halaman Detail Contact",
    layout: "layouts/main-layout",
    contact,
  });
});

app.use((req, res) => {
  res.status(404);
  res.send("404. Page not found.");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
