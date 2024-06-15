const yargs = require('yargs');
const { simpanContact, listContact, detailContact, deleteContact } = require('./contacts');
// * mengambil argument dari command line

yargs.command({
  command: 'add',
  describe: 'Menambahkan contact baru',
  builder: {
    nama: {
      describe: 'Nama lengkap',
      demandOption: true,
      type: 'string'
    },
    email: {
      describe: 'Email',
      demandOption: false,
      type: 'string'
    },
    noHP: {
      describe: 'Nomor Handphone',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    simpanContact(argv.nama, argv.email, argv.noHP);
  }
}).demandCommand();

// * menampilkan daftar semua contact yang berisi nama dan no hp
yargs.command({
  command: 'list',
  describe: 'Menampilkan semua nama dan no HP',
  handler() {
    listContact()
  }
})

// * menampilkan detail sebuah contact
yargs.command({
  command: 'detail',
  describe: 'Menampilkan detail sebuah contact berdasarkan nama',
  builder: {
    nama: {
      describe: 'Nama lengkap',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    detailContact(argv.nama)
  }
})

// * menghapus contact berdasarkan nama
yargs.command({
  command: 'delete',
  describe: 'menghapus contact berdasarkan nama',
  builder: {
    nama: {
      describe: 'Nama lengkap',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    deleteContact(argv.nama)
  }
})

yargs.parse();



