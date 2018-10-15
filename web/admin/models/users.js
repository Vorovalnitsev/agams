let mySql;

//устанавливаем указатель на соединение с БД
module.exports.setConnection = function setConnection (mySqlConnection){
    mySql = mySqlConnection;
}

//Указанное количество записей с указанной позиции.
module.exports.getRecordsFromQuantity = function getRecordsFromQuantity (from, quantity, callback) {
    let sql = 'SELECT users.id as id, ' +
        'users.userName as userName, ' +
        'users.email as email, ' +
        'users.fullName as fullName ' +
        'FROM users ' +
        'LIMIT ' + from + ', ' + quantity;
    mySql.query(sql, function (err, result) {
        if (err) {
            let date = new Date();
            console.log(date + '  Agams - Models- Users - getRecordsFromQuantity');
            console.log(err);
            return callback(null);
        }
        return callback(result);
    })
}


//Возвращаем все записи
module.exports.getRecords = function getRecords (callback){
    let sql = 'SELECT users.id as id, ' +
        'users.userName as userName, ' +
        'users.email as email, ' +
        'users.fullName as fullName ' +
        'FROM users ';
    mySql.query(sql, function (err, result) {
        if (err) {
            let date = new Date();
            console.log(date + ' Agams - Users - getRecords');
            console.log(err);
            return callback(null);
        }
        return callback(result);
    })
}

//Создаем пользователя
module.exports.addRecord = function addRecord (parameters, callback){
    let sql = 'INSERT INTO users (userName, email, hash, salt, fullName) ' +
        'VALUES ( ' + mySql.escape(parameters.userName) + ', ' +
        mySql.escape(parameters.email) + ', ' +
        mySql.escape(parameters.hash) + ', ' +
        mySql.escape(parameters.salt) + ', ' +
        mySql.escape(parameters.fullName) +
        ')';
    mySql.query(sql, function (err, result) {
        if (err) {
            let date = new Date();
            console.log(date + ' Agams - Models- Users - addRecord');
            console.log(err);
            return callback(null);
        }
        return callback(result);
    })
}



// возвращаем пользователя по имени пользователя
module.exports.getUserByUserName  = function getUserByUsernamePassword (userName, callback) {
    let sql = 'SELECT users.id as id, ' +
        'users.userName as userName, ' +
        'users.email as email, ' +
        'users.salt as salt, ' +
        'users.hash as hash, ' +
        'users.fullName as fullName ' +
        'FROM users ' +
        'WHERE users.userName = \'' + userName + '\'';
    mySql.query(sql, function (err, result) {
        if (err) {
            let date = new Date();
            console.log(date + ' Agams - Models - Users - getUserByUserName');
            console.log(err);
            return callback(null);
        }
        return callback(result[0]);
    })
}

// возвращаем пользователя по id
module.exports.getRecordById  = function getRecordById (id, callback) {
    let sql = 'SELECT users.id as id, ' +
        'users.userName as userName, ' +
        'users.email as email, ' +
        'users.salt as salt, ' +
        'users.hash as hash, ' +
        'users.fullName as fullName ' +
        'FROM users ' +
        'WHERE users.id = ' + id;
    mySql.query(sql, function (err, result) {
        if (err) {
            let date = new Date();
            console.log(date + ' Agams - Models - Users - getRecordById');
            console.log(err);
            return callback(null);
        }
        return callback(result[0]);
    })
}

//Обновляем запись изменяем только логин, ФИО, e-mail
module.exports.updateRecord = function updateRecord (parameters, callback) {
    let sql = 'UPDATE users SET userName =' + mySql.escape(parameters.userName) + ', ' +
        'email =' + mySql.escape(parameters.email) + ', ' +
        'fullName =' + mySql.escape(parameters.fullName) +
        'WHERE id = ' + parameters.id;
    mySql.query(sql, function (err, result) {
        if (err) {
            let date = new Date();
            console.log(date + ' Agams - Models - Users - updateRecord');
            console.log(err);
            return callback(null);
        }
        module.exports.getRecordById(parameters.id, function (result) {
            return callback(result);
        });
    })
}

//Обновляем запись изменяем hash и salt
module.exports.updatePassword = function updatePassword (parameters, callback) {
    let sql = 'UPDATE users SET hash =' + mySql.escape(parameters.hash) + ', ' +
        'salt =' + mySql.escape(parameters.salt) +
        'WHERE id = ' + parameters.id;
    mySql.query(sql, function (err, result) {
        if (err) {
            let date = new Date();
            console.log(date + ' Agams - Models - Users - updatePassword');
            console.log(err);
            return callback(null);
        }
        module.exports.getRecordById(parameters.id, function (result) {
            return callback(result);
        });
    })
}