<?php
    session_start();
    if(isset($_COOKIE['user-id'])){
        $_SESSION['user-id'] = $_COOKIE['user-id'];
    }
    if(!isset($_SESSION['user-id'])){
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
    <?php include "css/CssEventView.html" ?>
    <title></title>
</head>
<body>
    <span class="d-none url-content"><?php echo $_GET['event'] ?></span>
    <span class="d-none user-id"><?php echo $_SESSION['user-id'] ?></span>
    <nav class="navbar navbar-expand-lg bg-secondary ml-0" id='navbar'>
        <div class="navbar-brand">
            <a href="../../">
                <img src="../../static/img/logo-tourtoo.png" width="300" height="100" alt="Logo Pequeño TourToo">
            </a>
        </div>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="nav-item ml-auto mr-5">
            <a href='#searchTarget' class='nav-link searchEvent main-menu-part d-inline px-3'>
                <?php include "../../static/resources/search-solid.svg" ?>
            </a>
        </div>
        <div class="nav-item dropdown mr-3">
            <a class='dropdowm-toggle userDisplay main-menu-part nav-link d-inline px-3' class='nav-link' href='#' id='dropdown-toggler' role='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
                <?php include "../../static/resources/user-regular.svg" ?>
            </a>
            <div class="dropdown-menu dropdown-menu-left user-display row <?php if($_SESSION['user-id'] == -1){ ?>userView<?php } ?>" aria-labelledby='dropdown-toggler'>
                <div class="<?php if($_SESSION['user-id'] == -1){ ?>col-6<?php }else{ ?>col-12 p-0<?php } ?> login-area">
                    <?php if($_SESSION['user-id'] == -1){ ?>
                        <h4 class='text-center'>¿Quieres iniciar sesion?</h4>
                        <div class="form-group username w-100 mx-auto no-opacity">
                            <label for="user-name">Nombre de usuario</label>
                            <input class='form-control' type="text" name='user-name' autocomplete='off' id='user-name' required>
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
                        <a href="../../pages/admin-panel/" class="admin-link">
                            <div class="drowpdown-item user-section p-1">
                                <i class="fas fa-solar-panel"></i> Panel de Administración
                            </div>
                        </a>
                        <?php
                             }else{
                        ?>
                            <a href="../../pages/user-config/" class="admin-link">
                                <div class="drowpdown-item p-1 user-section">
                                    <i class="fas fa-solar-panel"></i> Panel de Usuario
                                </div>
                            </a>
                        <?php }
                            if(substr_count($_SESSION['user-id'],'|') == 1){ ?>
                            <a href="../../pages/monitor-panel/" class="admin-link">
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
                            <input class='form-control' autocomplete='off' type="text" name='first-name' id='first-name' required>
                        </div>
                        <div class="form-group username w-100 mx-auto no-opacity">
                            <label for="user-name">Nombre de usuario</label>
                            <input class='form-control' autocomplete='off' type="text" name='user-name' id='user-name-r' required>
                        </div>
                        <div class="form-group password w-100 mx-auto no-opacity">
                            <label for="user-passwd">Contraseña</label>
                            <input class='form-control' autocomplete='off' type="password" name='user-passwd' id='user-passwd-r' required>
                        </div>
                        <div class="w-100 no-opacity">
                            <input type="submit" class='btn btn-outline-primary mx-auto d-block user-login' value="Registrate ya!" name='user-register'>
                        </div>
                </div>
            </div>
        </div>
    </nav>
    <section id="images-event" class="carousel slide">
        <div class="carousel-inner image-carousel">
            <div class="carousel-item event-parallax ml-0">
                
            </div>
        </div>
        <div class='col-12 col-md-6 p-5 event-header position-absolute d-flex justify-content-flex-end flex-column'>
            <h2 class='event-title text-center'></h2>
        </div>
    </section>
    <section class="w-100 event-view ml-0">
        <div class="main-article row m-0">
            <div class="col-12 col-md-9 pt-3 order-1 order-md-0">
                <!-- Seccion del monitor -->
                <section class="monitor-area row badge-pill col-12 col-md-9 m-2 my-auto">
                    <div class="monitor-avatar rounded-circle d-flex align-items-center">
                        
                    </div>
                    <h6 class="monitor-showcase my-auto pl-4"></h6>
                </section>
                <section class="general-showcase mt-4 rounded w-100 p-3">
                    <h4 class='px-4 pt-4 pb-1'>Descripción</h4><br>
                    <p class='p-4 pt-0 text-justified'></p>
                </section>
            </div>
            <div class="col-12 col-md-3 pt-3 order-0 order-md-1">
                <aside class="price-showcase w-50 m-auto badge-pill">
                    <div class="d-flex align-items-center justify-content-center w-100">
                        <h3 class='text-center success event-price my-auto'></h3>
                    </div>
                </aside>
                <aside class="event-capacity mt-4 rounded p-3">
                    <h3 class="px-4 pt-4 pb-1 text-center">
                        <span class="actual">
                        </span>
                        &nbsp;/&nbsp;
                        <span class="max-capacity">
                        </span>
                    </h3>
                    <div class="progress mb-4">
                        <div class="progress-bar progress-bar-striped progress-bar-animated bg-info" role="progressbar" aria-valuemin="0"></div>
                    </div>
                    <div class="date-display text-center mb-4">
                        <span class="date-start"></span><br>
                        <span class='date-divisor'>Al<span>
                        <span class="date-end"></span>
                    </div>
                    <?php if(substr_count($_SESSION['user-id'],'|') == 1){ ?>
                        
                    <?php }else{ ?>
                        <span class="book w-100 btn btn-success">
                            Reserva ya!
                        </span>
                    <?php } ?>
                </aside>
            </div>
        </div>
    </section>
    <footer class="w-100 event-view">
        <div class="ml-auto d-table">©2021 Javier González Rosa</div>
    </footer>
</body>
<?php include "js/JsEventView.html" ?>
</html>
<!-- Lo estás imaginando... usamos cookies! y por ello nos obligan a avisarte y ofrecerte estas herramientas para la configuración. -->