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
        let toyInOrder;
        model.getRecordById(id, function (result) {
            if (req.session.order){
                let order = req.session.order;
                for (var i = 0; i<order.length; i++){
                    if (order[i].id == id)
                    toyInOrder = order[i];
                }
            }
            toy = result;
            if (toyInOrder)
                toy.quantity = toyInOrder.quantity;
            res.render('toy.handlebars', {toy: toy, photos: photos});
        });
    })
}