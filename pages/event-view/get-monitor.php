<?php
    require_once "../functions/functions.php";
    session_start();
    if(isset($_POST['action'])){
        if($_POST['action'] == 'show-monitor'){
            $bd = crearConexion();
            $query = $bd->query('select * from tourtoo_user where id = (select monitor_id from tourtoo_event where id = '.$_POST['event_id'].')');
            $json = array();
            $json = $query->fetch_assoc();

            cerrarConexion($bd);
            echo json_encode($json);
        }
    }
?>