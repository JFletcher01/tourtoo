<?php
    session_start();
    require_once "../functions/functions.php";
    if(!isset($_POST)){
        echo '<meta http-equiv="refresh" content="0; url=../../">';
    }
    $bd = crearConexion();
    if( ($_FILES['file']['type'] == 'image/jpeg') || 
        ($_FILES['file']['type'] == 'image/png')) {
        $last_id = $bd->query('select max(id) from tourtoo_event');
        $last_id = $last_id->fetch_assoc();
        $image_type = explode('/',$_FILES['file']['type'])[1];
        if(file_exists("../../static/img/event_image/".$last_id['max(id)'].".".$image_type)){
            unlink("../../static/img/event_image/".$last_id['max(id)'].".".$image_type);
        }
        if(move_uploaded_file($_FILES['file']['tmp_name'],"../../static/img/event_image/".$last_id['max(id)'].".".$image_type)){
            echo "../../static/img/event_image/".$last_id['max(id)'].".".$image_type;
            $bd->query('insert into tourtoo_image values(null,'.$last_id['max(id)'].',1');
        }else{
            echo "move-error";
        }  
    }else{
        echo "no-image-error";
    }
?>