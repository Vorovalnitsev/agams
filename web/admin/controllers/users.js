const model = require ('../models').users;
const authenticate = require('passport-local-authenticate');
const config = require('../../../config');
const async = require('async');

/*
выбираем все записи из таблицы users
если количество пользователей в базе данных равно 0,
то создаем пользователя admin с паролем admin
*/

model.getRecords (function (result) {
    if (result)
        if (result.length == 0){
            async.waterfall([
                function (callback){
                    authenticate.hash('admin', config.getParametersPassportLocalAuthenticate(), function (err, hashed) {
                            if (err){
                                let date = new Date();
                                console.log(date + ' Agams - Controller - Users - authenticate.hash');
                                console.log(err);
                                return callback(err, null);
                            }
                            else
                                return callback (null, hashed.salt, hashed.hash);

                    })
                },
                function (salt, hash) {
                    model.addRecord({
                        userName: 'admin',
                        hash: hash,
                        salt: salt
                    }, function (result) {
                        if (result){
                            let date = new Date();
                            console.log(date + ' Таблица пользователей пуста. Был создан пользователь admin с паролем admin. ' +
                                'Не забудьте сменить пароль');
                        }
                    })
                }
                
            ],
                function (err, result) {
                    if (err){
                        console.log('Agams - Controller - Users - getRecords');
                    }
                })
        }
});

//проверяем пользователя. Работает совместно с passport.
module.exports.login = function login(userName, password, callback) {
    async.waterfall([
        function (callback) {
            model.getUserByUserName(userName, function (result) {
                if (result!=0)
                    callback(null, result);
                else
                    callback (null, null);
            })
        },
        function (user, callback) {
            if (user){
                let hashed = {
                    hash: user.hash,
                    salt: user.salt
                }
                authenticate.verify(password, hashed, config.getParametersPassportLocalAuthenticate(),function (err, verified) {
                    if (err){
                        let date = new Date();
                        console.log(date + ' Agams - Controller - Users - authenticate.verify');
                        console.log(err);
                        callback(true, null);
                    }
                    else
                    if (verified)
                        callback(null, user);
                    else
                        callback(null, false);

                })
            }
            else
                callback(null, false);
        }
    ],
        function (err, user) {
            if (err)
                callback (true, null);
            else
                callback (null, user);
        });
}

//возвращаем пользователя по id. Работает совместно с passport.
module.exports.getUserById = function getUserById(id, callback) {
    model.getRecordById(id, function (result) {
        if (result)
            return callback(null, result);
        else return callback(true, null);
    })
}
//Показываем приглашение для входа. Работает совместно с passport.
module.exports.formLogin = function formLogin(req, res) {
    res.render('login.handlebars', { layout : false });
};
//Выход из учетки. Работает совместно с passport.
module.exports.logout = function logout(req, res) {
    req.logout();
    res.redirect(303, '/login/');
};

//Центральная страница
module.exports.index = function index(req, res) {
    res.render('records.handlebars');
}

//Отдаем справочник польщователей. Указанное количество записей с указанной позиции.
module.exports.getRecordsFromQuantity = function getRecordsFromQuantity(req, res) {
    model.getRecordsFromQuantity(req.params.from, req.params.quantity, function (result) {
        res.send(result);
    });
}

//Отдаем указанного пользователя по ID
module.exports.getRecordById = function getRecordById(req, res){
    model.getRecordById(req.params.id, function (result) {
        // не отправляем в web hash и salt
        delete result.hash;
        delete result.salt;
        res.send(result);
    });
}

//Обновляем пользователя
module.exports.updateRecord = function updateRecord(req, res){
    model.updateRecord({
        id: req.body.id,
        userName: req.body.userName,
        fullName: req.body.fullName,
        email: req.body.email
    }, function (result) {
        res.send(result);
    })
}

//Добавляем нового пользователя
module.exports.addRecord = function addRecord(req, res){

    async.waterfall([
        function (callback) {
            model.getUserByUserName(req.body.userName, function (result) {
                callback(null, result);
            })
        },
        function (result, callback) {
        console.log('user ');
        console.log(result);
        if (!result)
            model.addRecord({
                userName: req.body.userName,
                fullName: req.body.fullName,
                email: req.body.email
            }, function (result) {
                callback(null, result);
                console.log('add ');
                console.log(result);
            })
        }
        ],
        function (err, result) {
            if (err){
                console.log('Agams - Controller - Users - addRecord');
            }
            console.log(result);
            res.send(result);
        })


}

//Обновляем пользователя
module.exports.changePassword = function changePassword(req, res){
    if (req.body.password && req.body.repassword && req.body.id)
    if (req.body.password == req.body.repassword){
        async.waterfall([
            function (callback){
                authenticate.hash(req.body.password, config.getParametersPassportLocalAuthenticate(), function (err, hashed) {
                    if (err){
                        let date = new Date();
                        console.log(date + ' Agams - Controller - Users - changePassword - authenticate.hash');
                        console.log(err);
                        return callback(err, null);
                    }
                    else
                        return callback (null, hashed.salt, hashed.hash);
                })
            },
            function (salt, hash, callback) {
                model.updatePassword({
                    id: req.body.id,
                    salt: salt,
                    hash: hash
                }, function (result) {
                    if (result)
                        return callback(null, result)
                        else
                            return callback(true, null)
                })
            }],
            function (err, result) {
                if (err){
                    res.send({err: true})
                }
                else
                {
                    // не отправляем в web hash и salt
                    delete result.hash;
                    delete result.salt;
                    res.send(result);
                }
            });
    }
    else{
        res.send({err: true});
    }
}
