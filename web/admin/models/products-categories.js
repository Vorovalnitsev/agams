let mySql;

//устанавливаем указатель на соединение с БД
module.exports.setConnection = function setConnection (mySqlConnection){
    mySql = mySqlConnection;
}

//Отдаем продукт-категории по ID продукта
module.exports.getCategoriesByProductId = function getCategoriesByProductId(id, callback) {
    let sql = 'SELECT categories.id as id, ' +
        'categories.name as name ' +
        'FROM productCategory, categories ' +
        'WHERE productCategory.idCategory = categories.id AND productCategory.idProduct = ' + id;
    mySql.query(sql, function (err, result) {
        if (err) {
            let date = new Date();
            console.log(date + ' Agams - Products-Categories - getCategoriesByProductId');
            console.log(err);
            return callback(null);
        }
        return callback(result);
    })
}

//Отдаем доступные категории для продукта по ID. Доступные категории, которые еще не были добавлены в продукт.
module.exports.getAvailableCategoriesByProductId = function getAvailableCategoriesByProductId(id, callback) {
    let sql = 'SELECT categories.id as id, ' +
        'categories.name as name ' +
        'FROM categories ' +
        'WHERE categories.id  NOT IN ' +
        '(SELECT productCategory.idCategory as id ' +
        'FROM productCategory ' +
        'WHERE productCategory.idProduct = ' + id + ')';
    mySql.query(sql, function (err, result) {
        if (err) {
            let date = new Date();
            console.log(date + ' Agams - Products-Categories - getAvailableCategoriesByProductId');
            console.log(err);
            return callback(null);
        }
        return callback(result);
    })
}

//Вставляем новую запись
module.exports.addRecord = function addRecord (parameters, callback) {
    let sql = 'INSERT INTO productCategory (idProduct, idCategory) ' +
        'VALUES ( ' + mySql.escape(parameters.idProduct) + ', ' +
        mySql.escape(parameters.idCategory) +
        ')';
    mySql.query(sql, function (err, result) {
        if (err) {
            let date = new Date();
            console.log(date + ' Agams - Products-Categories - addRecord');
            console.log(err);
            return callback(null);
        }
        return callback(parameters);
    })
}

//Удаляем  запись
module.exports.removeRecord = function removeRecord (parameters, callback) {
    let sql = 'DELETE ' +
        'FROM productCategory ' +
        'WHERE productCategory.idProduct = ' + parameters.idProduct + ' AND ' +
        'productCategory.idCategory = ' + parameters.idCategory;
    mySql.query(sql, function (err, result) {
        if (err) {
            let date = new Date();
            console.log(date + ' Agams - Products-Categories - removeRecord');
            console.log(err);
            return callback(null);
        }
        return callback(parameters);
    })
}