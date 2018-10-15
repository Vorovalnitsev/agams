const express = require('express');
const expressHandlebars = require('express-handlebars');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const routesIndex = require('./routes');
const config = require('../../config');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const session = require('express-session');
const expressMySQLSession = require('express-mysql-session');
const user = require('./controllers/users');

//настройка passport
passport.use(new localStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },
    function(username, password, done) {
        user.login(username, password, function (err, user) {
            if (err)
                {
                    return done(err);
                }
            return done(null, user);
        });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    user.getUserById(id, function(err, user) {
        done(err, user);
    });
});

//настройка express
let webServerParameters;
let mySQLServerParameters;

//проверяем переменные окружения
switch (process.env.NODE_ENV){
    case 'production':
        webServerParameters = config.getWebServerAdminParameterProduction();
        mySQLServerParameters = config.getMySqlConnectionStringProduction();

        break;
    default:
        webServerParameters = config.getWebServerAdminParameterTest();
        mySQLServerParameters = config.getMySqlConnectionStringTest();
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
web.use(session({
    secret: 'All love games!',
    name: 'sessionid',
    resave: false,
    saveUninitialized: false,
    store: new expressMySQLSession(mySQLServerParameters)
}));


//Passport
web.use(passport.initialize());
web.use(passport.session());



//статические пути
web.use(express.static(__dirname  +  '/../public'));

//пути

web.use(function (req, res, next){
    console.log(req.url);;
    next();
});


routesIndex(web);

web.listen(webServerParameters, function () {
    let date = new Date();
    console.log(date + ' Admin Web server is started on ' +
        'http://' + webServerParameters.hostname +':' + webServerParameters.port +
        ' Press Ctrl + C for stop.');
});