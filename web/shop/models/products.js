let mySql;

//устанавливаем указатель на соединение с БД
module.exports.setConnection = function setConnection (mySqlConnection){
    mySql = mySqlConnection;
}

//Указанное количество записей с указанной позиции.
module.exports.getRecords = function getRecords (callback) {
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
        'ages.name as nameAge, ' +
        'photos.path as path ' +
        'FROM products, ages, productPhoto, photos ' +
        'WHERE products.idAge = ages.id AND ' +
        'products.id = productPhoto.idProduct AND ' +
        'products.visible = true AND ' +
        'productPhoto.idPhoto = photos.id AND ' +
        'productPhoto.defaultPhoto = true';
    mySql.query(sql, function (err, result) {
        if (err) {
            let date = new Date();
            console.log(date + ' Agams Shop - Products - getRecords');
            console.log(err);
            return callback(null);
        }
        return callback(result);
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
            console.log(date + ' Agams Shop - Products - getRecordById');
            console.log(err);
            return callback(null);
        }
        return callback(result[0]);
    })
}