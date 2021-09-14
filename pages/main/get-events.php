<?php
session_start();
require_once "../functions/functions.php";
if(isset($_POST['action'])){
    if($_POST['action'] == 'show-events'){
        $bd = crearConexion();
        if(!isset($_POST['filter'])){
            $query = $bd->query('select id,title,price from tourtoo_event where saved = 1 and removed = 0 order by id asc');
        }else{
            if($_POST['filter'] != ''){
                $query = $bd->query('select id,title,price from tourtoo_event where saved = 1 and removed = 0 and title like "%'.$_POST['filter'].'%" order by id asc');
            }else{
                $query = $bd->query('select id,title,price from tourtoo_event where saved = 1 and removed = 0 order by id asc');
            }
        }
        $json = array();
        $json = $query->fetch_all();
        
        cerrarConexion($bd);
        echo json_encode($json);
    }
    if($_POST['action'] == 'show-first-image'){
        $bd = crearConexion();
        $image_query = $bd->query('select id, event_id from tourtoo_image where first = 1 order by event_id asc');
        $images = array();
        $images = $image_query->fetch_all();
        
        cerrarConexion($bd);
        echo json_encode($images);
    }
}
?>