const express = require('express');
const expressHandlebars = require('express-handlebars');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const routesIndex = require('./routes');
const config = require('../../config');
const session = require('express-session');
const expressMySQLSession = require('express-mysql-session');

//настройка express
let webServerParameter;
let expressMainLayout;
let mySQLServerParameters;
//проверяем переменные окружения
switch (process.env.NODE_ENV){
    case 'production':
        webServerParameter = config.getWebServerShopParameterProduction();
        mySQLServerParameters = config.getMySqlConnectionStringProduction();
        expressMainLayout = 'main';
        break;
    default:
        webServerParameter = config.getWebServerShopParameterTest();
        mySQLServerParameters = config.getMySqlConnectionStringTest();
        expressMainLayout = 'mainTest';
        break;
}

const web = express();

web.use(favicon(__dirname + '/../public/img/favicon.png'));
web.use(bodyParser.urlencoded({extended: false}));
web.set('views', __dirname + '/views');


web.engine('handlebars', expressHandlebars({
    defaultLayout : expressMainLayout,
    layoutsDir: __dirname + '/views/layouts'
}));
web.set('view engine', 'handlebars');
web.use(session({
    secret: 'All love games!',
    name: 'sessionid',
    resave: false,
    saveUninitialized: false,
    store: new expressMySQLSession(mySQLServerParameters)
}));
//статические пути
web.use(express.static(__dirname  +  '/../public'));
web.use('/js', express.static(__dirname + '/js'));
web.use('/css', express.static(__dirname + '/css')); 

web.use(function (req, res, next){
    if (process.env.NODE_ENV!='production')
        console.log(req.url);
    next();
});

//пути
routesIndex(web);

web.listen(webServerParameter, function () {
    let date = new Date();
    console.log(date + ' Shop Web server is started on ' +
        'http://' + webServerParameter.hostname +':' + webServerParameter.port +
        ' Press Ctrl + C for stop.');
});