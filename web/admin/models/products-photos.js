const async = require('async');
let mySql;

//устанавливаем указатель на соединение с БД
module.exports.setConnection = function setConnection (mySqlConnection){
    mySql = mySqlConnection;
}

//Вставляем новую запись
module.exports.addRecord =  function addRecord(parameters, callback) {
    let sql = 'INSERT INTO productPhoto (idProduct, idPhoto, defaultPhoto) ' +
        'VALUES ( ' + mySql.escape(parameters.idProduct) + ', ' +
        + mySql.escape(parameters.idPhoto) + ', ' +
        + mySql.escape(parameters.default) + ')';
    mySql.query(sql, function (err, result) {
        if (err) {
            let date = new Date();
            console.log(date + ' Agams - Products-Photos - addRecord');
            console.log(err);
            return callback(null);
        }
        return callback(parameters);
    })
}

//Удаляем запись
module.exports.removeRecord =  function removeRecord(parameters, callback) {
    let sql = 'DELETE ' +
        'FROM productPhoto ' +
        'WHERE productPhoto.idProduct = ' + mySql.escape(parameters.idProduct) + ' AND ' +
        'productPhoto.idPhoto = ' + mySql.escape(parameters.idPhoto);
    mySql.query(sql, function (err, result) {
        if (err) {
            let date = new Date();
            console.log(date + ' Agams - Products-Photos - removeRecord');
            console.log(err);
            return callback(null);
        }
        return callback(parameters);
    })
}

//Отдаем продукт-фотографии по ID продукта
module.exports.getPhotosByProductId = function getPhotosByProductId(id, callback) {
    let sql = 'SELECT photos.id as id, ' +
        'photos.path as path, ' +
        'productPhoto.defaultPhoto as defaultPhoto ' +
        'FROM productPhoto, photos ' +
        'WHERE productPhoto.idPhoto = photos.id AND productPhoto.idProduct = ' + id;
    mySql.query(sql, function (err, result) {
        if (err) {
            let date = new Date();
            console.log(date + ' Agams - Products-Photos - getPhotosByProductId');
            console.log(err);
            return callback(null);
        }
        return callback(result);
    });
}

//устанавливаем фото продукта по-умолчанию
//первоначально убрав у этого продутка предыдущую фотографию по-умолчанию
module.exports.setDefaultPhotoForProduct = function setDefaultPhotoForProduct(parameters, callback) {
    async.waterfall([
        function (callback) {
            let sql = 'UPDATE productPhoto ' +
                'SET defaultPhoto = 0 ' +
                'WHERE defaultPhoto = 1 AND ' +
                'productPhoto.idProduct = ' + mySql.escape(parameters.idProduct);
            mySql.query(sql, function (err, result) {
                if (err) {
                    let date = new Date();
                    console.log(date + ' Agams - Products-Photos - setDefaultPhotoForProduct');
                    console.log(err);
                    callback(err, null);
                }
                else
                    callback(null, parameters);
            })
        },
        function (parameters, callback) {
            let sql = 'UPDATE productPhoto ' +
                'SET defaultPhoto = true ' +
                'WHERE productPhoto.idProduct = ' + mySql.escape(parameters.idProduct) + ' AND ' +
                'productPhoto.idPhoto = ' + mySql.escape(parameters.idPhoto);
            mySql.query(sql, function (err, result) {
                if (err) {
                    let date = new Date();
                    console.log(date + ' Agams - Products-Photos - setDefaultPhotoForProduct');
                    console.log(err);
                    callback(err, null);
                }
                else
                    callback(null,parameters);
            })
        }
        ],
        function (err, parameters) {

        if (err)
            callback(null);
            else
                callback(parameters);
        }
    )
}
