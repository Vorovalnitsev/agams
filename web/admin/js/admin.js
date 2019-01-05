let inProgress = false;
let startFrom = 0;
let quantity = 10;

const parametersRecords = {
    "/ages": {
        title: "Справочник возрастов",
        addButton: "Добавить возраст",
        recordsTableTableHead: ["id", "Название"],
        recordsTableFieldName: ["id", "name"],
        modalName: "editAgeModal",
        path: "/ages"
    },
    "/products": {
        title: "Справочник продуктов",
        addButton: "Добавить продукт",
        recordsTableTableHead: ["id", "Название", "Артикул", "Возраст", "Цена", "Вес" ],
        recordsTableFieldName: ["id", "name", "vendorCode", "nameAge", "price", "weight"],
        modalName: "editProductModal",
        path: "/products"
    },
    "/categories": {
        title: "Справочник категорий",
        addButton: "Добавить категорию",
        recordsTableTableHead: ["id", "Название"],
        recordsTableFieldName: ["id", "name"],
        modalName: "editCategoriesModal",
        path: "/categories"
    },
    "/users": {
        title: "Справочник пользователей",
        addButton: "Добавить пользователя",
        recordsTableTableHead: ["id", "ФИО", "Логин", "E-mail"],
        recordsTableFieldName: ["id", "fullName", "userName", "email"],
        modalName: "editAgeModal",
        path: "/users"
    },
    "/orders": {
        title: "Заказы",
        addButton: "none",
        recordsTableTableHead: ["id", "Дата создания", "Фамилия", "Имя", "Телефон", "E-mail","П", "Г", "О", "Д"],
        recordsTableFieldName: ["id", "createdDate", "lastName", "firstName", "phone", "email", "confirmed", "ready", "sent", "delivered"],
        modalName: "editOrder",
        path: "/orders"
    },
}

let nameOfModalToOpen;

$('.modal').on('hidden.bs.modal', function (e) {
    if (nameOfModalToOpen == 'editProductModal') {
        nameOfModalToOpen = '';
        showProduct($('#idRecord').val());
    }

    if (nameOfModalToOpen == 'editProductCategoriesModal') {
        nameOfModalToOpen = '';
        showProductCategories($('#idRecord').val());
    }

    if (nameOfModalToOpen == 'editProductPhotosModal') {
        nameOfModalToOpen = '';
        showProductPhotos($('#idRecord').val());
    }

    if (nameOfModalToOpen == 'editUserPasswordModal') {
        nameOfModalToOpen = '';
        showUserPassword($('#idRecord').val());
    }
})

