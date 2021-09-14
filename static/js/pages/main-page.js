$("[href='#searchTarget']").click(function(){
    $('.main-search').trigger('focus');
});

// $('.userDisplay').click(function(){
//     $('.dropdown').dropdown('toggle');
// });

// $('.dropdown-menu').mouseover(function(){
//     $('.dropdown').dropdown('toggle');
// });

// $('.dropdown-menu').mouseout(function(){
//     $('.dropdown').dropdown('hide');
// });

$('.admin-link').click(function(){
    document.location = $(this).attr('href');
});



// Vista de todos las actividades (incorpora filtro para busccador)

$('.main-search').keyup(function(e){
    $('.activities-title').html('Mostrando resultados para "'+$('.main-search').val()+'"')
    let filter = $('.main-search').val();
    $.ajax({
        type:'POST',
        url:'/tourtoo/pages/main/get-events.php',
        data:{
            action:'show-events',
            filter: filter
        },
        success:function(json){
            json = JSON.parse(json);
            console.log(json);
            let price;

            if(json['length'] == 0){
                $('.activities-title').html('¡Vaya! No hay ningun evento relacionado con tu búsqueda')
            }

            if(filter == ''){
                $('.activities-title').html('Vista de Eventos')
            }

            $('.event-squares').html('');
            for(let i = 0; i < json['length']; i++){
                if(json[i][2] == 0){
                    price = "Gratis";
                }else{
                    price = json[i][2]+" €";
                }
    
                $('.event-squares').append(
                    "<div class='col-12 col-md-6 col-lg-3 rounded event-view mt-1 p-0' style='background-image:url(static/img/event_image/"+json[i][0]+".jpg);'>"+
                        "<a class='event-link-"+json[i][0]+"'>"+
                            "<div class='bg-secondary event-title'>"+
                                "<h5>"+json[i][1]+"</h5>"+
                                "<i>"+price+"</i>"+
                            "</div>"+
                        "</a>"+
                    "</div>"
                );

                $('.event-link-'+json[i][0]).attr('href','pages/event-view/index.php?event='+json[i][0]+"-"+json[i][1].split(' ').join('-'));
    
                $('.event-view').on('mouseover',function(){
                    let element = this;
                    $(element).children().addClass('event-hover');
                });
    
                $('.event-view').on('mouseout',function(){
                    let element = this;
                    $(element).children().removeClass('event-hover');
                });
                
                $('.event-view').click(function(){
                    document.location = $(this).children('a').attr('href');
                })
            }
        },error:function(xhr){
            toastr.error('','Error al actualizar')
        }
    })
});


$.ajax({
    type:'POST',
    url:'/tourtoo/pages/main/get-events.php',
    data:{
        action:'show-events',
    },success:function(json){
        json = JSON.parse(json);
        console.log(json);
        let price;
        $.ajax({
            type:'POST',
            url:'pages/main/get-events.php',
            data:{
                action : 'show-first-image'
            },
            success:function(images){
                images = JSON.parse(images);
                // console.log(images);
                $('.event-squares').html('');
                for(let i = 0; i < json['length']; i++){
                    if(json[i][2] == 0){
                        price = "Gratis";
                    }else{
                        price = json[i][2]+" €";
                    }

                    $('.event-squares').append(
                        "<div class='col-12 col-md-6 col-lg-3 rounded event-view mt-1 p-0' style='background-image:url(static/img/event_image/"+images[i][0]+".jpg);'>"+
                            "<a class='event-link-"+json[i][0]+"'>"+
                                "<div class='bg-secondary event-title'>"+
                                    "<h5>"+json[i][1]+"</h5>"+
                                    "<i>"+price+"</i>"+
                                "</div>"+
                            "</a>"+
                        "</div>"
                    );

                    $('.event-link-'+json[i][0]).attr('href','pages/event-view/index.php?event='+json[i][0]+"-"+json[i][1].split(' ').join('-'));

                    $('.event-view').on('mouseover',function(){
                        let element = this;
                        $(element).children().children().addClass('event-hover');
                    });

                    $('.event-view').on('mouseout',function(){
                        let element = this;
                        $(element).children().children().removeClass('event-hover');
                    });

                    $('.event-view').click(function(){
                        document.location = $(this).children('a').attr('href');
                    })
                }
            },error:function(xhr){
                toastr.error('','Error al actualizar')
            }

        });
    },error:function(xhr){
        toastr.error('','Error al actualizar')
    }
})

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
                    $('.login-area').html('');
                    $('.login-area').removeClass('col-6');
                    $('.login-area').addClass('col-12');
                    $('.login-area').addClass('p-0');
                    $('.user-display').removeClass('userView');
                    $('.logout').removeClass('d-none');
                    $('.login-area').append('<span></span>');
                    if(res == 0){
                        $('.login-area').append(
                            '<a href="pages/admin-panel/" class="admin-link">'+
                                '<div class="drowpdown-item user-section">'+
                                    '<i class="fas fa-solar-panel"></i> Panel de Administración'+
                                '</div>'+
                            '</a>'
                        );
                    }else{
                        $('.login-area').append(
                            '<a href="pages/user-config/" class="admin-link">'+
                                '<div class="drowpdown-item user-section">'+
                                    '<i class="fas fa-solar-panel"></i> Panel de Usuario'+
                                '</div>'+
                            '</a>'
                        );
                    }
                    if(is_monitor){
                        $('.login-area').append(
                            '<a href="pages/monitor-panel/" class="admin-link">'+
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
                            '<a href="./pages/user-config/" class="admin-link">'+
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
                    toastr.success('Modificalo desde el panel de monitor','Usuario registrado correctamente')
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

$(document).on('click','.logout',function(){
    $.ajax({
        type:'POST',
        url:'/tourtoo/pages/main/login.php',
        data:{
            action : 'logout'
        },
        success:function(res){
            if(res == 'ok'){
                window.location='../tourtoo';
            }else{
                toastr.error(' ','Ha habido un error inesperado');
            }
        },  
        error:function(xhr){
            console.log(xhr.status + ": " + xhr.responseText);
        }
    });
});

var scroll = new SmoothScroll('a[href*="#"]', {
    speed: 1000
});