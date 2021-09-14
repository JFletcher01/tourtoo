<?php
    session_start();
    require_once "../functions/functions.php";
    if(!isset($_POST)){
        echo '<meta http-equiv="refresh" content="0; url=../../">';
    }

    if($_POST['action'] == 'get-user'){
        $bd = crearConexion();
        $query = $bd->query('select * from tourtoo_user where id = '.$_POST['id']);
        $json = array();
        $json = $query->fetch_assoc();
        cerrarConexion($bd);
        echo json_encode($json);
    }

    if($_POST['action'] == 'check-image'){
        if(file_exists("../../static/img/avatar/avatar-".$_POST['id'])){
            echo true;
        }else{
            echo false;
        }
    }

    if($_POST['action'] == 'change-first'){
        $bd = crearConexion();
        $query = $bd->prepare('update tourtoo_user set first_name = ? where id = ?');
        $query->bind_param('si',$_POST['first_name'],$_POST['id']);
        $query->execute();
        echo 0;
        $query->close();
        cerrarConexion($bd);
    }

    if($_POST['action'] == 'change-last'){
        $bd = crearConexion();
        $query = $bd->prepare('update tourtoo_user set last_name = ? where id = ?');
        $query->bind_param('si',$_POST['last_name'],$_POST['id']);
        $query->execute();
        echo 0;
        $query->close();
        cerrarConexion($bd);
    }

    if($_POST['action'] == 'change-user'){
        $bd = crearConexion();
        $query = $bd->prepare('update tourtoo_user set user_name = ? where id = ?');
        $query->bind_param('si',$_POST['user_name'],$_POST['id']);
        $query->execute();
        echo 0;
        $query->close();
        cerrarConexion($bd);
    }

    if($_POST['action'] == 'change-pass'){
        $bd = crearConexion();
        $query = $bd->prepare('update tourtoo_user set password = ? where id = ?');
        $pass = hash('sha256',hash('sha256',$_POST['pass']));
        $query->bind_param('si',$pass,$_POST['id']);
        $query->execute();
        echo 0;
        $query->close();
        cerrarConexion($bd);
    }

    if($_POST['action'] == 'get-booking'){
        $bd = crearConexion();
        $query = $bd->query('select title,tourtoo_event.id from tourtoo_event,tourtoo_booking where tourtoo_booking.event_id = tourtoo_event.id and tourtoo_booking.user_id = '.$_POST['id']);
        $json = array();
        $json = $query->fetch_assoc();
        cerrarConexion($bd);
        echo json_encode($json);
    }
?>