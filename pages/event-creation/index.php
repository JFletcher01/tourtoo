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
    <?php include "css/CssEventCreation.html" ?>
    <title>Creador de Eventos | TourToo!</title>
</head>
<body>
    <input type="hidden" value='<?php echo explode('|',$_SESSION['user-id'])[0] ?>' class="monitor-id">
    <input type="hidden" class='event-id'>
    <nav class="w-100 row bg-secondary main-menu ml-0">
        <div class="offset-1 col-2">
            <a href='../../../tourtoo'><img src="../../static/img/logo-tourtoo.png" class='w-75' alt="Logo Pequeño TourToo"></a>
        </div>
        <div class="col-9 my-auto">
            <button class="btn btn-success btn-sm float-right save-event" href='../event-creation'><i class="d-md-none d-block feather icon-plus white"></i>
                <span class="d-md-block d-none">Guardar</span>
            </button>
            <button class="btn btn-danger btn-sm float-right mr-3 discard-changes" href='../event-creation'><i class="d-md-none d-block feather icon-plus white"></i>
                <span class="d-md-block d-none">Descartar Cambios</span>
            </button>
        </div>
    </nav>
    <section id="images-event" class="carousel slide">
        <div class="carousel-inner image-carousel">
            <div class='carousel-item active event-parallax ml-0 cursor-pointer' style='background-image:url(../../static/img/event_image/no-image.png);'>

            </div>
        </div>
        <form action="post" enctipe='multipart/form-data'>
            <input type="file" class='event-image-picker d-none'>
        </form>

        <div class='col-6 p-5 event-header position-absolute d-flex justify-content-flex-end flex-column'>
            <h2 class='event-title text-center'>                         
               <input type="text" class='title-editor w-100 form-control-plaintext' placeholder='Escribe el título'>
            </h2>
        </div>
        <div class='w-100 p-5 image-header no-bottom position-absolute d-flex justify-content-center align-items-center flex-column'>
            <h3 class='image-placeholder text-center'>                        
                Pincha para elegir una imagen
            </h3>
        </div>
    </section>
    <section class="w-100 event-view ml-0">
        <div class="main-article d-flex flex-row">
            <div class="col-9 pt-3">
                <!-- Seccion del monitor -->
                <section class="monitor-area row badge-pill w-75 m-2 my-auto">
                    <div class="monitor-avatar rounded-circle d-flex align-items-center">
                        
                    </div>
                    <h5 class="monitor-showcase my-auto pl-4">
                        
                    </h5>
                </section>
                <section class="general-showcase mt-4 rounded w-100 p-3">
                    <h4 class='px-4 pt-4 pb-1'>Descripción</h4><br>
                    <p class='p-4 pt-0 text-justified description-text' contenteditable='true'></p>
                </section>
                <div style='height:500px;'>

                </div>
            </div>
            <div class="float-right w-25 pt-3">
                <aside class="price-showcase w-50 m-auto badge-pill">
                    <div class="d-flex align-items-center justify-content-center w-100">
                        <h3 class='text-center success event-price m-auto'>
                            <input type="text" class='price-editor w-100 text-success form-control-plaintext text-center' placeholder='Precio'>
                        </h3>
                    </div>
                </aside>
                <aside class="event-capacity mt-4 rounded p-3">
                    <h3 class="px-4 pt-4 pb-1 text-center m-auto">
                        <input type="text" class='capacity-editor w-100 form-control-plaintext text-center' placeholder='Capacidad'>
                    </h3>
                    <div class="progress mb-4">
                        <div class="progress-bar progress-bar-striped progress-bar-animated bg-info" role="progressbar" aria-valuemin="0"></div>
                    </div>
                    <div class="date-display text-center mb-4">
                        <span class='text-center'>Fecha de inicio</span>
                        <input type="date" class='date-editor w-100 form-control-plaintext text-center' placeholder='Fecha de inicio'><br>
                    </div>
                </aside>
            </div>
        </div>
    </section>
</body>
<?php include "js/JsEventCreation.html" ?>
</html>
<!-- Lo estás imaginando... usamos cookies! y por ello nos obligan a avisarte y ofrecerte estas herramientas para la configuración. -->