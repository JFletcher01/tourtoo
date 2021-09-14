<?php
    session_start();
    if(isset($_COOKIE['user-id'])){
        $_SESSION['user-id'] = $_COOKIE['user-id'];
    }
    if(!isset($_SESSION['user-id'])){
        echo '<meta http-equiv="refresh" content="0; url=../../">';
    }else if(substr_count($_SESSION['user-id'],'|') != 1){
        echo '<meta http-equiv="refresh" content="0; url=../../">';
    }
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="../../static/img/logo-300.png" type="image/png">
    <?php include "css/CssMonitorPanel.html" ?>
    <title>Panel de Monitor | TourToo!</title>
</head>
<body>
    <main class="row m-0">
        <input type="hidden" value='<?php echo explode('|',$_SESSION['user-id'])[0] ?>' class="monitor-id">
        
        <aside class="col-2 bg-secondary p-0">
            <a href="../../">
                <div class="w-100 logo-panel mx-auto">
                    <img src="../../static/img/logo-300-alt.png" alt="Logo TourToo Blanco" class='w-25 d-block m-auto'>
                </div>
            </a>
            <h6 class="text-center panel-title m-3 pb-3 border-bottom">Panel de Monitor</h6>
            <ul class="bg-secondary link-list list-group w-100 text-center">
                <a href="#Eventos"><li class="list-group-item list-group-item-action" data-toggle='list' role='tab' aria-controls='Eventos'><i class="fas fa-calendar-check"></i>&nbsp;Mis Eventos</li></a>
                <a href="#Reservas"><li class="list-group-item list-group-item-action" data-toggle='list' role='tab' aria-controls='Reservas'><i class="fas fa-book"></i>&nbsp;Reservas</li></a>
            </ul>
        </aside>
        <section class="col-10 p-0">
            <nav class="w-100 nav-panel">
                <div class="user-notification float-right d-flex align-items-center p-1">
                    <span class="badge badge-light badge-pill notification-count">0</span><i class="fas fa-2x fa-bell"></i>
                </div>
            </nav>
            <div class="tab-content">
                <div class="tab-pane p-2" id='Eventos' style='overflow-y: auto;height: 92vh;'>
                    <div class="card">
                        <div class="card-head">
                            <div class="card-header">
                                <h5 class="card-title">
                                    EVENTOS
                                    <a class="btn btn-outline-primary btn-sm float-right" href='../event-creation'><i class="d-md-none d-block feather icon-plus white"></i>
                                        <span class="d-md-block d-none">Añadir Evento</span>
                                    </a>
                                </h5>
                            </div>
                            <div class="card-content">
                                <div class="card-body row m-0">
                                    <div class="col-12 p-2 table-content rounded">
                                        <div class="table-responsive table-responsive-sm">
                                            <table id="event-table" class="table table-white-space row-grouping no-wrap icheck text-center w-100">
                                                <thead>
                                                    <tr class='bg-secondary text-light'>
                                                        <th>Id</th>
                                                        <th>Titulo</th>
                                                        <th>Apuntados</th>
                                                        <th>Capacidad</th>
                                                        <th>Precio</th>
                                                        <th>Dia Inicio</th>
                                                        <th>Dia Fin</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tab-pane p-2" id="Reservas">
                <div class="card">
                        <div class="card-head">
                            <div class="card-header">
                                <h5 class="card-title">
                                    RESERVAS
                                </h5>
                            </div>
                            <div class="card-content">
                                <div class="card-body row booking-layout">
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>

</body>
<?php include "js/JsMonitorPanel.html" ?>
</html>
<!-- Lo estás imaginando... usamos cookies! y por ello nos obligan a avisarte y ofrecerte estas herramientas para la configuración. -->