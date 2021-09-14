<?php
    session_start();
    require_once "../functions/functions.php";
    if(!isset($_POST)){
        echo '<meta http-equiv="refresh" content="0; url=../../">';
    }
    if($_POST['action'] == 'get-events'){
        $bd = crearConexion();
        $query = $bd->query('select id,title,price,joined,capacity,start_date,end_date,monitor_id from tourtoo_event where removed = 0 and saved = 1 and monitor_id = '.$_POST['monitor_id']);
        $json = array();
        $json = $query->fetch_all();
        echo json_encode($json);
        cerrarConexion($bd);
    }

    if($_POST['action'] == 'get-booking'){
        $bd = crearConexion();
        $query = $bd->query('select first_name,last_name,paid_at,bill,');
    }

    if($_POST['action'] == 'delete-event'){
        $bd = crearConexion();
        $query = $bd->query('update tourtoo_event set removed = 1 where id = '.$_POST['id']);
        if($query->affected_rows = 1){
            echo true;
        }else{
            echo false;
        }
        cerrarConexion($bd);
    }
?>