let mySql;

//устанавливаем указатель на соединение с БД
module.exports.setConnection = function setConnection (mySqlConnection){
    mySql = mySqlConnection;
}

//Указанное количество записей с указанной позиции.
module.exports.getRecordsFromQuantity = function getRecordsFromQuantity (from, quantity, callback) {
    let sql = 'SELECT orders.id as id, ' +
        'orders.lastName as lastName, ' +
        'orders.firstName as firstName, ' +
        'orders.phone as phone, ' +
        'orders.address as address, ' +
        'orders.email as email, ' +
        'orders.comment as comment, ' +
        'orders.created as created, ' +
        'DATE_FORMAT(orders.createdDate, \'%d.%m.%Y %T\') as createdDate, ' +
        'orders.confirmed as confirmed, ' +
        'DATE_FORMAT(orders.confirmedDate, \'%d.%m.%Y %T\') as confirmedDate, ' +
        'orders.ready as ready, ' +
        'DATE_FORMAT(orders.readyDate, \'%d.%m.%Y %T\') as readyDate, ' +
        'orders.sent as sent, ' +
        'DATE_FORMAT(orders.sentDate, \'%d.%m.%Y %T\') as sentDate, ' +
        'orders.delivered as delivered, ' +
        'DATE_FORMAT(orders.deliveredDate, \'%d.%m.%Y %T\') as deliveredDate ' +
        'FROM orders ' +
        'LIMIT ' + from + ', ' + quantity;
    mySql.query(sql, function (err, result) {
        if (err) {
            let date = new Date();
            console.log(date + ' Agams - Orders - getRecordsFromQuantity');
            console.log(err);
            return callback(null);
        }
        return callback(result);
    })
}

//Возвращаем запись по ID
module.exports.getRecordById = function getRecordById (id, callback) {
    let sql = 'SELECT orders.id as id, ' +
    'orders.lastName as lastName, ' +
    'orders.firstName as firstName, ' +
    'orders.phone as phone, ' +
    'orders.address as address, ' +
    'orders.email as email, ' +
    'orders.comment as comment, ' +
    'orders.created as created, ' +
    'DATE_FORMAT(orders.createdDate, \'%d.%m.%Y %T\') as createdDate, ' +
    'orders.confirmed as confirmed, ' +
    'DATE_FORMAT(orders.confirmedDate, \'%d.%m.%Y %T\') as confirmedDate, ' +
    'orders.ready as ready, ' +
    'DATE_FORMAT(orders.readyDate, \'%d.%m.%Y %T\') as readyDate, ' +
    'orders.sent as sent, ' +
    'DATE_FORMAT(orders.sentDate, \'%d.%m.%Y %T\') as sentDate, ' +
    'orders.delivered as delivered, ' +
    'DATE_FORMAT(orders.deliveredDate, \'%d.%m.%Y %T\') as deliveredDate ' +
    'FROM orders ' +
    'WHERE id = ' + mySql.escape(id);
    mySql.query(sql, function (err, result) {
        if (err) {
            let date = new Date();
            console.log(date + ' Agams - Orders - getRecordById');
            console.log(err);
            return callback(null);
        }
        return callback(result[0]);
    })
}