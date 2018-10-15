let mySql;

//устанавливаем указатель на соединение с БД
module.exports.setConnection = function setConnection (mySqlConnection){
    mySql = mySqlConnection;
}

//Вставляем новую запись
module.exports.addRecord =  function addRecord(parameters, callback) {
    let sql = 'INSERT INTO photos (path) ' +
        'VALUES ( ' + mySql.escape(parameters.path) + ')';
    mySql.query(sql, function (err, result) {
        if (err) {
            let date = new Date();
            console.log(date + ' Agams - Photos - addRecord');
            console.log(err);
            return callback(null);
        }
        return callback(result);
    })
}

//Удаляем запись
module.exports.removeRecord =  function removeRecord(parameters, callback) {
    let sql = 'DELETE ' +
        'FROM photos ' +
        'WHERE photos.id = ' + mySql.escape(parameters.id);
    mySql.query(sql, function (err, result) {
        if (err) {
            let date = new Date();
            console.log(date + ' Agams - Photos - removeRecord');
            console.log(err);
            return callback(null);
        }
        return callback(parameters);
    })
}

//Отдаем фотографию по ID
module.exports.getRecordById = function getRecordById(id, callback) {
    let sql = 'SELECT photos.id as id, ' +
        'photos.path as path ' +
        'FROM photos ' +
        'WHERE photos.id = ' + id;
    mySql.query(sql, function (err, result) {
        if (err) {
            let date = new Date();
            console.log(date + ' Agams - Photos - getRecordById');
            console.log(err);
            return callback(null);
        }
        return callback(result);
    })
}