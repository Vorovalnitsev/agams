let mySql;

//устанавливаем указатель на соединение с БД
module.exports.setConnection = function setConnection (mySqlConnection){
    mySql = mySqlConnection;
}

//Указанное количество записей с указанной позиции.
module.exports.getRecordsFromQuantity = function getRecordsFromQuantity (from, quantity, callback) {
    let sql = 'SELECT categories.id as id, ' +
        'categories.name as name ' +
        'FROM categories ' +
        'LIMIT ' + from + ', ' + quantity;
    mySql.query(sql, function (err, result) {
        if (err) {
            let date = new Date();
            console.log(date + ' Agams - Categories - getRecordsFromQuantity');
            console.log(err);
            return callback(null);
        }
        return callback(result);
    })
}

//Вставляем новую запись
module.exports.addRecord = function addRecord (parameters, callback) {
    let sql = 'INSERT INTO categories (name) ' +
        'VALUES ( ' + mySql.escape(parameters.name) + ')';
    mySql.query(sql, function (err, result) {
        if (err) {
            let date = new Date();
            console.log(date + ' Agams - Categories - addRecord');
            console.log(err);
            return callback(null);
        }
        return callback(result);
    })
}

//Обновляем запись
module.exports.updateRecord = function updateRecord (parameters, callback) {
    let sql = 'UPDATE categories SET name =' + mySql.escape(parameters.name) + ' ' +
        'WHERE id = ' + parameters.id;
    mySql.query(sql, function (err, result) {
        if (err) {
            let date = new Date();
            console.log(date + ' Agams - Categories - updateRecord');
            console.log(err);
            return callback(null);
        }
        return callback(parameters);
    })
}

//Возвращаем запись по ID
module.exports.getRecordById = function getRecordById (id, callback) {
    let sql = 'SELECT categories.id as id, ' +
        'categories.name as name ' +
        'FROM categories ' +
        'WHERE  categories.id=' + mySql.escape(id);
    mySql.query(sql, function (err, result) {
        if (err) {
            let date = new Date();
            console.log(date + ' Agams - Categories - getRecordById');
            console.log(err);
            return callback(null);
        }
        return callback(result[0]);
    })
}