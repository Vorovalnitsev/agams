
function showToysQuantity(){
    $.get('/cart/gettoysquantity', function(data){
        if(data)
            if (data.toysQuantity>0)
                $('.toysQuantity').text('Корзина ' + data.toysQuantity);
            else
                $('.toysQuantity').text('Корзина');
    });
}

function getToysFromCart() {
    $.get('/cart/toys/',
        function(data) {
            let toys = data.toys;
            let total = data.total;
            if (toys.length > 0) {
                toys.forEach(function (toy, i, toys) {
                    $('#' + toy.id + '>.toyQuantity').text(toy.quantity);
                    $('#' + toy.id + '>.toyValue').text(toy.value + ' руб.');

                });
                $("#productsTotal").text(total + " руб.");
            }
            else {
                $("#tableToys").remove();
                $("#formCart").remove();
                $("#pCartEmpty").css('visibility' , 'visible');
                $("#cartQuantity").empty();
            }
        },
        'json');
}

$(document).ready(function(){
    showToysQuantity();
    $(".increaseIntoCart").click(function(){
        let id = $(".increaseIntoCart").attr("value");
        if (id)
        $.get('/cart/increaseIntoCart/' + id, function(data){
            if(data)
                    if(id == data.toy.id){
                        $('.toyQuantity').text(' x ' + data.toy.quantity);
                        $('.toysQuantity').text('Корзина ' + data.toysQuantity);
                    }
        })
    });

    $(".increaseToy").click(function(){
        let id = $(this).attr("value");
        if (id)
        $.get('/cart/increaseIntoCart/' + id, function(data){
            if(data)
                if(id == data.toy.id){
                        $('#' + data.toy.id + '>.toyQuantity').text(data.toy.quantity);
                        $('.toysQuantity').text('Корзина ' + data.toysQuantity);
                }
                getToysFromCart();
        })
    });

    $(".reduceToy").click(function(){
        let id = $(this).attr("value");
        if (id)
        $.get('/cart/reduceIntoCart/' + id, function(data){
            if(data)
                if(id == data.toy.id){
                    if (data.toy.quantity>0){
                        $('#' + data.toy.id + '>.toyQuantity').text(data.toy.quantity);
                    }
                    else 
                        $('#' + data.toy.id).remove();
                    if (data.toysQuantity>0)
                        $('.toysQuantity').text('Корзина ' + data.toysQuantity);
                        else
                        $('.toysQuantity').text('Корзина');
                        
                }
            getToysFromCart();
        })
    });

    $("#orderCreate").click(function(){
        $("#orderCreate").prop("disabled", true);
        let agreement;
        if ($("#agreement").prop("checked") == true)
            agreement = true;
            else 
                agreement = false;
        let order = {
            firstName: $("#firstName").val(),
            lastName: $("#lastName").val(),
            phone: $("#phone").val(),
            email: $("#email").val(),
            address: $("#address").val(),
            comment: $("#comment").val(),
            agreement: agreement
        }
        $.post('/orders/create',
                order)
                .done(function (result) {
                    if (result)
                        if(result.status == 'error'){
                            result.errorFields.forEach(function (field, i, arr){
                                console.log(field);
                                $('#'+field).addClass('is-invalid');
                            })
                        } 
                    $('#orderCreate').prop('disabled', false);      
                })
                .fail(function () {
                    alert('Ошибка сохранения данных');
                    $('#orderCreate').prop('disabled', false);
                });
    })
});

