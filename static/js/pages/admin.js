$('.link-list').children().click(function(){
    let element = this;
    $('.link-list').children().children().removeClass('active');
    $(this).children().children().addClass('active');
    $('.tab-content>div').hide();
    $('#'+$(element).children('li').attr('aria-controls')).show();
});

let userDataTable = $('#users-table').DataTable({
    "columnDefs": [
        {
            "targets": [5],
            "visible":false
        }
    ],
    "order": [[0,'asc']],
    "language": {
        "sProcessing":    "Procesando...",
        "sLengthMenu":    "Mostrar _MENU_ registros",
        "sZeroRecords":   "No se encontraron resultados",
        "sEmptyTable":    "Ningún dato disponible en esta tabla",
        "sInfo":          "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
        "sInfoEmpty":     "Mostrando registros del 0 al 0 de un total de 0 registros",
        "sInfoFiltered":  "(filtrado de un total de _MAX_ registros)",
        "sInfoPostFix":   "",
        "sSearch":        "Buscar:",
        "sUrl":           "",
        "sInfoThousands":  ",",
        "sLoadingRecords": "Cargando...",
        "oPaginate": {
            "sFirst":    "Primero",
            "sLast":    "Último",
            "sNext":    "Siguiente",
            "sPrevious": "Anterior"
        },
        "oAria": {
            "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
            "sSortDescending": ": Activar para ordenar la columna de manera descendente"
        }
    }
});

let eventDataTable = $('#event-table').DataTable({
    "order": [[0,'asc']],
    "language": {
        "sProcessing":    "Procesando...",
        "sLengthMenu":    "Mostrar _MENU_ registros",
        "sZeroRecords":   "No se encontraron resultados",
        "sEmptyTable":    "Ningún dato disponible en esta tabla",
        "sInfo":          "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
        "sInfoEmpty":     "Mostrando registros del 0 al 0 de un total de 0 registros",
        "sInfoFiltered":  "(filtrado de un total de _MAX_ registros)",
        "sInfoPostFix":   "",
        "sSearch":        "Buscar:",
        "sUrl":           "",
        "sInfoThousands":  ",",
        "sLoadingRecords": "Cargando...",
        "oPaginate": {
            "sFirst":    "Primero",
            "sLast":    "Último",
            "sNext":    "Siguiente",
            "sPrevious": "Anterior"
        },
        "oAria": {
            "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
            "sSortDescending": ": Activar para ordenar la columna de manera descendente"
        }
    }
});

$('.dataTables_length>label').addClass('d-inline-flex align-items-baseline')
$('.dataTables_filter>label').addClass('float-right d-inline-flex align-items-baseline')



$.ajax({
    type:'POST',
    url:'./admin-views.php',
    data:{
        action:'get-users',
    },
    success:function(json){
        json = JSON.parse(json);
        console.log(json);
        let checked = '';
        
        for(let i = 0; i < json.length; i++){
            if(json[i][4] == '1'){
                checked = 'checked';
            }
            userDataTable.row.add([
                json[i][0],
                json[i][3],
                json[i][1],
                json[i][2],
                '<div class="form-check">'+
                    '<input type="checkbox" id="'+json[i][0]+'" class="form-check-input active-toggler" '+checked+'>'+
                '</div>',
                json[i][5],
                "<span class='user-action'><span class='delete-user' id='"+json[i][0]+"'><i class='fas fa-trash-alt text-danger'></i></span>&nbsp;&nbsp;&nbsp;<span class='edit-user' id='"+json[i][0]+"'><i class='fas fa-pencil-alt text-warning'></i></span></span>"
            ]).draw('false');
            checked = '';
        }
        $('.pagination').addClass('float-right');
        
    },
    error:function(xhr){
        toastr.error('Error inesperado','Se ha producido un error inesperado. Intentelo mas tarde')
    }
});

