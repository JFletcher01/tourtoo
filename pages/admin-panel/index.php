<?php
    session_start();
    if(isset($_COOKIE['user-id'])){
        $_SESSION['user-id'] = $_COOKIE['user-id'];
    }
    if(!isset($_SESSION['user-id'])){
        echo '<meta http-equiv="refresh" content="0; url=../../">';
    }else if($_SESSION['user-id'] != 0){
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
    <?php include "css/CssAdminPanel.html" ?>
    <title>Panel de Administración | TourToo!</title>
</head>
<body>
    <main class="row m-0">
        <aside class="col-2 bg-secondary p-0">
            <a href="../../">
                <div class="w-100 logo-panel mx-auto">
                    <img src="../../static/img/logo-300-alt.png" alt="Logo TourToo Blanco" class='w-25 d-block m-auto'>
                </div>
            </a>
            <h6 class="text-center panel-title m-3 pb-3 border-bottom">Panel de Administración</h6>
            <ul class="bg-secondary link-list list-group w-100 text-center">
                <a href="#Usuarios"><li class="list-group-item list-group-item-action" data-toggle='list' role='tab' aria-controls='Usuarios'><i class="fas fa-user"></i>&nbsp;Usuarios</li></a>
                <a href="#Eventos"><li class="list-group-item list-group-item-action" data-toggle='list' role='tab' aria-controls='Eventos'><i class="fas fa-calendar-check"></i>&nbsp;Eventos</li></a>
            </ul>
        </aside>
        <section class="col-10 p-0">
            <nav class="w-100 nav-panel">
                <div class="user-notification float-right d-flex align-items-center p-1">
                    <span class="badge badge-light badge-pill notification-count">0</span><i class="fas fa-2x fa-bell"></i>
                </div>
            </nav>
            <div class="tab-content">
                <div class="tab-pane p-2" id='Usuarios'>
                    <div class="card">
                        <div class="card-head">
                            <div class="card-header">
                                <h5 class="card-title">
                                    USUARIOS
                                    <button class="btn btn-outline-primary btn-sm float-right" data-toggle="modal" data-target="#AddUserModal"><i class="d-md-none d-block feather icon-plus white"></i>
                                        <span class="d-md-block d-none">Añadir Usuario</span>
                                    </button>
                                </h5>
                                <div class="mt-0 text-right">                             
                                    
                                </div>
                            </div>
                            <div class="card-content">
                                <div class="card-body row">
                                    <div class="col-12 p-2 table-content rounded">
                                        <div class="table-responsive table-responsive-sm">
                                            <table id="users-table" class="table table-white-space row-grouping no-wrap icheck text-center w-100">
                                                <thead>
                                                    <tr class='bg-secondary text-light'>
                                                        <th>Id</th>
                                                        <th>Nombre de Usuario</th>
                                                        <th>Nombre</th>
                                                        <th>Apellidos</th>
                                                        <th>Activo</th>
                                                        <th></th>
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
                <div class="tab-pane p-2" id='Eventos'>
                    <div class="card">
                        <div class="card-head">
                            <div class="card-header">
                                <h5 class="card-title">
                                    EVENTOS
                                    <!-- <button class="btn btn-outline-primary btn-sm float-right" data-toggle="modal" data-target="#AddEventModal"><i class="d-md-none d-block feather icon-plus white"></i>
                                        <span class="d-md-block d-none">Añadir Evento</span>
                                    </button> -->
                                </h5>
                                <div class="mt-0 text-right">                             
                                    
                                </div>
                            </div>
                            <div class="card-content">
                                <div class="card-body row">
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
                                                        <th>Monitor</th>
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
            </div>
        </section>
    </main>
    <!-- Modal Crear usurio start -->
    <div class="modal fade" id="AddUserModal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog" role="document" style="width: 100% !important;">
            <div class="modal-content">
                <section class="contact-form">
                    <form method="POST" id="form-add-contact" class="contact-input" enctype='multipart/form-data'>
                        <div class="modal-header">
                            <h5 class="modal-title user-modal-title">Añadir Nuevo Usuario</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body row">
                            <fieldset class="form-group col-12">
                                <input type="text" class="usuario-nombre form-control" placeholder="Nombre">
                            </fieldset>
                            <fieldset class="form-group col-12">
                                <input type="text" class="usuario-apellidos form-control" placeholder="Apellidos">
                            </fieldset>
                            <fieldset class="form-group col-12">
                                <input type="text" class="usuario-user form-control" placeholder="Nombre de usuario">
                            </fieldset>
                            <fieldset class="form-group col-12">
                                <input type="text" class="user-pass form-control" placeholder="Contraseña">
                            </fieldset>
                            <fieldset class="form-group col-12">
                                <input type="checkbox" id="user-is_monitor" class="contact-fav input-chk"> <label for="user-is_monitor"> Establecer como monitor</label>
                            </fieldset>
                            <div class="col-2">
                                <img src="../../static/img/avatar/no-avatar.png" alt="Avatar de nuevo usuario" class="w-100 avatar-image-display rounded-circle">
                            </div>
                            <fieldset class="form-group col-10 custom-file">
                                <input type="file" class="custom-file-input no-opacity" id="user-image">
                            </fieldset>
                        </div>
                        <div class="modal-footer">
                            <fieldset class="form-group position-relative has-icon-left mb-0">
                                <button type="button" class="btn btn-outline-info add-contact-item addUser">
                                    <i class="fa fa-paper-plane d-block d-lg-none"></i> 
                                    <span class="d-none d-lg-block">Añadir</span>
                                </button>
                                <button type="button" class="btn btn-outline-success saveUser d-none">
                                    <i class="fa fa-paper-plane d-block d-lg-none"></i> 
                                    <span class="d-none d-lg-block">Guardar</span>
                                </button>
                            </fieldset>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    </div>
    <!-- Modal Crear usuario end -->

</body>
<?php include "js/JsAdminPanel.html" ?>
</html>
<!-- Lo estás imaginando... usamos cookies! y por ello nos obligan a avisarte y ofrecerte estas herramientas para la configuración. -->