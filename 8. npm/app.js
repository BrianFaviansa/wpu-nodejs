const validator = require('validator');
const chalk = require('chalk');

// console.log(validator.isEmail('hibou@gmail.com')); 
// console.log(validator.isMobilePhone('082244433306', 'id-ID')); 
// console.log(validator.isNumeric('082244433306')); 

// console.log(chalk.italic.bgBlue('Hello world!'));
const nama = 'Hibou';
const pesan = chalk`Lorem ipsum dolor {bgRed.black.bold sit amet} consectetur, {bgGreen.italic.black adipisicing} elit. Dicta, nesciunt?, Nama saya : ${nama}`;
console.log(pesan);

