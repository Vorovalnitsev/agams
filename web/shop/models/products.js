let mySql;

//устанавливаем указатель на соединение с БД
module.exports.setConnection = function setConnection (mySqlConnection){
    mySql = mySqlConnection;
}

//Указанное количество записей с указанной позиции.
module.exports.getRecordsFromQuantity = function getRecordsFromQuantity (from, quantity, callback) {
    let sql = 'SELECT products.id as id, ' +
        'products.name as name, ' +
        'products.vendorCode as vendorCode, ' +
        'products.description as description, ' +
        'products.idAge as idAge, ' +
        'products.price as price, ' +
        'products.visible as visible, ' +
        'products.hit as hit, ' +
        'products.weight as weight, ' +
        'products.length as length, ' +
        'products.length as width, ' +
        'products.length as height, ' +
        'ages.name as nameAge ' +
        'FROM products, ages ' +
        'WHERE products.idAge = ages.id ' +
        'LIMIT ' + from + ', ' + quantity;
    mySql.query(sql, function (err, result) {
        if (err) {
            let date = new Date();
            console.log(date + ' Agams - Products - getRecordsFromQuantity');
            console.log(err);
            return callback(null);
        }
        return callback(result);
    })
}

//Вставляем новую запись
module.exports.addRecord = function addRecord (parameters, callback) {
    let sql = 'INSERT INTO products (name, vendorCode, description, idAge, price, visible, hit, weight, length, width, height) ' +
        'VALUES ( ' + mySql.escape(parameters.name) + ', ' +
        mySql.escape(parameters.vendorCode) + ', ' +
        mySql.escape(parameters.description) + ', ' +
        mySql.escape(parameters.idAge) + ', ' +
        mySql.escape(parameters.price) + ', ' +
        mySql.escape(parameters.visible) + ', ' +
        mySql.escape(parameters.hit) + ', ' +
        mySql.escape(parameters.weight) + ', ' +
        mySql.escape(parameters.length) + ', ' +
        mySql.escape(parameters.width) + ', ' +
        mySql.escape(parameters.height) +
        ')';
    mySql.query(sql, function (err, result) {
        if (err) {
            let date = new Date();
            console.log(date + ' Agams - Products - addRecord');
            console.log(err);
            return callback(null);
        }
        return callback(result);
    })
}

//Обновляем запись
module.exports.updateRecord = function updateRecord (parameters, callback) {
    let sql = 'UPDATE products SET name =' + mySql.escape(parameters.name) + ', ' +
        'vendorCode =' + mySql.escape(parameters.vendorCode) + ', ' +
        'description =' + mySql.escape(parameters.description) + ', ' +
        'idAge =' + mySql.escape(parameters.idAge) + ', ' +
        'price =' + mySql.escape(parameters.price) + ', ' +
        'visible =' + mySql.escape(parameters.visible) + ', ' +
        'hit =' + mySql.escape(parameters.hit) + ', ' +
        'weight =' + mySql.escape(parameters.weight) + ', ' +
        'length =' + mySql.escape(parameters.length) + ', ' +
        'width =' + mySql.escape(parameters.width) + ', ' +
        'height =' + mySql.escape(parameters.height) + ' ' +
        'WHERE id = ' + parameters.id;
    mySql.query(sql, function (err, result) {
        if (err) {
            let date = new Date();
            console.log(date + ' Agams - Products - updateRecord');
            console.log(err);
            return callback(null);
        }
        module.exports.getRecordById(parameters.id, function (result) {
            return callback(result);
        });
    })
}

//Возвращаем запись по ID
module.exports.getRecordById = function getRecordById (id, callback) {
    let sql = 'SELECT products.id as id, ' +
        'products.name as name, ' +
        'products.vendorCode as vendorCode, ' +
        'products.description as description, ' +
        'products.idAge as idAge, ' +
        'products.price as price, ' +
        'products.visible as visible, ' +
        'products.hit as hit, ' +
        'products.weight as weight, ' +
        'products.length as length, ' +
        'products.width as width, ' +
        'products.height as height, ' +
        'ages.name as nameAge ' +
        'FROM products, ages ' +
        'WHERE products.idAge = ages.id AND ' +
        'products.id=' + mySql.escape(id);
    mySql.query(sql, function (err, result) {
        if (err) {
            let date = new Date();
            console.log(date + ' Agams - Products - getRecordById');
            console.log(err);
            return callback(null);
        }
        return callback(result[0]);
    })
}