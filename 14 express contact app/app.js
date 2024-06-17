const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const {
  loadContacts,
  getContactByName,
  createContact,
  cekDuplikat,
  deleteContact,
  updateContacts,
} = require("./utils/contacts");

const { body, validationResult, check } = require("express-validator");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

const app = express();
const port = 3000;

// * konfigurasi flash
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

// * gunakan ejs
app.set("view engine", "ejs");

// * third-party middleware
app.use(expressLayouts);

// * built in middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

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
  const contacts = loadContacts();
  res.render("contact", {
    title: "Halaman Contact",
    layout: "layouts/main-layout",
    contacts,
    msg: req.flash("msg"),
  });
});

// * form tambah data contact
app.get("/contact/add", (req, res) => {
  res.render("add-contact", {
    title: "Form Tambah Contact",
    layout: "layouts/main-layout",
  });
});

// * proses data contact
app.post(
  "/contact/create",
  [
    body("nama").custom((value) => {
      const duplikat = cekDuplikat(value);
      if (duplikat) {
        throw new Error("Nama contact sudah terdaftar");
      }
      return true;
    }),
    check("email", "Email tidak valid").isEmail(),
    check("nohp", "Nomer HP tidak valid").isMobilePhone("id-ID"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("add-contact", {
        title: "Form Tambah Contact",
        layout: "layouts/main-layout",
        errors: errors.array(),
      });
    } else {
      createContact(req.body);
      // * kirimkan flash message
      req.flash("msg", "Contact baru berhasil ditambahkan!");
      res.redirect("/contact");
    }
  }
);

// * proses delete contact
app.get("/contact/delete/:nama", (req, res) => {
  const contact = getContactByName(req.params.nama);

  // * jika contact tidak ada
  if (!contact) {
    res.status(404);
    res.send("<h1>404. Page not found.</h1>");
  } else {
    deleteContact(req.params.nama);
    req.flash("msg", "Data contact berhasil dihapus!");
    res.redirect("/contact");
  }
});

// * form ubah data contact
app.get("/contact/edit/:nama", (req, res) => {
  const contact = getContactByName(req.params.nama);
  res.render("edit-contact", {
    title: "Form Edit Contact",
    layout: "layouts/main-layout",
    contact,
  });
});

// * proses ubah data contact
app.post(
  "/contact/update",
  [
    body("nama").custom((value, { req }) => {
      const duplikat = cekDuplikat(value);
      if (value !== req.body.nama && duplikat) {
        throw new Error("Nama contact sudah terdaftar");
      }
      return true;
    }),
    check("email", "Email tidak valid").isEmail(),
    check("nohp", "Nomer HP tidak valid").isMobilePhone("id-ID"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("edit-contact", {
        title: "Form Edit Contact",
        layout: "layouts/main-layout",
        errors: errors.array(),
        contact: req.body,
      });
    } else {
      updateContacts(req.body);
      // * kirimkan flash message
      req.flash("msg", "Contact berhasil diupdate!");
      res.redirect("/contact");
    }
  }
);

// * halaman detail contact
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
