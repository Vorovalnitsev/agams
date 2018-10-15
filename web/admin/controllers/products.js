const model = require ('../models').products;


//Центральная страница
module.exports.index = function index(req, res) {
    res.render('records.handlebars');
}


//Отдаем справочник продуктов. Указанное количество записей с указанной позиции.
module.exports.getRecordsFromQuantity = function getRecordsFromQuantity(req, res) {
    model.getRecordsFromQuantity(req.params.from, req.params.quantity, function (result) {
        res.send(result);
    });
}

//Отдаем указанный продукт по ID
module.exports.getRecordById = function getRecordById(req, res){
    model.getRecordById(req.params.id, function (result) {
       res.send(result);
    });
}

//Добавляем новый продукт
module.exports.addRecord = function addRecord(req, res){
    model.addRecord({
        name: req.body.name,
        vendorCode: req.body.vendorCode,
        description: req.body.description,
        idAge: req.body.idAge,
        price: req.body.price,
        visible: req.body.visible,
        hit: req.body.hit,
        weight: req.body.weight,
        length: req.body.length,
        width: req.body.width,
        height: req.body.height
    }, function (result) {
        res.send(result);
    })
}

//Обновляем продукт
module.exports.updateRecord = function updateRecord(req, res){
    model.updateRecord({
        id: req.body.id,
        name: req.body.name,
        vendorCode: req.body.vendorCode,
        description: req.body.description,
        idAge: req.body.idAge,
        price: req.body.price,
        visible: req.body.visible,
        hit: req.body.hit,
        weight: req.body.weight,
        length: req.body.length,
        width: req.body.width,
        height: req.body.height
    }, function (result) {
        res.send(result);
    })
}

