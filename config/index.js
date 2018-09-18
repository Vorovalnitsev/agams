//Настройки подключения к MySQl
module.exports.getMySqlConnectionStringTest = function getMySqlConnectionStringTest(){
    return {
        host: 'localhost',
        user: 'agams',
        password: 'agams17092018',
        database: 'agams'
    }
}

module.exports.getMySqlConnectionStringProduction = function getMySqlConnectionStringProduction(){
    return {
        host: 'localhost',
        user: 'agams',
        password: 'agams17092018',
        database: 'agams'
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