$.ajax({
    type:'POST',
    url:'./admin-views.php',
    data:{
        action: 'show-events',
    },
    success:function(json){
        json = JSON.parse(json);
        console.log(json);
        let end_date= '-';
        for(let i = 0; i < json.length; i++){
            if(json[i][6]){
                end_date = dateChecked(json[i][6])
            }
            eventDataTable.row.add([
                json[i][0],
                json[i][1],
                json[i][2],
                json[i][3],
                json[i][4],
                dateChecked(json[i][5]),
                end_date,
                json[i][7]+' '+json[i][8]
            ]).draw('false');
            end_date = '-';
        }
        $('.pagination').addClass('float-right');
        
    },
    error:function(xhr){
        toastr.error('Error inesperado','Se ha producido un error inesperado. Intentelo mas tarde')
    }
})

function dateChecked(date){
    let months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
    date = date.split('-');
    return date[2]+' de '+months[parseInt(date[1])]+' de '+date[0];
}


// Añadir usuario

// Llamada AJAX para insertar avatar
$('#user-image').on('change', function(){
    let formData = new FormData();
    var files = $('#user-image')[0].files[0];
    formData.append('file',files);

    $.ajax({
        type: 'POST',
        url: './avatar.php',
        contentType: false,
        processData: false,
        data: formData,
        success:function(image){
            if(image == 'move-error'){
                toastr.error('Error','Se ha producido un error al mover el archivo');
            }else if(image == 'no-image-error'){
                toastr.error('Error','La imagen no tiene el tipo de archivo adecuado');
            }else{
                $('.avatar-image-display').attr('src',image);
            }
        },
        error:function(xhr){
            toastr.error('Error inesperado','Se ha producido un error inesperado. Intentelo mas tarde')
        }
    });
});

$('[data-target="#AddUserModal"]').click(function(){
    document.querySelector('#form-add-contact').reset();
    $('.addUser').removeClass('d-none');
    $('.saveUser').addClass('d-none');
    $('.user-modal-title').html('Añadir Nuevo Usuario');
    $('.avatar-image-display').attr('src',"../../static/img/avatar/no-avatar.png");
});


$('.addUser').click(function(){
    if($('.usuario-nombre').val() && $('.usuario-apellidos').val() && $('.usuario-user').val() && $('.user-pass').val()){
        let first_name = $('.usuario-nombre').val();
        let last_name = $('.usuario-apellidos').val();
        let username = $('.usuario-user').val();
        let password = $('.user-pass').val();
        let is_monitor = $('#user-is_monitor').prop('checked');
        // Llamada AJAX para insertar usuario

        $.ajax({
            type:'POST',
            url:'./admin-views.php',
            data:{
                first_name: first_name,
                last_name: last_name,
                username: username,
                password: password,
                is_monitor: is_monitor,
                action:'add-user',
            },
            success:function(response){
                console.log(response)
                if(response != 'error'){
                    toastr.success('','Usuario añadido correctamente')
                    var monitor_display = '0';
                    if(is_monitor){
                        monitor_display = '1';
                    }
                    userDataTable.row.add([
                        response,
                        username,
                        first_name,
                        last_name,
                        '<div class="form-check">'+
                            '<input type="checkbox" class="form-check-input active-toggler" checked>'+
                        '</div>',
                        monitor_display,
                        "<span class='user-action'><i class='fas fa-trash-alt text-danger'></i>&nbsp;&nbsp;&nbsp;<i class='fas fa-pencil-alt text-warning'></i></span>"
                    ]).draw('false');
                    $('#AddUserModal').modal('hide');
                    document.querySelector('#form-add-contact').reset();
                }else{
                    toastr.error('Error inesperado','Se ha producido un error inesperado. Intentelo mas tarde')
                }
            },
            error:function(xhr){
                toastr.error('Error inesperado','Se ha producido un error inesperado. Intentelo mas tarde')
            }
        });
        
    }else{
        toastr.error('Error','Se deben introducir todos los campos');

    }
});

