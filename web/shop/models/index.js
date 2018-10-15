const mysql = require('mysql');
//Модели
const ages = require('./ages.js');
const categories = require('./categories.js');
const products = require('./products.js');
const productsCategories = require('./products-categories.js');
const productsPhotos = require('./products-photos.js');
const photos = require('./photos.js');
const users  = require('./users.js');

const config = require('../../../config');

let mySqlConnection;
let mySqlConnectionString;

//проверяем переменные окружения
switch (process.env.NODE_ENV){
    case 'production':
        mySqlConnectionString = config.getMySqlConnectionStringProduction();
        break;
    default:
        mySqlConnectionString = config.getMySqlConnectionStringTest();
        break;
}
// Подключение к MySQL
mySqlConnection = mysql.createConnection(mySqlConnectionString);

mySqlConnection.connect(function(err) {
    let date = new Date();
    console.log(date + ' Agams - Agams tries connect to MySQL.');
    if (err) {
        date = new Date();
        console.log(date + ' Agams - Error connect to MySQL.');
        console.log(err);
    }
    date = new Date();
    console.log(date + ' Agams - MySQL is connected.');
});


//Работа с таблицей ages
//устанавливаем указатель на БД
ages.setConnection(mySqlConnection);
categories.setConnection(mySqlConnection);
products.setConnection(mySqlConnection);
productsCategories.setConnection(mySqlConnection);
productsPhotos.setConnection(mySqlConnection);
photos.setConnection(mySqlConnection);
users.setConnection(mySqlConnection);

//Возвращаем модель  ages
module.exports.ages = ages;
//Возвращаем модель  categories
module.exports.categories = categories;
//Возвращаем модель  products
module.exports.products = products;
//Возвращаем модель  productsCategories
module.exports.productsCategories = productsCategories;
//Возвращаем модель  productsPhotos
module.exports.productsPhotos = productsPhotos;
//Возвращаем модель photos
module.exports.photos = photos;
//Возвращаем модель users
module.exports.users = users;