// * file system
const fs = require("fs");

// * membuat file data jika belum ada
const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

// * membuat file contact.json jika belum ada
const dataPath = "./data/contacts.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

// * ambil semua data di contact.json
const loadContacts = () => {
  const file = fs.readFileSync("data/contacts.json", "utf-8");
  const contacts = JSON.parse(file);
  return contacts;
};

// * ambil contact berdasarkan nama
const getContactByName = (nama) => {
  const contacts = loadContacts();
  const contact = contacts.find(
    (contact) => contact.nama.toLowerCase() === nama.toLowerCase()
  );
  return contact;
};

// * menuliskan / menimpa file contacts.json dengan data baru
const saveContacts = (contacts) => {
  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));
};

// * menambahkan data contact baru ke dalam array
const createContact = (contact) => {
  const contacts = loadContacts();
  contacts.push(contact);
  saveContacts(contacts);
};

const cekDuplikat = (nama) => {
  const contacts = loadContacts();
  return contacts.find((contact) => contact.nama === nama);
};

// * hapus contact berdasarkan nama
const deleteContact = (nama) => {
  const contacts = loadContacts();
  const filteredContacts = contacts.filter(
    (contact) => contact.nama.toLowerCase() !== nama.toLowerCase()
  );
  saveContacts(filteredContacts);
};

// * update contact berdasarkan nama
const updateContacts = (contactBaru) => {
  const contacts = loadContacts();
  const filteredContacts = contacts.filter(
    (contact) =>
      contact.nama.toLowerCase() !== contactBaru.oldNama.toLowerCase()
  );
  delete contactBaru.oldNama;
  filteredContacts.push(contactBaru);
  saveContacts(filteredContacts);
};

module.exports = {
  loadContacts,
  getContactByName,
  createContact,
  cekDuplikat,
  deleteContact,
  updateContacts,
};
