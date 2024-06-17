const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/tes1");

// * membuat schema
// const Contact = mongoose.model("Contact", {
//   nama: {
//     type: String,
//     required: true,
//   },
//   nohp: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//   },
// });

// * menambah 1 data
// const contact1 = new Contact({
//   nama: "Hibou",
//   nohp: "08123456789",
//   email: "hibou@gmail.com",
// });

// const contact2 = new Contact({
//   nama: "Bebou",
//   nohp: "08123456798",
//   email: "bebou@gmail.com",
// });

// * simpan ke collection
// contact2
//   .save()
//   .then((contact) => console.log(contact))
//   .catch((err) => console.log(err));
