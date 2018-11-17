const mysql = require('mysql');
//Модели
/*
const ages = require('./ages.js');
const categories = require('./categories.js');

const productsCategories = require('./products-categories.js');
const productsPhotos = require('./products-photos.js');

const users  = require('./users.js');
*/
const photos = require('./photos.js');
const products = require('./products.js');
const orders = require('./orders.js');
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
    console.log(date + ' Agams Shop - Agams tries connect to MySQL.');
    if (err) {
        date = new Date();
        console.log(date + ' Agams Shop - Error connect to MySQL.');
        console.log(err);
    }
    date = new Date();
    console.log(date + ' Agams Shop - MySQL is connected.');
});


//Работа с таблицей ages
//устанавливаем указатель на БД
products.setConnection(mySqlConnection);
photos.setConnection(mySqlConnection);
orders.setConnection(mySqlConnection);
/*
ages.setConnection(mySqlConnection);
categories.setConnection(mySqlConnection);
productsCategories.setConnection(mySqlConnection);
productsPhotos.setConnection(mySqlConnection);

users.setConnection(mySqlConnection);
*/
//Возвращаем модель  products
module.exports.products = products;
//Возвращаем модель photos
module.exports.photos = photos;
//Возвращаем модель orders
module.exports.orders = orders;
/*
//Возвращаем модель  ages
module.exports.ages = ages;
//Возвращаем модель  categories
module.exports.categories = categories;

//Возвращаем модель  productsCategories
module.exports.productsCategories = productsCategories;
//Возвращаем модель  productsPhotos
module.exports.productsPhotos = productsPhotos;

//Возвращаем модель users
module.exports.users = users;
*/