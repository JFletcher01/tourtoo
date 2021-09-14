$('.userDisplay').mouseover(function(){
    $('.user-display').addClass('show');
    $('.dropdown-search').dropdown('hide');
    $('.fast-search-input').focusout();
});


$('.user-display').mouseover(function(){
    $('.user-display').addClass('show');
});

$('.user-display').mouseout(function(){
    $('.user-display').removeClass('show');
});

$('.searchEvent').mouseover(function(){
    $('.dropdown-search').dropdown('show');
    $('.fast-search-input').focus();
});


$('.search-display').mouseover(function(){
    $('.dropdown-search').dropdown('show');
    $('.fast-search-input').focus();
});

$('.search-display').mouseout(function(){
    $('.dropdown-search').dropdown('hide');
    $('.fast-search-input').focusout();
});

var user_id = $('.user-id').html();

if(user_id.includes('|')){
    user_id = user_id.split('|')[0];
}

$.ajax({
    type:'POST',
    url:'./user-views.php',
    data:{
        id : user_id,
        action: 'get-user'
    },
    success:function(result){
        result = JSON.parse(result);
        console.log(result);
        $('.first-name').val(result['first_name'])
        $('.last-name').val(result['last_name'])
        $('.user-name').val(result['user_name'])
        $.ajax({
            type:'POST',
            url:'./user-views.php',
            data:{
                id: user_id,
                action: 'check-avatar'
            },
            success:function(check){
                if(check == 'true'){
                    $('.user-avatar').css('background-image','url("../../static/img/avatar/avatar-'+user_id+'.png")');
                }else{
                    $('.user-avatar').css('background-image','url("../../static/img/avatar/no-avatar.png")')
                }
                $('.user-avatar').addClass('toggle-avatar')
                $('.user-avatar').append('<h3 class="p-2 d-inline-block my-auto" style="visibilty:hidden;">'+result['first_name'].charAt(0)+''+result['last_name'].charAt(0)+'</h3>');
            },
            error:function(xhr){
                toastr.error('Error inesperado','Se ha producido un error inesperado. Intentelo mas tarde')
            }
        });

        

        $('.user-showcase').html(result['first_name']+' '+result['last_name']);

        

    },
    error:function(xhr){
        toastr.error('Error inesperado','Se ha producido un error inesperado. Intentelo mas tarde')
    }
});

$('.user-data').click(function(){
    let element = this;
    if($(element).siblings().hasClass('active')){
        $(element).siblings().removeClass('active')
    }
    $('.data-view').removeClass('d-none')
    $('.book-view').addClass('d-none')
    $(element).addClass('active')
});

$('.user-book').click(function(){
    let element = this;
    if($(element).siblings().hasClass('active')){
        $(element).siblings().removeClass('active')
    }
    $('.book-view').removeClass('d-none')
    $('.data-view').addClass('d-none')
    $(element).addClass('active')
});

$(document).on('focusout','.first-name',function(){
    let element = this;
    if($(element).val() != ''){
        let first_name = $(element).val();
        $.ajax({
            type:'POST',
            url:'./user-views.php',
            data:{
                id : user_id,
                first_name: first_name,
                action: 'change-first'
            },
            success:function(response){
                if(response == 0){
                    toastr.success('Nombre cambiado con exito')
                }else{  
                    toastr.error('Error inesperado','Se ha producido un error inesperado. Intentelo mas tarde')
                }

            },
            error:function(xhr){
                toastr.error('Error inesperado','Se ha producido un error inesperado. Intentelo mas tarde')
            }
        });
    }else{
        toastr.warning('No se puede guardar el nombre vacio','Advertencia')
    }
});

$(document).on('focusout','.last-name',function(){
    let element = this;
    if($(element).val() != ''){
        let first_name = $(element).val();
        $.ajax({
            type:'POST',
            url:'./user-views.php',
            data:{
                id : user_id,
                last_name: first_name,
                action: 'change-last'
            },
            success:function(response){
                if(response == 0){
                    toastr.success('Apellidos cambiados con exito')
                }else{  
                    toastr.error('Error inesperado','Se ha producido un error inesperado. Intentelo mas tarde')
                }

            },
            error:function(xhr){
                toastr.error('Error inesperado','Se ha producido un error inesperado. Intentelo mas tarde')
            }
        });
    }else{
        toastr.warning('No se puede guardar el nombre vacio','Advertencia')
    }
});

$(document).on('focusout','.user-name',function(){
    let element = this;
    if($(element).val() != ''){
        let first_name = $(element).val();
        $.ajax({
            type:'POST',
            url:'./user-views.php',
            data:{
                id : user_id,
                user_name: first_name,
                action: 'change-user'
            },
            success:function(response){
                if(response == 0){
                    toastr.success('Usuario cambiado con exito')
                }else{  
                    toastr.error('Error inesperado','Se ha producido un error inesperado. Intentelo mas tarde')
                }

            },
            error:function(xhr){
                toastr.error('Error inesperado','Se ha producido un error inesperado. Intentelo mas tarde')
            }
        });
    }else{
        toastr.warning('No se puede guardar el nombre vacio','Advertencia')
    }
});

$(document).on('focusout','.pass',function(){
    let element = this;
    if($(element).val() != ''){
        let first_name = $(element).val();
        $.ajax({
            type:'POST',
            url:'./user-views.php',
            data:{
                id : user_id,
                password: first_name,
                action: 'change-pass'
            },
            success:function(response){
                if(response == 0){
                    toastr.success('Nombre cambiado con exito')
                }else{  
                    toastr.error('Error inesperado','Se ha producido un error inesperado. Intentelo mas tarde')
                }

            },
            error:function(xhr){
                toastr.error('Error inesperado','Se ha producido un error inesperado. Intentelo mas tarde')
            }
        });
    }else{
        toastr.warning('No se puede guardar el nombre vacio','Advertencia')
    }
});

$.ajax({
    type:'POST',
    url:'./user-views.php',
    data:{
        id: user_id,
        action:'get-booking'
    },
    success:function(response){
        response = JSON.parse(response)
        console.log(response)
        if(!response){
            $('.book-view').html('<h5>Todavía no tienes reservas</h5>')
        }else{
            $('.book-view').html('<div class="w-75 book-layout d-flex flex-row justify-content-between"><h5>'+response['title']+'</h5><span class="align-self-end file btn btn-secondary">Factura</span><input class="d-none bill" type="file"></div>')
            $('.file').click(function(){
                $('.bill').trigger('click');
            })
            $('.bill').change(function(){
                let formData = new FormData();
                var files = $('.bill')[0].files[0];
                formData.append('file',files);
                formData.append('id',user_id)
                $.ajax({
                    type: 'POST',
                    url: './bill.php',
                    contentType: false,
                    processData: false,
                    data: formData,
                    success:function(image){
                        if(image == 'move-error'){
                            toastr.error('Error','Se ha producido un error al mover el archivo');
                        }else if(image == 'no-image-error'){
                            toastr.error('Error','La imagen no tiene el tipo de archivo adecuado');
                        }else{
                            toastr.success('Factura enviada con exito');
                            $('.file').replaceWith('<i class="text-success">Enviado</i>');
                        }
                    },
                    error:function(xhr){
                        toastr.error('Error inesperado','Se ha producido un error inesperado. Intentelo mas tarde')
                    }
                });
            });
        }
    },
    error:function(xhr){
        toastr.error('Error inesperado','Se ha producido un error inesperado. Intentelo mas tarde')
    }
})