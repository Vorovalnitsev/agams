/*
Здесь расположены пути на основные страницы
 */

const controllerIndex = require('../controllers');
const controllerToys = require('../controllers/toys');
const controllerCarts = require('../controllers/carts');
const controllerOrders = require('../controllers/orders');
const controllerContacts = require('../controllers/contacts');

module.exports = function (web) {
    //главная страница
    web.get('/', controllerIndex.index);
    //выводим все игрушки
    web.get('/toys', controllerToys.index);
    //выводим игрушку по id
    web.get('/toys/:id', controllerToys.getRecordById);

    //Контакты
    web.get('/contacts', controllerContacts.index);

    //Корзина
    web.get('/cart', controllerCarts.index);
    //отдаем количество игрушек в корзине
    web.get('/cart/gettoysquantity', controllerCarts.getToysQuantity);
    //отдаем игрушки в корзине
    web.get('/cart/toys/', controllerCarts.getToys);

    //добавляем игрушку в корзину
    //увеличиваем количество на 1
    web.get('/cart/increaseIntoCart/:id', controllerCarts.increaseIntoCart);
    web.get('/cart/reduceIntoCart/:id', controllerCarts.reduceIntoCart);

    //Заказ
    web.post ('/orders/create', controllerOrders.createOrder);
};

