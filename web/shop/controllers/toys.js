model = require('../models').products;
modelPhotos = require('../models').photos;
//Каталог игрушек
module.exports.index = function index(req, res) {
    model.getRecords(function (result) {
        res.render('toys.handlebars', {toys: result});
    });
}
//Выводим игрушку
module.exports.getRecordById = function getRecordById(req, res) {
    let id = req.params.id;
    modelPhotos.getPhotosByProductId(id, function (photos) {
        model.getRecordById(id, function (result) {
            res.render('toy.handlebars', {toy: result, photos: photos});
        });
    })

}