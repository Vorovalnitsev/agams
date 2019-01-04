/*
Здесь расположены пути на основные страницы
 */

const controllerIndex = require('../controllers');
const controllerAges = require('../controllers/ages.js');
const controllerCategories = require('../controllers/categories.js');
const controllerProducts = require('../controllers/products.js');
const controllerProductsCategories = require('../controllers/products-categories.js');
const controllerProductsPhotos = require('../controllers/products-photos.js');
const controllerUsers = require('../controllers/users.js');
const controllerOrders = require('../controllers/orders.js');
const passport = require('passport');

function mustAuthenticatedMw (req, res, next) {
    if (req.isAuthenticated())
        next();
    else res.redirect(303, '/login/');
}

module.exports = function (web) {


    //Вход в систему управления
    web.get('/login', controllerUsers.formLogin);
    web.post('/login', passport.authenticate('local',
        {
            successRedirect: '/',
            failureRedirect: '/login'
        }), controllerUsers.login);
    web.get('/logout', controllerUsers.logout);

    web.all('/', mustAuthenticatedMw);
    web.all('/*', mustAuthenticatedMw);

    //главная страница
    web.get('/', controllerIndex.index);

    //ВОЗРАСТ
    //СТАТИКА
    //Центральная страница
    web.get('/ages', controllerAges.index);

    //AJAX
    //Отдаем справочник возрастов. Указанное количество записей с указанной позиции.
    web.get('/ages/:from/:quantity', controllerAges.getRecordsFromQuantity);
    //Отдаем справочник возрастов.
    web.get('/ages/all', controllerAges.getRecords);
    //Отдаем указанный возраст по ID
    web.get('/ages/:id', controllerAges.getRecordById);
    //Добавляем новый возраст
    web.post('/ages/add', controllerAges.addRecord);
    //Редактируем  возраст
    web.post('/ages/update/:id', controllerAges.updateRecord);

    //КАТЕГОРИИ
    //СТАТИКА
    //Центральная страница
    web.get('/categories', controllerCategories.index);

    //AJAX
    //Отдаем справочник возрастов. Указанное количество записей с указанной позиции.
    web.get('/categories/:from/:quantity', controllerCategories.getRecordsFromQuantity);
    //Отдаем указанный возраст по ID
    web.get('/categories/:id', controllerCategories.getRecordById);
    //Добавляем новый возраст
    web.post('/categories/add', controllerCategories.addRecord);
    //Редактируем  возраст
    web.post('/categories/update/:id', controllerCategories.updateRecord);

    //ПРОДУКТЫ
    //СТАТИКА
    //Центральная страница
    web.get('/products', controllerProducts.index);

    //AJAX
    //Отдаем справочник продуктов. Указанное количество записей с указанной позиции.
    web.get('/products/:from/:quantity', controllerProducts.getRecordsFromQuantity);
    //Отдаем указанный возраст по ID
    web.get('/products/:id', controllerProducts.getRecordById);
    //Добавляем новый возраст
    web.post('/products/add', controllerProducts.addRecord);
    //Редактируем  возраст
    web.post('/products/update/:id', controllerProducts.updateRecord);

    //ПРОДУКТ-КАТЕГОРИИ
    //СТАТИКА

    //AJAX
    //Отдаем продукт-категории по ID продукта
    web.get('/products-categories/:id', controllerProductsCategories.getCategoriesByProductId);
    //Отдаем доступные категории для продукта по ID. Доступные категории, которые еще не были добавлены в продукт.
    web.get('/products-categories/:id/available', controllerProductsCategories.getAvailableCategoriesByProductId);
    //Добавляем категорию в продукт
    web.post('/products-categories/:id/add', controllerProductsCategories.addRecord);
    //Удаляем категорию из продукта
    web.get('/products-categories/:idProduct/:idCategory/remove', controllerProductsCategories.removeRecord);


    //ПРОДУКТ-ФОТОГРАФИИ
    //СТАТИКА

    //AJAX
    //Отдаем продукт-фотографии по ID продукта
    web.get('/products-photos/:id', controllerProductsPhotos.getPhotosByProductId);
    //Добавляем фотографию для в продукт
    web.post('/products-photos/:id/add', controllerProductsPhotos.addRecord);
    //Удаляем фотографию из продукта
    web.get('/products-photos/:idProduct/:idPhoto/remove', controllerProductsPhotos.removeRecord);
    //Отдаем справочник продуктов. Указанное количество записей с указанной позиции.
    web.get('/products-photos/:idProduct/:idPhoto/default', controllerProductsPhotos.setDefault);

    //ПОЛЬЗОВАТЕЛИ
    //СТАТИКА
    //Центральная страница
    web.get('/users', controllerUsers.index);

    //AJAX
    //Отдаем справочник пользователей. Указанное количество записей с указанной позиции.
    web.get('/users/:from/:quantity', controllerUsers.getRecordsFromQuantity);
    //Отдаем указанного пользователя по ID
    web.get('/users/:id', controllerUsers.getRecordById);
    //Редактируем пользователя
    web.post('/users/update/:id', controllerUsers.updateRecord);
    //Добавляем нового пользователя
    web.post('/users/add', controllerUsers.addRecord);
    //Изменяем пароль пользователя
    web.post('/users/:id/changepassword', controllerUsers.changePassword);

    //ЗАКАЗЫ
    //СТАТИКА
    //Центральная страница
    web.get('/orders', controllerOrders.index);

    //AJAX
    //Отдаем справочник продуктов. Указанное количество записей с указанной позиции.
    web.get('/orders/:from/:quantity', controllerOrders.getRecordsFromQuantity);

    /*


        //Собщения
        //Static
        web.get('/messages/', controllerMessages.getMessages);
        web.get('/messages/client/:id/', controllerMessages.getMessages);
        //AJAX

        //Выдаем все сообщения в указанном диапазаоне для указанного клиента
        web.get('/messages/client/:id/:from/:quantity', controllerMessages.getMessagesByIdClientFromQuantity);
        //Выдаем все сообщения в указанном диапазаоне
        web.get('/messages/:from/:quantity', controllerMessages.getMessagesFromQuantity);

        //Клиенты
        //Static
        web.get('/clients/', controllerClients.getClients);

        //Ajax
        //Выводим всех клиентов
        web.get ('/clients/all', controllerClients.getAllClients);
        //Выдаем клиентов в указанном диапазаоне
        web.get ('/clients/:from/:quantity', controllerClients.getClientsFromQuantity);
        //Возвращаем клиента по id
        web.get ('/clients/:id', controllerClients.getClientById);
        //сохраняем изменения для клиента
        web.post ('/clients/:id/update', controllerClients. updateClient);

        //Hosts
        //Static
        web.get('/hosts/', controllerHosts.getHosts);

        //Ajax
        //Выводим всех клиентов
        web.get ('/hosts/:from/:quantity', controllerHosts.getHostsFromQuantity);
        //Возвращаем host по id
        web.get ('/hosts/:id', controllerHosts.getHostById);
        //сохраняем изменения для host
        web.post ('/hosts/:id/update', controllerHosts.updateHost);
    */

};
