const async = require('async');
const modelProducts = require('../models').products;


function getToysQuantityInCart(req){
    let toysQuantity = 0;
    if (req.session.order){
        let order = req.session.order;
        for (let i = 0; i<order.length; i++){
            toysQuantity = toysQuantity + order[i].quantity;
        }
    }
    return toysQuantity;
}
module.exports.getToysQuantity = function getToysQuantity(req, res){
    res.send({toysQuantity : getToysQuantityInCart(req)})
}

//добавляем игрушку в корзину
//увеличиваем количество на 1
module.exports.increaseIntoCart = function increadeIntoCart(req, res){
    let id = req.params.id;
    let toy;
    if (req.session.order){
        let order = req.session.order;
        let added = false;
    
        for (let i = 0; i<order.length; i++){
            if (order[i].id == id)
            {
                order[i].quantity = order[i].quantity + 1;
                toy = order[i];
                added = true;

            }
        }
        if (!added){
            toy = {id : id, quantity : 1}
            order.push(toy);
        }
        req.session.order = order;
    }
    else {
        toy = {id : id, quantity : 1}
        req.session.order = [toy];
    }
    res.send({ toysQuantity : getToysQuantityInCart(req), toy: toy});
}

//Уменьшаем количество товара в корзине на 1. Если количество товара = 0, то удаляем его
//Возвращаем json {quantity}
module.exports.reduceIntoCart = function reduceIntoCart(req, res) {
    let id = req.params.id;
    let toy;
    if (req.session.order){
        let order = req.session.order;
        let tmpOrder = [];
        for (let i = 0; i < order.length; i++){
            if (order[i].id == id) {
                order[i].quantity = order[i].quantity - 1;
                toy = order[i];
            }
            if (order[i].quantity > 0){
                tmpOrder.push({id : order[i].id, quantity: order[i].quantity});
            }         
        }
        req.session.order = tmpOrder;
    }
    res.send({ toysQuantity : getToysQuantityInCart(req), toy: toy});
};


//Возвращаем товары в корзине и сумму покупки
//json {toys, total}
module.exports.getToys = function getToys (req, res){
    let toys = [];
    if (req.session.order){
        let order = req.session.order;
        let total = 0;
        async.eachSeries(order, function (item, callback) {
            modelProducts.getRecordById(item.id, function(toy){        
                var value = item.quantity * toy.price;
                toys.push({ id: toy.id, quantity : item.quantity,
                        value: value});
                    total = total + value;
                    callback();
            });
        }, function (err){
            if (err){
                let date = new Date();
                console.log(date + ' Agams Shop - Carts - getToys');
                console.log(err);
                res.send();
            }          
            else {
                res.send({ toys : toys, total : total});
            }
        });
    }
    else
        res.send();
};

//показываем товары в корзине. Для этого перебираем товары, ранее сохраненые в сессии.
module.exports.index = function index (req, res) {
    let toys = [];
    if (req.session.order){
        var order = req.session.order;
        var total = 0;
        async.eachSeries(order, function (item, callback) {
            modelProducts.getRecordById(item.id, function(toy){        
                var value = item.quantity * toy.price;
                toys.push({ toy: toy, quantity : item.quantity,
                        value: value});
                    total = total + value;
                    callback();
            });
        }, function (err){
            if (err){
                let date = new Date();
                console.log(date + ' Agams Shop - Carts - getToys');
                console.log(err);
            }
            res.render('cart.handlebars', {toys : toys, total: total});
        });   
    }
    else 
        res.render('cart.handlebars');
};

