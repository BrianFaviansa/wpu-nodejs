const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const { body, validationResult, check } = require("express-validator");
const methodOverride = require("method-override");

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

// * set up method override
app.use(methodOverride("_method"));

// * set up view engine
app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// * listen to port
app.listen(port, () => {
  console.log(`Mongo Contact App is listening at http://localhost:${port}`);
});

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

// * form tambah data contact
app.get("/contact/add", (req, res) => {
  res.render("add-contact", {
    title: "Form Tambah Contact",
    layout: "layouts/main-layout",
  });
});

// * proses tambah data contact
app.post(
  "/contact",
  [
    body("nama").custom(async (value) => {
      const duplikat = await Contact.findOne({ nama: value });
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
      Contact.insertMany(req.body);
      req.flash("msg", "Contact baru berhasil ditambahkan!");
      res.redirect("/contact");
    }
  }
);

// * proses delete contact tanpa method override
// app.get("/contact/delete/:nama", async (req, res) => {
//   const contact = await Contact.findOne({ nama: req.params.nama });

//   // * jika contact tidak ada
//   if (!contact) {
//     res.status(404);
//     res.send("<h1>404. Page not found.</h1>");
//   } else {
//     Contact.deleteOne({ _id: contact._id }).then((result) => {
//       req.flash("msg", "Data contact berhasil dihapus!");
//       res.redirect("/contact");
//     });
//   }
// });

// ? menggunakan method override
app.delete("/contact", (req, res) => {
  Contact.deleteOne({ _id: req.body._id }).then((result) => {
    req.flash("msg", "Data contact berhasil dihapus!");
    res.redirect("/contact");
  });
});

// * halaman form edit contact
app.get("/contact/edit/:nama", async (req, res) => {
  const contact = await Contact.findOne({ nama: req.params.nama });
  res.render("edit-contact", {
    title: "Form Edit Contact",
    layout: "layouts/main-layout",
    contact,
  });
});

// * proses edit contact
app.put(
  "/contact",
  [
    body("nama").custom(async (value, { req }) => {
      const duplikat = await Contact.findOne({ nama: value });
      if (value !== req.body.oldNama && duplikat) {
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
      Contact.updateOne(
        { _id: req.body._id },
        {
          $set: {
            nama: req.body.nama,
            nohp: req.body.nohp,
            email: req.body.email,
          },
        }
      ).then((result) => {
        // * kirimkan flash message
        req.flash("msg", "Contact berhasil diupdate!");
        res.redirect("/contact");
      });
    }
  }
);

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
