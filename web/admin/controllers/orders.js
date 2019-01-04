const model = require ('../models').orders;


//Центральная страница
module.exports.index = function index(req, res) {
    res.render('records.handlebars');
}


//Отдаем список заказов. Указанное количество записей с указанной позиции.
module.exports.getRecordsFromQuantity = function getRecordsFromQuantity(req, res) {
    model.getRecordsFromQuantity(req.params.from, req.params.quantity, function (result) {
        res.send(result);
    });
}

//Отдаем указанную категорию по ID
module.exports.getRecordById = function getRecordById(req, res){
    model.getRecordById(req.params.id, function (result) {
       res.send(result);
    });
}

//Добавляем новую категорию
module.exports.addRecord = function addRecord(req, res){
    model.addRecord({name: req.body.name}, function (result) {
        res.send(result);
    })
}

//Обновляем категорию
module.exports.updateRecord = function updateRecord(req, res){
    model.updateRecord({id: req.body.id, name: req.body.name}, function (result) {
        res.send(result);
    })
}

