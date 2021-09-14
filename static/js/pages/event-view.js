

$('.searchEvent').click(function(){
    $('.dropdown-search').dropdown('show');
    $('.fast-search-input').trigger('focus');
});


$('.search-display').mouseover(function(){
    $('.dropdown-search').dropdown('show');
    $('.fast-search-input').trigger('focus');
});

$('.search-display').mouseout(function(){
    $('.dropdown-search').dropdown('hide');
    $('.fast-search-input').focusout();
});

// Manejo de la informacion de la url

let url_content = $('.url-content').html().split('-');

let event_id = url_content[0];
let event_title = $('.url-content').html().split('-').splice(1).join(' ');

document.title = event_title+" | TourToo!";

// Inicio de sesion interno

$('.user-login').on('click',function(e){
    e.preventDefault();
    if($('#user-name').val() && $('#user-passwd').val()){
        let user = $('#user-name').val();
        let pass = $('#user-passwd').val();
        let remember = $('#remember').prop('checked');

        $.ajax({
            type:'POST',
            url:'/tourtoo/pages/main/login.php',
            data:{
                user : user,
                pass : pass,
                remember : remember,
                action : 'login'
            },
            success:function(res){
                if(res != 'no'){
                    if(res.includes('|')){
                        var is_monitor = true;
                        res = res.split('|')[1];
                    }
                    $('.user-id').html(res);
                    $('.login-area').html('');
                    $('.login-area').removeClass('col-6');
                    $('.login-area').addClass('col-12');
                    $('.login-area').addClass('p-0');
                    $('.user-display').removeClass('userView');
                    $('.logout').removeClass('d-none');
                    $('.login-area').append('<span></span>');
                    if(res == 0){
                        $('.login-area').append(
                            '<a href="../../pages/admin-panel/" class="admin-link">'+
                                '<div class="drowpdown-item user-section">'+
                                    '<i class="fas fa-solar-panel"></i> Panel de Administración'+
                                '</div>'+
                            '</a>'
                        );
                    }else{
                        $('.login-area').append(
                            '<a href="../../pages/user-config/" class="admin-link">'+
                                '<div class="drowpdown-item user-section">'+
                                    '<i class="fas fa-solar-panel"></i> Panel de Usuario'+
                                '</div>'+
                            '</a>'
                        );
                    }
                    if(is_monitor){
                        $('.login-area').append(
                            '<a href="../../pages/monitor-panel/" class="admin-link">'+
                                '<div class="dropdown-item user-section p-1">'+
                                    '<i class="fas fa-solar-panel"></i>Panel de Monitor'+
                                '</div>'+
                            '</a>'
                        );
                    }
                    $('.login-area').append(
                        '<div class="dropdown logout user-section p-1 pl-0">'+
                            '<i class="fas fa-sign-out-alt"></i> Cerrar sesion'+
                        '</div>'
                    );
                    $('.register-area').addClass('d-none');

                }else{
                    toastr.error(' ','Ha habido un error inesperado');
                }
            },  
            error:function(xhr){
                console.log(xhr.status + ": " + xhr.responseText);
            }
        });
    }else{
        toastr.error('Error al ingresar','Los campos de registro tienen que estar completos')
    }
});

$('.book').click(function(){
    if($('.user-id').html() == '-1' || $('.user-id').html().includes('|')){
        toastr.info('Tienes que iniciar sesion o registrarte')
    }else{
        $.ajax({
            type:'POST',
            url:'./main_event.php',
            data:{
                event_id: event_id,
                user_id: $('.user-id').html(),
                action: 'book'
            },
            success:function(response){
                
                
                toastr.success('Dirigete al panel de usuario para agregar factura','Reserva realizada con exito')
            },
            error:function(xhr){
                toastr.error(' ','Ha habido un error inesperado');      
            }
        })
        
    }
})

$('.user-register').click(function(e){
    e.preventDefault();
    if($('#first-name-r').val() && $('#user-name-r').val() && $('#user-passwd-r').val()){
        let first_name = $('#first-name-r').val();
        let user = $('#user-name-r').val();
        let pass = $('#user-passwd-r').val();
        $.ajax({
            type:'POST',
            url:'/tourtoo/pages/main/login.php',
            data:{
                first_name: first_name,
                user : user,
                pass : pass,
                action : 'register'
            },success:function(res){
                toastr.info(res)
                if(res != 'no'){
                    if(res.includes('|')){
                        var is_monitor = true;
                        res = res.split('|')[1];
                    }
                    $('.login-area').html('');
                    $('.login-area').removeClass('col-6');
                    $('.login-area').addClass('col-12');
                    $('.login-area').addClass('p-0');
                    $('.user-display').removeClass('userView');
                    $('.logout').removeClass('d-none');
                    $('.login-area').append('<span></span>');
                        $('.login-area').append(
                            '<a href="/pages/user-config/" class="admin-link">'+
                                '<div class="drowpdown-item user-section">'+
                                    '<i class="fas fa-solar-panel"></i> Panel de Usuario'+
                                '</div>'+
                            '</a>'
                        );
                    $('.login-area').append(
                        '<div class="dropdown logout user-section p-1 pl-0">'+
                            '<i class="fas fa-sign-out-alt"></i> Cerrar sesion'+
                        '</div>'
                    );
                    $('.register-area').addClass('d-none');
                }else{
                    toastr.error(' ','Ha habido un error inesperado');
                }
            },error:function(xhr){
                toastr.error(' ','Ha habido un error inesperado');      
            }
        });
    }else{
        toastr.error('Error al ingresar','Los campos de registro tienen que estar completos')
    }
});

