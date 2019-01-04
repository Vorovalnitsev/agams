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
        'orders.createdDate as createdDate, ' +
        'orders.confirmed as confirmed, ' +
        'orders.confirmedDate as confirmedDate, ' +
        'orders.ready as ready, ' +
        'orders.readyDate as readyDate, ' +
        'orders.sent as sent, ' +
        'orders.sentDate as sentDate, ' +
        'orders.delivered as delivered, ' +
        'orders.deliveredDate as deliveredDate ' +
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