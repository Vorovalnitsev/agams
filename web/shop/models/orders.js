let mySql;

//устанавливаем указатель на соединение с БД
module.exports.setConnection = function setConnection (mySqlConnection){
    mySql = mySqlConnection;
}

//Вставляем новую запись
module.exports.addRecord = function addRecord (record, callback) {
    let createdDate = new Date();
    let sql = 'INSERT INTO orders (lastName, firstName, phone, address, email, comment, created, createdDate) ' +
        'VALUES ( ' +
        mySql.escape(record.lastName) + ',' + 
        mySql.escape(record.firstName) + ',' +
        mySql.escape(record.phone) + ',' +
        mySql.escape(record.address) + ',' +
        mySql.escape(record.email) + ',' +
        mySql.escape(record.comment) + ',' +
        mySql.escape(record.created) + ',' +
        mySql.escape(createdDate) + 
        ')';
    mySql.query(sql, function (err, result) {
        if (err) {
            let date = new Date();
            console.log(date + ' Agams Shop - orders - addRecord');
            console.log(err);
            return callback(null);
        }
        return callback(result);
    })
}