$(document).on('change','.active-toggler',function(){
    let element = this;
    let id = $(element).attr('id');
    let active = 0;
    if($(element).prop('checked')){
        active = 1;
    }
    $.ajax({
        type:'POST',
        url:'./admin-views.php',
        data:{
            active: active,
            id: id,
            action: 'toggle-active',
        },
        success:function(response){
            console.log(response);
            if(response == 1){
                toastr.success('','Usuario activado correctamente');
            }else if(response == 0){
                toastr.success('','Usuario desactivado correctamente')
            }else{
                toastr.error('Error inesperado','Se ha producido un error inesperado. Intentelo mas tarde')
            }
            
        },
        error:function(xhr){
            toastr.error('Error inesperado','Se ha producido un error inesperado. Intentelo mas tarde')
        }
    });
});

$(document).on('click','.delete-user',function(){
    let element = this;
    let id = $(element).attr('id');
    swal.fire({
         title: '¿Deseas eliminar el usuario?',
         text: ' ',
         type: 'question',
         showCancelButton: true,
         cancelButtonText: 'NO',
         confirmButtonText: 'SI'
    }).then(function (resp) {
        if (resp['value'] == true) {
            $.ajax({
                type: 'POST',
                url: './admin-views.php',
                data:{
                    id: id,
                    action: 'delete-user'
                },
                success:function(response){
                    if(response){
                        toastr.success('','Usuario borrado correctamente');
                        userDataTable.row($(element).closest('tr')).remove().draw();
                    }else{
                        toastr.error('Error inesperado','Se ha producido un error inesperado. Intentelo mas tarde')
                    }
                },
                error:function(xhr){
                    toastr.error('Error inesperado','Se ha producido un error inesperado. Intentelo mas tarde')
                }
            });
        }
    });
});

$(document).on('click','.edit-user',function(){
    let element = this;
    let id = $(element).attr('id');
    $.ajax({
        type:'POST',
        url:'./admin-views.php',
        data:{
            id: id,
            action: 'get-user',
        },
        success:function(json){
            console.log(json);
            json = JSON.parse(json);
            console.log(json);
            $('#AddUserModal').modal('show');
            $('.usuario-nombre').val(json['first_name']);
            $('.usuario-apellidos').val(json['last_name']);
            $('.usuario-user').val(json['user_name']);
            $('.user-pass').attr('placeholder','Cambiar contraseña');
            if(json['is_monitor'] == '1'){
                $('#user-is_monitor').prop('checked','true');
            }
            $('#user-is_monitor').siblings('label').html('Monitor');
            if(json['avatar'] == 'true'){
                $('.avatar-image-display').attr('src','"../../static/img/avatar/avatar'+id+'".png"');
            }
            $('.addUser').addClass('d-none');
            $('.saveUser').removeClass('d-none');
            $('.user-modal-title').html('Editar Usuario');

            $('.saveUser').click(function(){
                $.ajax({
                    type:'POST',
                    url:'./admin-views.php',
                    data:{
                        id: id,
                        first_name: $('.usuario-nombre').val(),
                        last_name: $('.usuario-apellidos').val(),
                        user_name: $('.usuario-user').val(),
                        password: $('.user-pass').val(),
                        is_monitor: $('#user-is_monitor').prop('checked'),
                        action: 'save-user'
                    },
                    success:function(response){
                        if(response == 0){
                            toastr.success('Usuario guardado');
                            $('#AddUserModal').modal('hide');
                            document.querySelector('#form-add-contact').reset();
                            $('.addUser').removeClass('d-none');
                            $('.saveUser').addClass('d-none');
                            $('.user-modal-title').html('Añadir Nuevo Usuario');
                            $('.avatar-image-display').attr('src','"../../static/img/avatar/no-avatar.png"');
                        }else{
                            toastr.error('Error inesperado','Se ha producido un error al guardar. Intentelo mas tarde')
                        }
                    },
                    error:function(xhr){
                        toastr.error('Error inesperado','Se ha producido un error inesperado. Intentelo mas tarde')
                    }
                })
            });
        },
        error:function(xhr){
            toastr.error('Error inesperado','Se ha producido un error inesperado. Intentelo mas tarde')
        }
    });
});

$.ajax({
    type:'POST',
    url:'./admin-views.php',
    data:{
        action: 'get-events',
    },
    success:function(json){
        console.log(json);
        json = JSON.parse(json);
        console.log(json)
    }
})