//Главная точнка входа в приложение
//Выводим в консоль сообщение о старте сервисов
let date = new Date();
switch (process.env.NODE_ENV){
    case 'production':
        console.log(date + ' Starting services. Mode is production.');
        break;
    default:
        console.log(date + ' Starting services. Mode is test.');
        break;
}

//Запускаем сервисы
const admin = require('./web/admin');
const  shop = require('./web/shop');
