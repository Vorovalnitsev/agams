const model = require('../models').orders;
const modelProducts = require('../models').products;
const modelOrderProduct = require('../models').orderProduct;
const async = require('async');


//Создание заказа
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
        status = 'errorFieldIsEmpty';
        errorFields.push('lastName');
    }

    if (!req.body.firstName || req.body.firstName == ''){
        status = 'errorFieldIsEmpty';
        errorFields.push('firstName');
    }

    if (!req.body.phone || req.body.phone == ''){
        status = 'errorFieldIsEmpty';
        errorFields.push('phone');
    }

    if (!req.body.email || req.body.email == ''){
        status = 'errorFieldIsEmpty';
        errorFields.push('email');
    }

    if (!req.body.agreement || req.body.agreement == '' || req.body.agreement == 'false'){
        status = 'errorFieldIsEmpty';
        errorFields.push('agreement');
    }

    if (status == 'errorFieldIsEmpty')
        res.send({status: status, errorFields: errorFields});
        else 
            //добавляем информацию о заказе
            model.addRecord (order, function(result){
                if (result){
                    let order = req.session.order;
                    let idOrder = result.insertId;
                    //добавляем информацию о продукта в заказе
                    async.eachSeries(order, function (item, callback) {
                        modelProducts.getRecordById(item.id, function(result){
                            if (result){
                                let product = {
                                    idOrder: idOrder,
                                    idProduct: item.id,
                                    quantity: item.quantity,
                                    price: result.price
                                } 
                                modelOrderProduct.addRecord(product, function(result){
                                    if (result)
                                        callback();
                                        else 
                                            callback(true);                           
                                });
                            }
                            else 
                                callback(true); 
                        });
                    },
                        function (err){
                            if (err){
                                let date = new Date();
                                console.log(date + ' Agams Shop - Orders - createOrder');
                                console.log(err);
                                res.send({status: 'errorCreateOrder'});
                            }          
                            else {
                                req.session.order = null;
                                res.send({status: 'orderIsCreated'});
                            }
                    })         
                }
                else
                    res.send();
            })
}

