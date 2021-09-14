<?php
    require_once "../functions/functions.php";
    session_start();
    if(isset($_POST['action'])){
        if($_POST['action'] == 'get-main-event'){
            $bd = crearConexion();
            $query = $bd->query('select * from tourtoo_event where id = '.$_POST['id']);
            $json = array();
            $json = $query->fetch_assoc();

            cerrarConexion($bd);
            echo json_encode($json);
        }
        if($_POST['action'] == 'show-event-images'){
            $bd = crearConexion();
            $query = $bd->query('select id from tourtoo_image where event_id = '.$_POST['event_id']);
            $json = array();
            $json = $query->fetch_all();

            cerrarConexion($bd);
            echo json_encode($json);
        }

        if($_POST['action'] == 'book'){
            $bd = crearConexion();
            $query = $bd->prepare('insert into tourtoo_booking values (?,?,null,null)');
            $query->bind_param('ii',$_POST['user_id'],$_POST['event_id']);
            $query->execute();
            $query->close();

            $query = $bd->query('update tourtoo_event set joined = joined + 1 where id = '.$_POST['event_id']);
            echo 0;
            cerrarConexion($bd);
        }
    }
?>