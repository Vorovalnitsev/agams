let mySql;

//устанавливаем указатель на соединение с БД
module.exports.setConnection = function setConnection (mySqlConnection){
    mySql = mySqlConnection;
}

//Указанное количество записей с указанной позиции.
module.exports.getRecordsFromQuantity = function getRecordsFromQuantity (from, quantity, callback) {
    let sql = 'SELECT ages.id as id, ' +
        'ages.name as name ' +
        'FROM ages ' +
        'LIMIT ' + from + ', ' + quantity;
    mySql.query(sql, function (err, result) {
        if (err) {
            let date = new Date();
            console.log(date + ' Agams - Ages - getRecordsFromQuantity');
            console.log(err);
            return callback(null);
        }
        return callback(result);
    })
}

//Все записи.
module.exports.getRecords = function getRecords (callback) {
    let sql = 'SELECT ages.id as id, ' +
        'ages.name as name ' +
        'FROM ages ';
    mySql.query(sql, function (err, result) {
        if (err) {
            let date = new Date();
            console.log(date + ' Agams - Ages - getRecords');
            console.log(err);
            return callback(null);
        }
        return callback(result);
    })
}

//Вставляем новую запись
module.exports.addRecord = function addRecord (parameters, callback) {
    let sql = 'INSERT INTO ages (name) ' +
        'VALUES ( ' + mySql.escape(parameters.name) + ')';
    mySql.query(sql, function (err, result) {
        if (err) {
            let date = new Date();
            console.log(date + ' Agams - Ages - addRecord');
            console.log(err);
            return callback(null);
        }
        return callback(result);
    })
}

//Обновляем запись
module.exports.updateRecord = function updateRecord (parameters, callback) {
    let sql = 'UPDATE ages SET name =' + mySql.escape(parameters.name) + ' ' +
        'WHERE id = ' + parameters.id;
    mySql.query(sql, function (err, result) {
        if (err) {
            let date = new Date();
            console.log(date + ' Agams - Ages - updateRecord');
            console.log(err);
            return callback(null);
        }
        return callback(parameters);
    })
}

//Возвращаем запись по ID
module.exports.getRecordById = function getRecordById (id, callback) {
    let sql = 'SELECT ages.id as id, ' +
        'ages.name as name ' +
        'FROM ages ' +
        'WHERE  ages.id=' + mySql.escape(id);
    mySql.query(sql, function (err, result) {
        if (err) {
            let date = new Date();
            console.log(date + ' Agams - Ages - getRecordById');
            console.log(err);
            return callback(null);
        }
        return callback(result[0]);
    })
}