function initPage() {
    let currentPath = document.location.pathname;
    let records = parametersRecords[currentPath];
    if(records){
        $("#recordsTitle").text(records.title);
        $("#addRecordButton").text(records.addButton);
        records.recordsTableTableHead.forEach(function (item , i , arr ){
            $("#recordsTableHead").append('<th>' + item + '</th>');
        });

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

        $('#addRecordButton').on('click', function () {
            let url = document.location.pathname;
            if (url =='/products')
                showProduct();
            if (url =='/ages')
                showAge();
            if (url =='/categories')
                showCategory();
            if (url =='/users')
                showUser();
        });

        $('#recordsTable').on('click', 'tr', function () {
            let url = document.location.pathname;
            if (url =='/products'){
                showProduct($(this).attr('id'));
            }
            if (url =='/ages'){
                showAge($(this).attr('id'));
            }

            if (url =='/categories'){
                showCategory($(this).attr('id'));
            }

            if (url =='/users'){
                showUser($(this).attr('id'));
            }

            if (url =='/orders'){
                showOrder($(this).attr('id'));
            }


        });
        $('.saveRecord').click(function () {
            let url = document.location.pathname;

            if (url == '/products'){
                let visible = 0;
                let hit = 0;

                if ($('#editProductModal').find('#visible').is(':checked'))
                    visible = 1;
                if ($('#editProductModal').find('#hit').is(':checked'))
                    hit = 1;
                let data = {
                    id: $('#idRecord').val(),
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
                }
                saveRecord(url, data);
            }

            if (url == '/ages')
                saveRecord(url, {
                    id: $('#idRecord').val(),
                    name: $('#editAgeModal').find('#nameAge').val()
                });
            if (url == '/categories')
                saveRecord(url, {
                    id: $('#idRecord').val(),
                    name: $('#editCategoryModal').find('#nameCategory').val()
                });
            if (url == '/users')
                saveRecord(url, {
                    id: $('#idRecord').val(),
                    userName: $('#editUserModal').find('#userName').val(),
                    fullName: $('#editUserModal').find('#fullName').val(),
                    email: $('#editUserModal').find('#email').val()
                });
        });

        $('.productOpenButton').click( function () {
            nameOfModalToOpen ='editProductModal';
            $('.modal').modal('hide');
        });
        $('.productPhotosOpenButton').click( function () {
            if ($('#idRecord').val()) {
                nameOfModalToOpen = 'editProductPhotosModal';
                $('.modal').modal('hide');
            }
        });
        $('.productCategoriesOpenButton').click( function () {
            if ($('#idRecord').val()){
                nameOfModalToOpen ='editProductCategoriesModal';
                $('.modal').modal('hide');
            }
        });

        $('#addCategory').click(function () {
            let idProduct = $('#idRecord').val();
            if ($('#editProductCategoriesModal').find('#categoriesList').val()){
                let productCategory = {
                    idProduct: idProduct,
                    idCategory: $('#editProductCategoriesModal').find('#categoriesList').val()
                };
                $.post('/products-categories/' + idProduct + '/add' , productCategory,
                    function (data) {
                        if (data){
                            appendCategoryToProductCategoriesModal(data);
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
        
        $('#productCategories').on('click', '.removeCategoryFromProduct', function () {
            let idCategory = $(this).closest('tr').attr('id');
            let idProduct = $('#idRecord').val();
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

        $('#addPhotoButton').click(function (event) {
            $('#addPhotoButton').prop('disabled', true);
            let idProduct = $('#idRecord').val();
            let files = $('input[type=file]').prop('files');

            event.stopPropagation();
            event.preventDefault();

            var data = new FormData();
            $.each( files, function( key, value ){
                data.append( key, value );
            });

            // Отправляем запрос

            $.ajax({
                url: '/products-photos/' + idProduct + '/add',
                type: 'POST',
                data: data,
                cache: false,
                dataType: 'json',
                processData: false,
                contentType: false,
                success: function( data, textStatus, jqXHR ){

                    // Если все ОК
                    $('#addPhotoButton').prop('disabled', false);
                    $('input[type=file]').prop('value', '');

                    if( typeof data.error === 'undefined' ){
                        // Файлы успешно загружены, делаем что нибудь здесь

                        // выведем пути к загруженным файлам в блок '.ajax-respond'
                        appendPhotoToProductPhotosModal(data);
                    }
                    else{
                        console.log('ОШИБКИ ОТВЕТА сервера: ' + data.error );
                    }
                },
                error: function( jqXHR, textStatus, errorThrown ){
                    console.log('ОШИБКИ AJAX запроса: ' + textStatus );
                    $('#addPhotoButton').prop('disabled', false);
                    $('input[type=file]').prop('value', '');
                }
            });
        });
        $('#productPhotos').on('click', '.removePhotoFromProduct', function () {
            let idPhoto = $(this).closest('tr').attr('id');
            let idProduct = $('#idRecord').val();
            $.get('/products-photos/' + idProduct + '/' + idPhoto +'/remove', function(data) {
                if (data){
                        $('#editProductPhotosModal').find('#' + data.idPhoto).remove();
                    }
            });
        });
        $('#productPhotos').on('click', '.defaultPhotoFromProduct', function () {
            let idPhoto = $(this).closest('tr').attr('id');
            let idProduct = $('#idRecord').val();
            $.get('/products-photos/' + idProduct + '/' + idPhoto +'/default', function(data) {
                if (data){
                    $('#editProductPhotosModal').find('.table-success').removeClass();
                    $('#editProductPhotosModal').find('#' + data.idPhoto).addClass('table-success');
                }
            });
        });

        $('.userPasswordChangeOpenButton').click( function () {
            if ($('#idRecord').val()){
                nameOfModalToOpen ='editUserPasswordModal';
                $('.modal').modal('hide');
            }
        });

        $('.savePassword').click( function () {
            if ($('#idRecord').val()){
                $.post('/users/' + $('#idRecord').val() + '/changepassword',
                    {
                        id: $('#idRecord').val(),
                        password: $('#editUserPasswordModal').find('#password').val(),
                        repassword: $('#editUserPasswordModal').find('#repassword').val(),

                    })
                    .done(function (result) {
                        if (result)
                            if (result.err) {
                                alert('Ошибка изменения пароля');
                            }
                            else
                                $('.modal').modal('hide');
                    })
                    .fail(function () {
                        alert('Ошибка сохранения данных');
                    });
            }
        });
    }
}
function getRecords (){
    let currentPath = document.location.pathname;
    let records = parametersRecords[currentPath];
    if(records){
        inProgress = true;
        let path = records.path + '/' +  startFrom + '/' + quantity;
        $.get(path,
            function(data) {
                inProgress = false;
                if (data){
                    startFrom = startFrom + data.length;
                    data.forEach(function (item , i , arr ){
                        {
                            $("#recordsTable").append('<tr id="' + item.id + '"></tr>');
                            records.recordsTableFieldName.forEach(function (field , i , arr ){
                                $("#" + item.id).append('<td class="' + field + '">' + item[field] + '</td>');
                            })
                        }
                    });

                };
                if ($(window).height() >= $(document).height() && data.length!=0){
                    getRecords();
                }
            },
            'json');
    }
}

function appendCategoryToProductCategoriesModal(data){

        $('#editProductCategoriesModal').find('#productCategories').append(
            '<tr id = "' + data.id + '">' +
            '<td>' + data.id + '</td>' +
            '<td>' + data.name +
            '</td>' +
            '<td> <button class="btn btn-danger btn-sm removeCategoryFromProduct">удалить</button>' +
            '</td>' +
            '</tr>');

}
function appendPhotoToProductPhotosModal(data){

    $('#editProductPhotosModal').find('#productPhotos').append(
        '<tr id = "' + data.id + '">' +
        '<td>' + data.id + '</td>' +
        '<td> <img src="/img' + data.path + '" class="col-sm-4">' +
        '</td>' +
        '<td> <button class="btn btn-danger btn-sm removePhotoFromProduct">удалить</button>' +
        '<td><button class="btn btn-primary btn-sm defaultPhotoFromProduct">по-умолчанию</button></td>' +
        '</td>' +
        '</tr>');
    if (data.defaultPhoto == 1)
        $('#editProductPhotosModal').find('#' + data.id).addClass('table-success');
}

function showProduct(id) {
    $.get('/ages/all', function(data) {
        $('#editProductModal').find('#agesList>option').remove();
        data.forEach(function (item, i, arr) {
            $('#editProductModal').find('#agesList').append('<option value = "' + item.id + '">' +
                item.name + '</option>');
        });
    });
    if (id)
        $.get('/products/' + id,
            function(data) {
                $('#editProductModal').find('#editProductModalLabel').text('Редактирование ID - ' + data.id);
                $('#editProductModal').find('#nameProduct').val(data.name);
                $('#idRecord').val(data.id);
                $('#editProductModal').find('#vendorCode').val(data.vendorCode);
                $('#editProductModal').find('#description').val(data.description);
                $('#editProductModal').find('#price').val(data.price);
                $('#editProductModal').find('#weight').val(data.weight);
                $('#editProductModal').find('#length').val(data.length);
                $('#editProductModal').find('#width').val(data.width);
                $('#editProductModal').find('#height').val(data.height);
                $('#editProductModal').find('#visible').prop('checked', data.visible);
                $('#editProductModal').find('#hit').prop('checked', data.hit);
                $('#editProductModal').find('#agesList').val(data.idAge);
                $('#editProductModal').modal('show');
                });
    else{
        $('#editProductModal').find('#editProductModalLabel').text('Новый продукт');
        $('#editProductModal').find('#nameProduct').val('');
        $('#idRecord').val('');
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
    }

}
function showProductCategories(id) {
    if (id)
        $.get('/products/' + id,
            function(data) {
                $('#editProductCategoriesModal').find('#editProductCategoriesLabel').text('Редактирование ID - ' +
                    data.id);
                $('#editProductCategoriesModal').find('#nameProduct').text(data.name);
                $('#editProductCategoriesModal').find('#vendorCode').text(data.vendorCode);

                $.get('/products-categories/' + id, function(data) {
                    $('#editProductCategoriesModal').find('#productCategories>tr').remove();
                    data.forEach(function (item, i, arr) {
                        appendCategoryToProductCategoriesModal(item);
                    });
                });
                $.get('/products-categories/' + id + '/available', function(data) {
                    $('#editProductCategoriesModal').find('#categoriesList>option').remove();
                    data.forEach(function (item, i, arr) {
                        $('#editProductCategoriesModal').find('#categoriesList').append('<option value = "' + item.id + '">' +
                            item.name + '</option>');
                    });
                });
                $('#editProductCategoriesModal').modal('show');
            });
}
function showProductPhotos(id) {
    if (id)
        $.get('/products/' + id,
            function(data) {
                $('#editProductPhotosModal').find('#editProductPhotosModal').text('Редактирование ID - ' +
                    data.id);
                $('#editProductPhotosModal').find('#nameProduct').text(data.name);
                $('#editProductPhotosModal').find('#vendorCode').text(data.vendorCode);

                $.get('/products-photos/' + id, function(data) {
                    $('#editProductPhotosModal').find('#productPhotos>tr').remove();
                    data.forEach(function (item, i, arr) {
                        appendPhotoToProductPhotosModal(item);
                    });
                });
                $('#editProductPhotosModal').modal('show');
            });
}

function showAge(id){
    if(id)
        $.get('/ages/' + id,
            function(data) {
                $('#editAgeModal').find('#editAgeModalLabel').text('Редактирование ID - ' + data.id);
                $('#editAgeModal').find('#nameAge').val(data.name);
                $('#idRecord').val(data.id);
                $('#editAgeModal').modal('show');
            });
    else{
        $('#editAgeModal').find('#editAgeModalLabel').text('Новый возраст');
        $('#editAgeModal').find('#nameAge').val('');
        $('#idRecord').val('');
        $('#editAgeModal').modal('show');
    }

}

function showCategory(id){
    if(id)
        $.get('/categories/' + id,
            function(data) {
                $('#editCategoryModal').find('#editCategoryModalLabel').text('Редактирование ID - ' + data.id);
                $('#editCategoryModal').find('#nameCategory').val(data.name);
                $('#idRecord').val(data.id);
                $('#editCategoryModal').modal('show');
            });
    else{
        $('#editCategoryModal').find('#editCategoryModalLabel').text('Новая категория');
        $('#editCategoryModal').find('#nameCategory').val('');
        $('#idRecord').val('');
        $('#editCategoryModal').modal('show');
    }

}

function showUser(id){
    if(id)
        $.get('/users/' + id,
            function(data) {
                $('#editUserModal').find('#editUserModalLabel').text('Редактирование ID - ' + data.id);
                $('#editUserModal').find('#fullName').val(data.fullName);
                $('#editUserModal').find('#userName').val(data.userName);
                $('#editUserModal').find('#email').val(data.email);
                $('#idRecord').val(data.id);
                $('#editUserModal').modal('show');
            });
    else{
        $('#editUserModal').find('#editUserModalLabel').text('Новый пользователь');
        $('#editUserModal').find('#fullName').val('');
        $('#editUserModal').find('#userName').val('');
        $('#editUserModal').find('#email').val('');
        $('#idRecord').val('');
        $('#editUserModal').modal('show');
    }

}

function showUserPassword(id){
    if(id)
        $.get('/users/' + id,
            function(data) {
                $('#editUserPasswordModal').find('#editUserPasswordModalLabel').text('Редактирование ID - ' + data.id);
                $('#editUserPasswordModal').find('#fullName').text(data.fullName);
                $('#editUserPasswordModal').find('#userName').text(data.userName);
                $('#idRecord').val(data.id);
                $('#editUserPasswordModal').modal('show');
            });
}

function showOrder(id) {
    if (id){
        $.get('/orders/' + id,
            function(data) {
                $('#editOrderModal').find('#editOrderModalLabel').text('Редактирование ID - ' + data.id);
                $('#editOrderModal').find('#lastName').val(data.lastName);
                $('#editOrderModal').find('#firstName').val(data.firstName);
                $('#idRecord').val(data.id);
                $('#editOrderModal').find('#email').val(data.email);
                $('#editOrderModal').find('#phone').val(data.phone);
                $('#editOrderModal').find('#address').val(data.address);
                $('#editOrderModal').find('#comment').val(data.comment);
                $('#editOrderModal').modal('show');
                });
        $.get('/orders-products/' + id,
            function(data) {
                data.forEach(function (item, i, arr) {
                    $('#editOrderModal').find('#orderProducts').append(
                        '<tr id = "' + item.id + '">' +
                        '<td>' + item.id + '</td>' +
                        '<td>' + item.name + '</td>' +
                        '<td>' + item.vendorName + '</td>' +
                        '<td>' + item.quantity + '</td>' +
                        '<td>' + item.price + '</td>' +
                        '</tr>');
                    });
                });

    }
        
    else{
        $('#editOrderModal').find('#editOrderModalLabel').text('Новвый заказ');
                $('#editOrderModal').find('#lastName').val('');
                $('#editOrderModal').find('#firstName').val('');
                $('#idRecord').val('');
                $('#editOrderModal').find('#email').val('');
                $('#editOrderModal').find('#phone').val('');
                $('#editOrderModal').find('#address').val('');
                $('#editOrderModal').find('#comment').val('');
                $('#editOrderModal').modal('show');
    }

}

function saveRecord(url, data){
    let parameters = parametersRecords[url]
    if (data.id)
        $.post(parameters.path + '/update/' + data.id, data)
            .done(function (result) {
                if (result){
                    $('.modal').modal('hide');
                    parameters.recordsTableFieldName.forEach(function (item, i, arr){
                        $("#" + result.id + ">." + item).text(result[item]);
                    })
                }
            })
            .fail(function () {
                alert('Ошибка сохранения данных');
            });
    else
        $.post(parameters.path + '/add', data, function (result) {
            if (result)
                location.href = parameters.path;
        });
}

$(document).ready(function () {
    initPage();
    
})

