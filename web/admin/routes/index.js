/*
Здесь расположены пути на основные страницы
 */

const controllerIndex = require('../controllers');
const controllerAges = require('../controllers/ages.js');
const controllerCategories = require('../controllers/categories.js');
const controllerProducts = require('../controllers/products.js');




module.exports = function (web) {
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
    //Отдаем справочник возрастов. Указанное количество записей с указанной позиции.
    web.get('/products/:from/:quantity', controllerProducts.getRecordsFromQuantity);
    //Отдаем указанный возраст по ID
    web.get('/products/:id', controllerProducts.getRecordById);
    //Добавляем новый возраст
    web.post('/products/add', controllerProducts.addRecord);
    //Редактируем  возраст
    web.post('/products/update/:id', controllerProducts.updateRecord);


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
