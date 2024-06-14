// ! node js module system

// ? modules adalah sekumpulan code yang dapat digunakan kembali, dengan antarmuka yang terdefinisi
// * node modules adalah fungsionalitas yang simple ataupun kompleks yang tersimpan di dalam sebuah file javascript, yang dapat kita gunakan kembali pada aplikasi node js

// ? require() mencarikan modules dengan urutan sebagai berikut 
// * 1. core modules
// * 2. file atau direktori (./ atau / atau ../)
// * 3. folder node_modules

// const fs = require('fs'); // core module
// const cetakNama = require('./coba') // local module
// const moment = require('moment'); // third party module => node_modules

const coba = require('./coba');


console.log('Hello WPH!');
console.log(coba.cetakNama('Brian'))
console.log(coba.PI)
console.log(coba.mahasiswa.cetakMhs())
console.log(new coba.Orang())


