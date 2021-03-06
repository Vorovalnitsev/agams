/*
Здесь расположены пути на основные страницы
Решено, это сайт визитка и мы не занимаемс розничной торговлей. 
Все пути для работы с корзиной будут закрыты.
 */

const controllerIndex = require('../controllers');
const controllerToys = require('../controllers/toys');
//const controllerCarts = require('../controllers/carts');
//const controllerOrders = require('../controllers/orders');
const controllerContacts = require('../controllers/contacts');
const controller404 = require('../controllers/404');
const controller500 = require('../controllers/500');
const controllerYandex = require('../controllers/yandex')
module.exports = function (web) {
    //главная страница
    web.get('/', controllerIndex.index);
    //выводим все игрушки
    web.get('/toys', controllerToys.index);
    //выводим игрушку по id
    web.get('/toys/:id', controllerToys.getRecordById);

    //Контакты
    web.get('/contacts', controllerContacts.index);

    //Яндекс-подтверждение аккаунта

    web.get('/yandex_ee499d938446415b.html', controllerYandex.index);
    
    /*
    Решено, это сайт визитка и мы не занимаемс розничной торговлей. 
    Все пути для работы с корзиной будут закрыты.
    */

    //Корзина
    //web.get('/cart', controllerCarts.index);
    //отдаем количество игрушек в корзине
    //web.get('/cart/gettoysquantity', controllerCarts.getToysQuantity);
    //отдаем игрушки в корзине
    //web.get('/cart/toys/', controllerCarts.getToys);

    //добавляем игрушку в корзину
    //увеличиваем количество на 1
    //web.get('/cart/increaseIntoCart/:id', controllerCarts.increaseIntoCart);
    //web.get('/cart/reduceIntoCart/:id', controllerCarts.reduceIntoCart);

    //Заказ
    //web.post ('/orders/create', controllerOrders.createOrder);

    //Что-то пошло не так
    web.use(controller404.index);
    web.use(controller500.index);
};

