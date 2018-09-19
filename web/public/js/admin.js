let inProgress = false;
let startFrom = 0;
let quantity = 10;

function getRecords (){
    if(document.location.pathname == '/ages' ||
        document.location.pathname == '/products' ||
        document.location.pathname == '/categories' ||
        document.location.pathname == '/products-categories'
    ){
        inProgress = true;
        let path = document.location.pathname + '/' +  startFrom + '/' + quantity;

        $.get(path,
            function(data) {
                inProgress = false;
                let records = data;
                if (records){
                    startFrom = startFrom + records.length;
                    records.forEach(function (item , i , arr ){
                        if (document.location.pathname == '/ages'){
                            $("#ages").append('<tr class="age" id="' + item.id + '">' +
                                '<td>' + item.id + '</td>' +
                                '<td class="name">' + item.name + '</td>' +
                                '</tr>');
                        }

                        if (document.location.pathname == '/categories'){
                            $("#categories").append('<tr class="category" id="' + item.id + '">' +
                                '<td>' + item.id + '</td>' +
                                '<td class="name">' + item.name + '</td>' +
                                '</tr>');
                        }

                        if (document.location.pathname == '/products'){
                            $("#products").append('<tr class="product" id="' + item.id + '">' +
                                '<td>' + item.id + '</td>' +
                                '<td class="name">' + item.name + '</td>' +
                                '<td class="vendorCode">' + item.vendorCode + '</td>' +
                                '<td class="nameAge">' + item.nameAge + '</td>' +
                                '<td class="price">' + item.price + '</td>' +
                                '<td class="weight">' + item.weight + '</td>' +
                                '</tr>');
                        }

                        if (document.location.pathname == '/products-categories'){
                            $("#productsCategories").append('<tr class="product" id="' + item.id + '">' +
                                '<td>' + item.id + '</td>' +
                                '<td class="name">' + item.name + '</td>' +
                                '<td class="vendorCode">' + item.vendorCode + '</td>' +
                                '<td class="productCategories"></td>' +
                                '</tr>');
                        }

                    });

                };
                if ($(window).height() >= $(document).height() && records.length!=0){
                    getRecords();
                }

            },
            'json');
    }

}

function appendCategories(data){

        $('#editProductCategoriesModal').find('#productCategories').append(
            '<tr id = "' + data.id + '">' +
            '<td>' + data.id + '</td>' +
            '<td>' + data.name +
            '</td>' +
            '</tr>');

}

