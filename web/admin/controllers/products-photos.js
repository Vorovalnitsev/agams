const model = require ('../models').productsPhotos;
const modelPhotos = require ('../models').photos;
const config = require('../../../config');
const async = require('async');
const formidable = require('formidable');
const fs = require('fs');

let imgPath;

//проверяем переменные окружения
switch (process.env.NODE_ENV){
    case 'production':
        imgPath = config.getImgPathProduction();
        break;
    default:
        imgPath = config.getImgPathTest();
        break;
}



//Отдаем продукт-фотографии по ID продукта
module.exports.getPhotosByProductId = function getPhotosByProductId(req, res) {
    model.getPhotosByProductId(req.params.id, function (result) {
        res.send(result);
    });

}

//Добавляем фотографию в продукт
module.exports.addRecord = function addRecord(req, res) {
    let idProduct = req.params.id;
    let path = imgPath+ 'toys/' + idProduct + '/';
    let form = new formidable.IncomingForm();

    async.waterfall([
        function (callback) {
            fs.stat(path, function (err, stats) {
                //проверка наличия директории
                if (err && err.code == 'ENOENT'){
                    //директории нет создаем ее
                    fs.mkdir(path, function (err) {
                        return callback(err, path);
                    });
                }
                else if (err && err.code != 'ENOENT') {
                    let date = new Date();
                    console.log(date + ' Agams - Products-Photos - addRecord - create dir');
                    console.log(err);
                    return callback(err, null);
                }
                //возвращаем путь для загрузки фотографии
                else
                    return callback(null, path);
            });
        },
        //получаем файл
        function (path, callback) {
            form.uploadDir = path;
            form.keepExtensions = true;
            form.parse(req);
            form.on('file', function (name, file) {
                return callback (null, file.path, path);
            })
        },
        //перименовываем файл и получаем имя файла
        function (photoPath, path ,callback) {
            let fileName = photoPath.substr(photoPath.lastIndexOf('/upload_') + '/upload_'.length);
            fs.rename(photoPath, path + fileName, function (err) {
                if (err){
                    let date = new Date();
                    console.log(date + ' Agams - Products-Photos - addRecord - rename file');
                    console.log(err);
                    return callback(err, null);
                }
                else
                    return callback(null, fileName);
            })
        },
        function (fileName, callback) {
        let parameters = {
            path: '/toys/' + idProduct + '/' + fileName
        }
            modelPhotos.addRecord(parameters, function (result) {
                return callback(null, result.insertId, parameters.path);
            })
        },
        function (idPhoto, path, callback) {
            let parameters = {
                idProduct: idProduct,
                idPhoto: idPhoto,
                default: 0,
                path: path,
                id: idPhoto,
            }
            model.addRecord(parameters, function (result) {
                return callback(null, parameters);
            })
        },
        ],
        function (err, result) {
            if (err) {
                let date = new Date();
                console.log(date + ' Agams - Products-Photos - addRecord');
                console.log(err);
                return res.send(null);
            }
            else{
                return res.send(result);
            }
        })
}

//Удаляем фотографию из продукта
module.exports.removeRecord = function removeRecord(req, res) {
    model.removeRecord({
               idProduct: req.params.idProduct,
               idPhoto: req.params.idPhoto
           }, function (result) {
               return res.send( result);
           });
}
//Устанавливаем фотографию по-умолчанию для продукта
module.exports.setDefault = function setDefault(req, res) {
    model.setDefaultPhotoForProduct({
            idProduct: req.params.idProduct,
            idPhoto: req.params.idPhoto
        }, function (result) {
            return res.send(result);
    });
}