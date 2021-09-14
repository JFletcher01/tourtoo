swal.fire(
    'Bienvenido al creador de eventos',
    'Interactua con la página para crear la página a tu gusto',
    'info'
);

var event_id;
$.ajax({
    type:'POST',
    url:'./event-creation-views.php',
    data:{
        action:'start-event',
        monitor_id: $('.monitor-id').val()
    },
    success:function(id){
        event_id = id;
        $('.event-id').val(event_id);
        $.ajax({
            type:'POST',
            url:'./get-monitor.php',
            data:{
                action: 'show-monitor',
                event_id: id
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
    },
    error:function(xhr){
        toastr.error('','Error al generar el evento')
    }
});



$('.image-carousel').on('mouseover',function(){
    $('.image-placeholder').addClass('active');
})

$('.image-carousel').on('mouseout',function(){
    $('.image-placeholder').removeClass('active');
})

$('.image-carousel').children().click(function(){
    $('.event-image-picker').trigger('click');
})

$('.event-image-picker').change(function(){
    let formData = new FormData();
    var files = $('.event-image-picker')[0].files[0];
    formData.append('file',files);

    $.ajax({
        type: 'POST',
        url: './event-image.php',
        contentType: false,
        processData: false,
        data: formData,
        success:function(image){
            if(image == 'move-error'){
                toastr.error('Error','Se ha producido un error al mover el archivo');
            }else if(image == 'no-image-error'){
                toastr.error('Error','La imagen no tiene el tipo de archivo adecuado');
            }else{
                $('.image-carousel').children().attr('style','background-image:url('+image+')');
                toastr.success('Imagen actualizada correctamente');
            }
        },
        error:function(xhr){
            toastr.error('Error inesperado','Se ha producido un error inesperado. Intentelo mas tarde')
        }
    });
});

$('.title-editor').on('keyup',function(e){
    if(e.which == 13){
        let title = $('.title-editor').val();
        if(title){
            $.ajax({
                type:'POST',
                url:'./event-creation-views.php',
                data:{
                    title: title,
                    event_id: event_id,
                    action: 'set-title',
                },
                success:function(res){
                    toastr.success('Titulo actualizado correctamente');
                    $('.event-title').html(title);
    
                },
                error:function(xhr){
                    toastr.error('Error inesperado','Se ha producido un error inesperado. Intentelo mas tarde')
                }
            })
        }
    }
});

$('.title-editor').on('focusout',function(e){
    let title = $('.title-editor').val();
    if(title){
        $.ajax({
            type:'POST',
            url:'./event-creation-views.php',
            data:{
                title: title,
                event_id: event_id,
                action: 'set-title',
            },
            success:function(res){
                toastr.success('Titulo actualizado correctamente');
                $('.event-title').html(title);

            },
            error:function(xhr){
                toastr.error('Error inesperado','Se ha producido un error inesperado. Intentelo mas tarde')
            }
        })
    }
})

$('.price-editor').on('keyup',function(e){
    if(e.which == 13){
        let price = $('.price-editor').val();
        if(price){
            $.ajax({
                type:'POST',
                url:'./event-creation-views.php',
                data:{
                    price: price,
                    event_id: event_id,
                    action: 'set-price',
                },
                success:function(res){
                    toastr.success('Precio actualizado correctamente');
                    if(price == 0){
                        $('.event-price').html('Gratis');
                    }else{
                        $('.event-price').html(price+' €');
                    }
                },
                error:function(xhr){
                    toastr.error('Error inesperado','Se ha producido un error inesperado. Intentelo mas tarde')
                }
            })
        }
    }
});

$('.price-editor').on('focusout',function(e){
    let price = $('.price-editor').val();
    if(price){
        $.ajax({
            type:'POST',
            url:'./event-creation-views.php',
            data:{
                price: price,
                event_id: event_id,
                action: 'set-price',
            },
            success:function(res){
                toastr.success('Precio actualizado correctamente');
                if(price == 0){
                    $('.event-price').html('Gratis');
                }else{
                    $('.event-price').html(price+' €');
                }
            },
            error:function(xhr){
                toastr.error('Error inesperado','Se ha producido un error inesperado. Intentelo mas tarde')
            }
        })
    }
})

$('.capacity-editor').on('keyup',function(e){
    if(e.which == 13){
        let capacity = $('.capacity-editor').val();
        if(capacity){
            $.ajax({
                type:'POST',
                url:'./event-creation-views.php',
                data:{
                    capacity: capacity,
                    event_id: event_id,
                    action: 'set-capacity',
                },
                success:function(res){
                    toastr.success('Capacidad actualizada correctamente');
                    $('.capacity-editor').parent().html('<span class="actual">0'+
                                                        '</span>'+
                                                        '&nbsp;/&nbsp;'+
                                                        '<span class="max-capacity">'+capacity+
                                                        '</span>');
                },
                error:function(xhr){
                    toastr.error('Error inesperado','Se ha producido un error inesperado. Intentelo mas tarde')
                }
            })
        }
    }
});

$('.capacity-editor').on('focusout',function(e){
    let capacity = $('.capacity-editor').val();
        if(capacity){
            $.ajax({
                type:'POST',
                url:'./event-creation-views.php',
                data:{
                    capacity: capacity,
                    event_id: event_id,
                    action: 'set-capacity',
                },
                success:function(res){
                    toastr.success('Capacidad actualizada correctamente');
                    $('.capacity-editor').parent().html('<span class="actual">0'+
                                                        '</span>'+
                                                        '&nbsp;/&nbsp;'+
                                                        '<span class="max-capacity">'+capacity+
                                                        '</span>');
                },
                error:function(xhr){
                    toastr.error('Error inesperado','Se ha producido un error inesperado. Intentelo mas tarde')
                }
            })
        }
})

$('.date-editor').on('change',function(e){
    let date = $('.date-editor').val();
        if(date){
            $.ajax({
                type:'POST',
                url:'./event-creation-views.php',
                data:{
                    date: date,
                    event_id: event_id,
                    action: 'set-date',
                },
                success:function(res){
                    toastr.success('Fecha actualizada correctamente');
                    $('.date-display').html('<span class="date-start">'+dateChecked(date)+'</span>');
                },
                error:function(xhr){
                    toastr.error('Error inesperado','Se ha producido un error inesperado. Intentelo mas tarde')
                }
            })
        }
})

$('.description-text').on('focusout',function(e){
    let text = $('.description-text').html();
    $.ajax({
        type:'POST',
        url:'./event-creation-views.php',
        data:{
            text: text,
            event_id: event_id,
            action: 'set-description',
        },
        success:function(res){
            toastr.success('Descripcion actualizada correctamente');
        },
        error:function(xhr){
            toastr.error('Error inesperado','Se ha producido un error inesperado. Intentelo mas tarde')
        }
    })
});

$('.save-event').click(function(){
    $.ajax({
        type:'POST',
        url:'./event-creation-views.php',
        data:{
            event_id: event_id,
            action:'save-event'
        },
        success:function(response){
            if(response){
                toastr.success('Se ha guardado correctamente','Volviendo al panel de monitor');
                setTimeout(function(){
                    document.location='../monitor-panel/';
                },300)
            }else{
                toastr.error('Error inesperado','Se ha producido un error inesperado. Intentelo mas tarde')
            }
        },
        error:function(xhr){
            toastr.error('Error inesperado','Se ha producido un error inesperado. Intentelo mas tarde')
        }
    })
})

$('.discard-changes').click(function(){
    swal.fire({
        title: '¿Desea descartar los cambios?',
        text: 'Los cambios no se guardaran',
        type: 'question',
        showCancelButton: true,
        cancelButtonText: 'NO',
        confirmButtonText: 'SI'
   }).then(function (resp) {
       if (resp['value'] == true) {
           $.ajax({
               type: 'POST',
               url: './event-creation-views.php',
               data:{
                   event_id: event_id,
                   action: 'discard-changes'
               },
               success:function(response){
                   if(response == 'ok'){
                        setTimeout(function(){
                            document.location='../monitor-panel/';
                        },1000)
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

function dateChecked(date){
    let months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
    date = date.split('-');
    return date[2]+' de '+months[parseInt(date[1])]+' de '+date[0];
}