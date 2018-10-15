let mySql;

//устанавливаем указатель на соединение с БД
module.exports.setConnection = function setConnection (mySqlConnection){
    mySql = mySqlConnection;
}

module.exports.getPhotosByProductId = function getPhotosByProductId(id, callback){
    let sql = 'SELECT photos.path as path, ' +
        'productPhoto.defaultPhoto as defaultPhoto  ' +
        'FROM productPhoto, photos ' +
        'WHERE productPhoto.idProduct = ' + id + ' AND ' +
        'productPhoto.idPhoto = photos.id';
    mySql.query(sql, function (err, result) {
        if (err) {
            let date = new Date();
            console.log(date + ' Agams Shop- Photos - getPhotosByProductId');
            console.log(err);
            return callback(null);
        }
        return callback(result);
    })
}
