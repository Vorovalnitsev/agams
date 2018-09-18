const express = require('express');
const expressHandlebars = require('express-handlebars');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const routesIndex = require('./routes');
const config = require('../../config');

//настройка express
let webServerParameter;

//проверяем переменные окружения
switch (process.env.NODE_ENV){
    case 'production':
        webServerParameter = config.getWebServerAdminParameterProduction();
        break;
    default:
        webServerParameter = config.getWebServerAdminParameterTest();
        break;
}

const web = express();

web.use(favicon(__dirname + '/../public/img/favicon.png'));
web.use(bodyParser.urlencoded({extended: false}));
web.set('views', __dirname + '/views');


web.engine('handlebars', expressHandlebars({
    defaultLayout : 'main',
    layoutsDir: __dirname + '/views/layouts'
}));
web.set('view engine', 'handlebars');
//статические пути
web.use(express.static(__dirname  +  '/../public'));

//пути

web.use(function (req, res, next){
    console.log(req.url);;
    next();
});


routesIndex(web);

web.listen(webServerParameter, function () {
    let date = new Date();
    console.log(date + ' Admin Web server is started on ' +
        'http://' + webServerParameter.hostname +':' + webServerParameter.port +
        ' Press Ctrl + C for stop.');
});