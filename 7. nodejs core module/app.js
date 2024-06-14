// ! core modules

// * file system
const fs = require('fs');

// * menuliskan string ke file (syncronous)
// try {
//   fs.writeFileSync('data/test.txt', 'Hello World secara syncronous!');
// } catch (e) {
//   console.log(e);
// }

// * menuliskan string ke file (asyncronous)
// fs.writeFile('data/test.txt', 'Hello World secara asyncronous', (err) => {
//   console.log(err);
// })

// * membaca isi file (syncronous)
// const data = fs.readFileSync('data/test.txt', 'utf-8');
// console.log(data.toString());
// console.log(data);

// * membaca isi file (asyncronous)
// fs.readFile('data/test.txt', 'utf-8', (err, data) => {
//   if (err) throw err;
//   console.log(data);
// })

// * readline module
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// rl.question('Masukkan nama anda : ', (nama) => {
//   console.log(`Selamat datang ${nama}`);
//   rl.close();
// });

// rl.question('Masukkan nama anda : ', (nama) => {
//   rl.question('Masukkan nomer hp anda : ', (hp) => {
//     console.log(`Terimakasih ${nama}, sudah menginputkan nomer hp anda ${hp}`);
//     rl.close();
//   });
// });

// console.log(`Terimakasih ${nama}, sudah menginputkan nomer hp anda ${hp}`);


// * readline module with file system
rl.question('Masukkan nama anda : ', (nama) => {
  rl.question('Masukkan nomer hp anda : ', (noHp) => {
    const contact = { nama, noHp };
    const file = fs.readFileSync('data/contact.json', 'utf-8');
    const contacts = JSON.parse(file);
    contacts.push(contact);
    fs.writeFileSync('data/contact.json', JSON.stringify(contacts));
    console.log('Terimakasih sudah memasukkan data');
    rl.close();
  });
});
