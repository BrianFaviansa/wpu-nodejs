const yargs = require('yargs');
const { simpanContact } = require('./contacts');
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
});

yargs.parse();











// const { tulisPertanyaan, simpanContact } = require('./contacts');

// const main = async () => {
//   const nama = await tulisPertanyaan('Masukkan nama anda : ');
//   const email = await tulisPertanyaan('Masukkan email anda : ');
//   const noHP = await tulisPertanyaan('Masukkan no hp anda : ');

//   simpanContact(nama, email, noHP);
// }

// main();