$(document).ready(function () {

    getRecords();
    $(window).scroll(function () {
        if($(window).scrollTop() + $(window).height() >= $(document).height() - 200
            && !inProgress
        ) {
            getRecords();
        }
    });

    $(window).resize(function () {
        if($(window).height() >= $(document).height()
            && !inProgress
        ) {
            getRecords();
        }
    });

    $('#showAddAge').click(function () {
        $('#editAgeModal').find('#editAgeModalLabel').text('Новый возраст');
        $('#editAgeModal').find('#nameAge').val('');
        $('#editAgeModal').find('#idAge').val('');
        $('#editAgeModal').modal('show');
    });

    $('#ages').on('click', 'tr', function () {
        let id = $(this).attr('id');
        if (id)
            $.get('/ages/' + id,
                function(data) {
                    $('#editAgeModal').find('#editAgeModalLabel').text('Редактирование ID - ' + data.id);
                    $('#editAgeModal').find('#nameAge').val(data.name);
                    $('#editAgeModal').find('#idAge').val(data.id);
                    $('#editAgeModal').modal('show');
                });
    });


    $('#saveAge').click(function () {
       if ($('#editAgeModal').find('#idAge').val())
           $.post('/ages/update/' + $('#editAgeModal').find('#idAge').val(),
               {
                   id: $('#editAgeModal').find('#idAge').val(),
                   name: $('#editAgeModal').find('#nameAge').val()
               }, function (data) {
               if (data){
                   $('#editAgeModal').modal('hide');
                   $('#' + data.id + '>.name').text(data.name);
               }
           });
           else
               $.post('/ages/add', {name: $('#nameAge').val()}, function (data) {
                   if (data){
                       $('#editAgeModal').modal('hide');
                       location.href = '/ages';
                   }
               });
    });


    $('#showAddCategory').click(function () {
        $('#editCategoryModal').find('#editCategoryModalLabel').text('Новая категория');
        $('#editCategoryModal').find('#nameCategory').val('');
        $('#editCategoryModal').find('#idCategory').val('');
        $('#editCategoryModal').modal('show');
    });

    $('#categories').on('click', 'tr', function () {
        let id = $(this).attr('id');
        if (id)
            $.get('/categories/' + id,
                function(data) {
                    $('#editCategoryModal').find('#editCategoryModalLabel').text('Редактирование ID - ' + data.id);
                    $('#editCategoryModal').find('#nameCategory').val(data.name);
                    $('#editCategoryModal').find('#idCategory').val(data.id);
                    $('#editCategoryModal').modal('show');
                });
    });


    $('#saveCategory').click(function () {
        if ($('#editCategoryModal').find('#idCategory').val())
            $.post('/categories/update/' + $('#editCategoryModal').find('#idCategory').val(),
                {
                    id: $('#editCategoryModal').find('#idCategory').val(),
                    name: $('#editCategoryModal').find('#nameCategory').val()
                }, function (data) {
                    if (data){
                        $('#editCategoryModal').modal('hide');
                        $('#' + data.id + '>.name').text(data.name);
                    }
                });
        else
            $.post('/ages/add', {name: $('#nameCategory').val()}, function (data) {
                if (data){
                    $('#editCategoryModal').modal('hide');
                    location.href = '/categories';
                }
            });
    });



    $('#showAddProduct').click(function () {
        $.get('/ages/all', function(data){
            $('#editProductModal').find('#agesList>option').remove();
            data.forEach(function (item , i , arr ){
                $('#editProductModal').find('#agesList').append('<option value = "' + item.id + '">' +
                    item.name + '</option>');
            });

            $('#editProductModal').find('#editProductModalLabel').text('Новый продукт');
            $('#editProductModal').find('#nameProduct').val('');
            $('#editProductModal').find('#idProduct').val('');
            $('#editProductModal').find('#vendorCode').val('');
            $('#editProductModal').find('#description').val('');
            $('#editProductModal').find('#price').val('');
            $('#editProductModal').find('#weight').val('');
            $('#editProductModal').find('#length').val('');
            $('#editProductModal').find('#width').val('');
            $('#editProductModal').find('#height').val('');
            $('#editProductModal').find('#visible').prop('checked', false);
            $('#editProductModal').find('#hit').prop('checked', false);

            $('#editProductModal').modal('show');
        });
    });

    $('#products').on('click', 'tr', function () {
        let id = $(this).attr('id');
        if (id)
            $.get('/products/' + id,
                function(data) {
                    $('#editProductModal').find('#editProductModalLabel').text('Редактирование ID - ' + data.id);
                    $('#editProductModal').find('#nameProduct').val(data.name);
                    $('#editProductModal').find('#idProduct').val(data.id);
                    $('#editProductModal').find('#vendorCode').val(data.vendorCode);
                    $('#editProductModal').find('#description').val(data.description);
                    $('#editProductModal').find('#price').val(data.price);
                    $('#editProductModal').find('#weight').val(data.weight);
                    $('#editProductModal').find('#length').val(data.length);
                    $('#editProductModal').find('#width').val(data.width);
                    $('#editProductModal').find('#height').val(data.height);
                    $('#editProductModal').find('#visible').prop('checked', data.visible);
                    $('#editProductModal').find('#hit').prop('checked', data.hit);
                    let idAge = data.idAge;
                    $.get('/ages/all', function(data) {
                        $('#editProductModal').find('#agesList>option').remove();
                        data.forEach(function (item, i, arr) {
                            $('#editProductModal').find('#agesList').append('<option value = "' + item.id + '">' +
                                item.name + '</option>');
                        });
                        $('#editProductModal').find('#agesList').val(idAge);
                        $('#editProductModal').modal('show');
                    });
                });
    });


    $('#saveProduct').click(function () {
        let visible = 0;
        let hit = 0;

        if ($('#editProductModal').find('#visible').is(':checked'))
            visible = 1;
        if ($('#editProductModal').find('#hit').is(':checked'))
            hit = 1;

        let product = {
            id: $('#editProductModal').find('#idProduct').val(),
            name: $('#editProductModal').find('#nameProduct').val(),
            vendorCode: $('#editProductModal').find('#vendorCode').val(),
            description: $('#editProductModal').find('#description').val(),
            idAge: $('#editProductModal').find('#agesList').val(),
            price: $('#editProductModal').find('#price').val(),
            weight: $('#editProductModal').find('#weight').val(),
            length: $('#editProductModal').find('#length').val(),
            width: $('#editProductModal').find('#width').val(),
            height: $('#editProductModal').find('#height').val(),
            visible: visible,
            hit: hit
        };
        if ($('#editProductModal').find('#idProduct').val())
            $.post('/products/update/' + $('#editProductModal').find('#idProduct').val(), product, function (data) {
                    if (data){
                        $('#editProductModal').modal('hide');
                        $('#' + data.id + '>.name').text(data.name);
                        $('#' + data.id + '>.vendorCode').text(data.vendorCode);
                        $('#' + data.id + '>.nameAge').text(data.nameAge);
                        $('#' + data.id + '>.price').text(data.price);
                        $('#' + data.id + '>.weight').text(data.weight);

                    }
                });
        else
            $.post('/products/add', product, function (data) {
                if (data){
                    $('#editProductModal').modal('hide');
                    location.href = '/products';
                }
            });
    });

    $('#productsCategories').on('click', 'tr', function () {
        let idProduct = $(this).attr('id');
        if (idProduct)
            $.get('/products/' + idProduct,
                function(data) {
                    $('#editProductCategoriesModal').find('#editProductCategoriesLabel').text('Редактирование ID - ' +
                        data.id +
                    ' ' + data.name);
                    $('#editProductCategoriesModal').find('#nameProduct').text(data.name);
                    $('#editProductCategoriesModal').find('#idProduct').val(data.id);
                    $('#editProductCategoriesModal').find('#vendorCode').text(data.vendorCode);

                    $.get('/products-categories/' + idProduct, function(data) {
                        $('#editProductCategoriesModal').find('#productCategories>tr').remove();
                        data.forEach(function (item, i, arr) {
                            appendCategories(item);
                        });
                    });
                    $.get('/products-categories/' + idProduct + '/available', function(data) {
                        $('#editProductCategoriesModal').find('#categoriesList>option').remove();
                        data.forEach(function (item, i, arr) {
                            $('#editProductCategoriesModal').find('#categoriesList').append('<option value = "' + item.id + '">' +
                                item.name + '</option>');
                        });
                    });
                    $('#editProductCategoriesModal').modal('show');
                });
    });

    $('#addCategory').click(function () {
        let idProduct = $('#editProductCategoriesModal').find('#idProduct').val();
        if ($('#editProductCategoriesModal').find('#categoriesList').val()){
            let productCategory = {
                idProduct: idProduct,
                idCategory: $('#editProductCategoriesModal').find('#categoriesList').val()
            };
            $.post('/products-categories/' + idProduct + '/add' , productCategory,
                function (data) {
                    if (data){
                        appendCategories(data);
                        $.get('/products-categories/' + idProduct + '/available', function(data) {
                            $('#editProductCategoriesModal').find('#categoriesList>option').remove();
                            data.forEach(function (item, i, arr) {
                                $('#editProductCategoriesModal').find('#categoriesList').append('<option value = "' + item.id + '">' +
                                    item.name + '</option>');
                            });
                        });
                    }
                });
        }
    });

    $('#productCategories').on('click', 'tr', function () {
        let idCategory = $(this).attr('id');
        let idProduct = $('#editProductCategoriesModal').find('#idProduct').val();
        $.get('/products-categories/' + idProduct + '/' + idCategory +'/remove', function(data) {
            if (data){
                $('#editProductCategoriesModal').find('#' +data.idCategory).remove();
                $.get('/products-categories/' + idProduct + '/available', function(data) {
                    $('#editProductCategoriesModal').find('#categoriesList>option').remove();
                    data.forEach(function (item, i, arr) {
                        $('#editProductCategoriesModal').find('#categoriesList').append('<option value = "' + item.id + '">' +
                            item.name + '</option>');
                    });
                });
            }
        });
    });

})