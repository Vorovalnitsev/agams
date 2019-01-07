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
    let name = 'N/A';
    let vendorCode = '';
    let description = '';
    let idAge = null;
    let price = 0;
    let visible = false;
    let hit = false;
    let weight = 0;
    let length = 0;
    let width = 0;
    let height = 0;

    if (req.body.name)
            name = req.body.name;

    if (req.body.vendorCode)
            vendorCode = req.body.vendorCode;

    if (req.body.description)
            description = req.body.description;

    if (req.body.idAge)
                idAge = req.body.idAge;
    
    if (req.body.price) 
                price = req.body.price;
    
    visible = req.body.visible;
    hit = req.body.hit;
    
    if (req.body.weight)
                weight = req.body.weight;
                
    if (req.body.length)
                length = req.body.length;
    
    if (req.body.width)
                width = req.body.width;
    
    if (req.body.height)
                height = req.body.height;            
    
    model.addRecord({
        name: name,
        vendorCode: vendorCode,
        description: description,
        idAge: idAge,
        price: price,
        visible: visible,
        hit: hit,
        weight: weight,
        length: length,
        width: width,
        height: height
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

