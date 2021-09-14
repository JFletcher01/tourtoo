<?php
    session_start();
    require_once "../functions/functions.php";
    if(!isset($_POST)){
        echo '<meta http-equiv="refresh" content="0; url=../../">';
    }
    $bd = crearConexion();
    if( ($_FILES['file']['type'] == 'image/jpeg') || 
        ($_FILES['file']['type'] == 'image/png')) {
        $last_id = $bd->query('select max(id)+1 from tourtoo_user');
        $last_id = $last_id->fetch_assoc();
        $image_type = explode('/',$_FILES['file']['type'])[1];
        if(file_exists("../../static/img/avatar/avatar-".$last_id['max(id)+1'].".".$image_type)){
            unlink("../../static/img/avatar/avatar-".$last_id['max(id)+1'].".".$image_type);
        }
        if(move_uploaded_file($_FILES['file']['tmp_name'],"../../static/img/avatar/avatar-".$last_id['max(id)+1'].".".$image_type)){
            echo "../../static/img/avatar/avatar-".$last_id['max(id)+1'].".".$image_type;
        }else{
            echo "move-error";
        }  
    }else{
        echo "no-image-error";
    }
?>