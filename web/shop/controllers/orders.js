model = require('../models').orders;
modelProducts = require('../models').products;

module.exports.createOrder = function createOrder(req,res){
    let order = {
        lastName: req.body.lastName,
        firstName: req.body.firstName,
        phone: req.body.phone,
        address: req.body.address,
        email: req.body.email
    };

    let status;
    let errorFields = [];
    //проверяем наличие информации в полях Имя, Фамилия, Телефон, email
    if (!req.body.lastName || req.body.lastName == ''){
        status = 'error';
        errorFields.push('lastName');
    }

    if (!req.body.firstName || req.body.firstName == ''){
        status = 'error';
        errorFields.push('firstName');
    }

    if (!req.body.phone || req.body.phone == ''){
        status = 'error';
        errorFields.push('phone');
    }

    if (!req.body.email || req.body.email == ''){
        status = 'error';
        errorFields.push('email');
    }

    console.log(errorFields);

  
    if (status == 'error')
        res.send({status: status, errorFields: errorFields});
        else 
            model.addRecord (order, function(result){
                if (result){
                    res.send({status: 'created'});
                }
            })
}

