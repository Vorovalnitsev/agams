//Настройки подключения к MySQl
module.exports.getMySqlConnectionStringTest = function getMySqlConnectionStringTest(){
    return {
        host: 'localhost',
        user: 'agams',
        password: 'agams17092018',
        database: 'agams',
        port: '3306'
    }
}

module.exports.getMySqlConnectionStringProduction = function getMySqlConnectionStringProduction(){
    return {
        host: 'localhost',
        user: 'agams',
        password: 'agams17092018',
        database: 'agams',
        port: '3306'
    }
}

//Настройки для web-сервера УПРАВЛЕНИЯ МАГАЗИНОМ

module.exports.getWebServerAdminParameterProduction = function getWebServerAdminParameterProduction() {
    return {
        hostname: 'localhost',
        port: '8081'
    }
}


module.exports.getWebServerAdminParameterTest = function getWebServerAdminParameterTest() {
    return {
        hostname: 'localhost',
        port: '8081'
    }
}

//Настройки для web-сервера МАГАЗИН

module.exports.getWebServerShopParameterProduction = function getWebServerShopParameterProduction() {
    return {
        hostname: 'localhost',
        port: '8082'
    }
}


module.exports.getWebServerShopParameterTest = function getWebServerShopParameterTest() {
    return {
        hostname: 'localhost',
        port: '8082'
    }
}

//Настройки для папки с изображениями

module.exports.getImgPathProduction = function getImgPathProduction() {
    return '/home/node/current/agams/web/public/img/';
}


module.exports.getImgPathTest = function getImgPathTest() {
    return '/Users/vladimirvorovalnitsev/Desktop/Projects/node.js/agams/web/public/img/';
}

//Настройки passport-local-authenticate
module.exports.getParametersPassportLocalAuthenticate = function getParametersPassportLocalAuthenticate(){
    return {
        saltlen : 128,
        encoding : 'hex',
        iterations : 25000,
        keylen : 1024,
        digestAlgorithm : 'SHA512'
    }
}