// Muestra del evento general, ademas del carrusel principal de imagenes

$.ajax({
    type:'POST',
    url:'./main_event.php',
    data:{
        id: event_id,
        action: 'get-main-event'
    },
    success:function(event){
        event = JSON.parse(event);
        console.log(event)
        $('.general-showcase>p').html(event['description']);

        $.ajax({
            type:'POST',
            url:'./main_event.php',
            data:{
                event_id : event['id'],
                action: 'show-event-images'
            },
            success:function(images){
                images = JSON.parse(images);

                // Carrusel de imagenes

                for(let i = 0; i < images['length']; i++){
                    let image_url = "../../static/img/event_image/"+images[i][0];
                    console.log("../../../img/event_image/'"+images[i][0]);
                    if(i == 0){
                        $('.image-carousel').append(
                            "<div class='carousel-item active event-parallax ml-0' style='background-image:url("+image_url+".jpg);'>"+
                            "</div>"
                        )
                    }else{
                        $('.image-carousel').append(
                            "<div class='carousel-item event-parallax ml-0' style='background-image:url('../../../img/event_image/'"+images[i][0]+".jpg);'>"+
                            "</div>"
                        )
                    }
                }

                $('.event-title').html(event['title']);

                let price;

                if(event['price'] == 0){
                    price = 'Gratis';
                }else{
                    price = event['price']+" €";
                }

                $('.event-price').html(price);

                $('.actual').html(event['joined']);
                $('.max-capacity').html(event['capacity']);
                let per = event['joined'] / event['capacity'] * 100;
                $('.progress-bar').css('width',per+'%')
                $('.progress-bar').attr('aria-valuenow',21);
                $('.progress-bar').attr('aria-valuemax',100);
                $('.progress-bar').html(per+' %')
                $('.date-start').html(dateChecked(event['start_date']));
                if(event['end_date']){
                    $('.date-end').html(dateChecked(event['end_date']))
                }else{
                    $('.date-end').addClass('d-none');
                    $('.date-divisor').addClass('d-none');
                }
            }
            ,error:function(xhr){
                toastr.error('','Error al actualizar')
            }
        });

    },error:function(xhr){
        toastr.error('','Error al actualizar')
    }
});

// Consulta del monitor asignado al evento

$.ajax({
    type:'POST',
    url:'./get-monitor.php',
    data:{
        action: 'show-monitor',
        event_id: event_id
    },
    success:function(json){
        json = JSON.parse(json);
        console.log(json);

        if(json['avatar']){
            $('.monitor-avatar').append('<img>');
        }else{
            $('.monitor-avatar').append('<h3 class="p-2 d-inline-block my-auto">'+json['first_name'].charAt(0)+''+json['last_name'].charAt(0)+'</h3>');
        }

        $('.monitor-showcase').html('Evento organizado por '+json['first_name']+' '+json['last_name']);

        
    }
    ,error:function(xhr){
        toastr.error('','Error al actualizar')
    }
})

// Manejo de la búsqueda rápida

$('.fast-search-input').on('keyup',function(key){
    if($('.fast-search-input').val() != ''){
        // Llamada AJAX
        $.ajax({
            type:'POST',
            url:'./get-events.php',
            data:{
                filter: $('.fast-search-input').val(),
                action: 'show-events'
            },
            success:function(json){
                json = JSON.parse(json);
                // Llamada AJAX
                $.ajax({
                    type:'POST',
                    url:'./get-events.php',
                    data:{
                        action : 'show-first-image'
                    },
                    success:function(images){
                        images = JSON.parse(images);
                        // console.log(images)
                        $('.search-display-manager').html(' ');
                        if(json['length'] != 0){
                            for(let i = 0; i < json['length']; i++){
                                $('.search-display-manager').append(
                                    "<div class='dropdown-item m-0'>"+
                                        "<a class='row admin-link event-link-"+json[i][0]+"'>"+
                                            "<div class='col-3'>"+
                                                "<img src='../../static/img/event_image/"+images[i][0]+".jpg' class='w-100 fast-search-image'>"+
                                            "</div>"+
                                            "<div class='col-9 my-auto'>"+
                                                "<h5 class='fast-search-title'>"+json[i][1]+"</h5>"+
                                            "</div>"+
                                        "</a>"+
                                    "</div>"
                                )

                                $('.event-link-'+json[i][0]).attr('href','pages/event-view/index.php?event='+json[i][0]+"-"+json[i][1].split(' ').join('-'));
                            }
                        }else{
                            $('.search-display-manager').html('<i>Vaya, no he encontrado nada !</i>')
                        }
                    },error:function(xhr){
                        toastr.error('','Error al actualizar')
                    }
                });
            },error:function(xhr){
                toastr.error('','Error al actualizar')
            }
        });
    }else{
        $('.search-display-manager').html(' ');
    }
});

$('.logout').click(function(){
    $.ajax({
        type:'POST',
        url:'/tourtoo/pages/main/login.php',
        data:{
            action : 'logout'
        },
        success:function(res){
            if(res == 'ok'){
                window.location='../../../tourtoo';
            }else{
                toastr.error(' ','Ha habido un error inesperado');
            }
        },  
        error:function(xhr){
            console.log(xhr.status + ": " + xhr.responseText);
        }
    });
});
function dateChecked(date){
    let months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
    date = date.split('-');
    return date[2]+' de '+months[parseInt(date[1])]+' de '+date[0];
}