$('.link-list').children().click(function(){
    let element = this;
    $('.link-list').children().children().removeClass('active');
    $(element).children().children().addClass('active');
    $('.tab-content>div').hide();
    $('#'+$(element).children('li').attr('aria-controls')).show();
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
    url:'./monitor-views.php',
    data:{
        action: 'get-events',
        monitor_id: $('.monitor-id').val()
    },
    success:function(json){
        console.log(json);
        json = JSON.parse(json);
        console.log(json)
        let end_date;
        for(let i in json){
            end_date = json[i][6];
            if(!end_date){
                end_date = json[i][5];
            }
            eventDataTable.row.add([
                json[i][0],
                json[i][1],
                json[i][3],
                json[i][4],
                json[i][2],
                json[i][5],
                end_date,
                "<span class='event-actions'><span class='delete-event' style='cursor:pointer;' id='"+json[i][0]+"'><i class='fas fa-trash-alt text-danger'></i></span></span>"
            ]).draw('false');

            $('.booking-layout').append(
                '<div class="card-header w-100">'+
                    '<h5 class="mb-0">'+
                        '<button class="btn btn-light w-100" data-toggle="collapse" data-target="#Evento-'+json[i][0]+'" aria-expanded="false" aria-controls="#Evento-'+json[i][0]+'">'+
                            json[i][1]+
                        '</button>'+
                    '</h5>'+
                '</div>'
            );
            $.ajax({
                type:'POST',
                url:'./monitor-views.php',
                data:{
                    action:'get-booking',
                    event_id: json[i][0]
                },success:function(response){
                    // response = JSON.parse(response);
                    // console.log(response);
                },
                error:function(xhr){
                    toastr.error('Error inesperado','Se ha producido un error inesperado. Intentelo mas tarde')
                }
            })
        }
        $('.pagination').addClass('float-right');
    },
    error:function(xhr){
        toastr.error('Error inesperado','Se ha producido un error inesperado. Intentelo mas tarde')
    }
})

$(document).on('click','.delete-event',function(){
    let element = this;
    let id = $(element).attr('id');
    swal.fire({
         title: '¿Deseas eliminar el evento?',
         text: ' ',
         type: 'question',
         showCancelButton: true,
         cancelButtonText: 'NO',
         confirmButtonText: 'SI'
    }).then(function (resp) {
        if (resp['value'] == true) {
            $.ajax({
                type: 'POST',
                url: './monitor-views.php',
                data:{
                    id: id,
                    action: 'delete-event'
                },
                success:function(response){
                    if(response){
                        toastr.success('','Evento borrado correctamente');
                        eventDataTable.row($(element).closest('tr')).remove().draw();
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
