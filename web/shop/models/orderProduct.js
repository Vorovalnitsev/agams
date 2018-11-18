let mySql;

//устанавливаем указатель на соединение с БД
module.exports.setConnection = function setConnection (mySqlConnection){
    mySql = mySqlConnection;
}

//Вставляем новую запись
module.exports.addRecord = function addRecord (record, callback) {
    let createdDate = new Date();
    let sql = 'INSERT INTO orderProduct (idProduct, idOrder, quantity, price) ' +
        'VALUES ( ' +
        mySql.escape(record.idProduct) + ',' + 
        mySql.escape(record.idOrder) + ',' +
        mySql.escape(record.quantity) + ',' +
        mySql.escape(record.price) + 
        ')';
    mySql.query(sql, function (err, result) {
        if (err) {
            let date = new Date();
            console.log(date + ' Agams Shop - orderProduct - addRecord');
            console.log(err);
            return callback(null);
        }
        return callback(result);
    })
}