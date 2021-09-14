<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="static/img/logo-300.png" type="image/png">
    <?php include "css/CssMain.html" ?>
    <title>TourToo!</title>
</head>
<body>
    <nav class="navbar navbar-expand-lg bg-secondary ml-0" id='navbar'>
        <div class="navbar-brand">
            <a href="../tourtoo">
                <img src="static/img/logo-tourtoo.png" width="300" height="100" alt="Logo Pequeño TourToo">
            </a>
        </div>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="nav-item ml-auto mr-5">
            <a href='#searchTarget' class='nav-link searchEvent main-menu-part d-inline px-3'>
                <?php include "static/resources/search-solid.svg" ?>
            </a>
        </div>
        <div class="nav-item dropdown mr-3">
            <a class='dropdowm-toggle userDisplay main-menu-part nav-link d-inline px-3' class='nav-link' href='#' id='dropdown-toggler' role='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
                <?php include "static/resources/user-regular.svg" ?>
            </a>
            <div class="dropdown-menu dropdown-menu-left user-display row <?php if($_SESSION['user-id'] == -1){ ?>userView<?php } ?>" aria-labelledby='dropdown-toggler'>
                <div class="<?php if($_SESSION['user-id'] == -1){ ?>col-6<?php }else{ ?>col-12 p-0<?php } ?> login-area">
                    <?php if($_SESSION['user-id'] == -1){ ?>
                        <h4 class='text-center'>¿Quieres iniciar sesion?</h4>
                        <div class="form-group username w-100 mx-auto no-opacity">
                            <label for="user-name">Nombre de usuario</label>
                            <input class='form-control' type="text" autocomplete='off' name='user-name' id='user-name' required>
                        </div>
                        <div class="form-group password w-100 mx-auto no-opacity">
                            <label for="user-passwd">Contraseña</label>
                            <input class='form-control' type="password" autocomplete='off' name='user-passwd' id='user-passwd' required>
                        </div>
                        <div class="form-check w-100 mx-auto text-center mb-3 no-opacity">
                            <input type="checkbox" class='form-check-input' name="remember" id="remember">
                            <label for="remember" class="form-check-label"> Recuérdame</label><br>
                        </div>
                        <div class="w-100 no-opacity">
                            <input type="submit" class='btn btn-outline-success mx-auto d-block user-login' value="Iniciar sesion" name='user-login'>
                        </div>
                        <?php
                         }else{
                             if($_SESSION['user-id'] == 0){
                     ?>
                        <a href="pages/admin-panel/" class="admin-link">
                            <div class="drowpdown-item user-section p-1">
                                <i class="fas fa-solar-panel"></i> Panel de Administración
                            </div>
                        </a>
                        <?php
                             }else{
                        ?>
                            <a href="pages/user-config/" class="admin-link">
                                <div class="drowpdown-item p-1 user-section">
                                    <i class="fas fa-solar-panel"></i> Panel de Usuario
                                </div>
                            </a>
                        <?php }
                            if(substr_count($_SESSION['user-id'],'|') == 1){ ?>
                            <a href="pages/monitor-panel/" class="admin-link">
                                <div class="drowpdown-item p-1 user-section ">
                                    <i class="fas fa-solar-panel"></i> Panel de Monitor
                                </div>
                            </a>
                        <?php } ?>
                    <?php } ?>
                        
                        <div class="dropdown-item user-section logout p-1 pl-0 <?php if($_SESSION['user-id'] == -1){ echo 'd-none';} ?>">
                            <i class="fas fa-sign-out-alt"></i> Cerrar sesion
                        </div>
                    
                </div>
                <div class="col-6 register-area <?php if($_SESSION['user-id'] != -1){ echo 'd-none';} ?>">
                    <h4 class='text-center'>¿No estas registrado?</h4>
                    <div class="form-group username w-100 mx-auto no-opacity">
                            <label for="user-name">Nombre</label>
                            <input class='form-control' autocomplete='off' type="text" name='first-name-r' id='first-name-r' required>
                        </div>
                        <div class="form-group username w-100 mx-auto no-opacity">
                            <label for="user-name">Nombre de usuario</label>
                            <input class='form-control' autocomplete='off' type="text" name='user-name-r' id='user-name-r' required>
                        </div>
                        <div class="form-group password w-100 mx-auto no-opacity">
                            <label for="user-passwd">Contraseña</label>
                            <input class='form-control' autocomplete='off' type="password" name='user-passwd' id='user-passwd-r' required>
                        </div>
                        <div class="w-100 no-opacity">
                            <input type="submit" class='btn btn-outline-primary mx-auto d-block user-register' value="Registrate ya!" name='user-register'>
                        </div>
                </div>
            </div>
        </div>
    </nav>
    <div class="w-100 row layout-landscape ml-0">
        <div class="offset-0 offset-lg-3 col-12 col-lg-6 rounded p-5 d-flex justify-content-center flex-column">
            <div class='search-main-title mb-3 pl-3' id='searchTarget'>
                <h3>LLENA TU VIAJE</h3>
                <h2>Miles de actividades a tu alcance</h2>
            </div>
            <div class="input-group w-100 mt-5">
                <input type="text" placeholder='¿A dónde quieres ir?'class="form-control badge-pill main-search mt-0">
                <div class="input-group-append">
                    <button class="btn btn-success badge-pill">Buscar</button>
                </div>
            </div>
        </div>
    </div>
    <?php if(isset($_COOKIE['interested'])){ ?>
    <section class="w-100 row interested-view ml-0">
        <div class="offset-3 col-6 py-3">
            <h4 class="text-center activities-title">¿Sigues interesado en?</h4>
        </div>
        <div class="col-12 row event-squares justify-content-between">
            
        </div>
    </section>
    <?php } ?>
    <section class="w-100 row activities-view m-0">
        <div class="offset-3 col-6 py-3">
            <h4 class="text-center activities-title">Vista de Eventos</h4>
        </div>
        <div class="col-12 row event-squares justify-content-between">
            
        </div>
    </section>

    <footer class="w-100 bg-secondary mt-5">
        <div class="ml-auto d-table">©2021 Javier González Rosa</div>
    </footer>
</body>
<?php include "js/JsMain.html" ?>
</html>
<!-- Lo estás imaginando... usamos cookies! y por ello nos obligan a avisarte y ofrecerte estas herramientas para la configuración. -->