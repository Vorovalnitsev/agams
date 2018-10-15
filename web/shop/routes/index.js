/*
Здесь расположены пути на основные страницы
 */

const controllerIndex = require('../controllers');
const controllerToys = require('../controllers/toys');

module.exports = function (web) {
    //главная страница
    web.get('/', controllerIndex.index);
    //выводим все игрушки
    web.get('/toys', controllerToys.index);
    //выводим игрушка по id
    web.get('/toys/:id', controllerToys.getRecordById);
};

