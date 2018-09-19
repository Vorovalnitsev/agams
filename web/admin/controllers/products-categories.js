const model = require ('../models').productsCategories;
const modelCategories = require ('../models').categories;


//Центральная страница
module.exports.index = function index(req, res) {
    res.render('products-categories.handlebars');
}

//Отдаем продукт-категории по ID продукта
module.exports.getCategoriesByProductId = function getCategoriesByProductId(req, res) {
    model.getCategoriesByProductId(req.params.id, function (result) {
        res.send(result);
    });

}

//Отдаем доступные категории для продукта по ID. Доступные категории, которые еще не были добавлены в продукт.
module.exports.getAvailableCategoriesByProductId = function getAvailableCategoriesByProductId(req, res) {
    model.getAvailableCategoriesByProductId(req.params.id, function (result) {
        res.send(result);
    });
}
//Добавляем категорию в продукт
module.exports.addRecord = function addRecord(req, res) {
    model.addRecord({
        idProduct: req.body.idProduct,
        idCategory: req.body.idCategory
    }, function (result) {
        modelCategories.getRecordById(result.idCategory, function (result) {
            res.send(result);
        })

    });
}
//Удаляем категорию из продукта
module.exports.removeRecord = function removeRecord(req, res) {
    model.removeRecord({
        idProduct: req.params.idProduct,
        idCategory: req.params.idCategory
    }, function (result) {
        res.send(result);
    });
}
