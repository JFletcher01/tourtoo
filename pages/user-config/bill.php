<?php
    session_start();
    require_once "../functions/functions.php";
    if(!isset($_POST)){
        echo '<meta http-equiv="refresh" content="0; url=../../">';
    }
    $bd = crearConexion();
    if ($_FILES['file']['type'] == 'application/pdf') {
        $image_type = explode('/',$_FILES['file']['type'])[1];
        if(file_exists("../../static/img/bill/bill-".$_POST['id'].".".$image_type)){
            unlink("../../static/img/bill/bill-".$_POST['id'].".".$image_type);
        }
        if(move_uploaded_file($_FILES['file']['tmp_name'],"../../static/img/bill/bill-".$_POST['id'].".".$image_type)){
            echo "../../static/img/bill/bill-".$_POST['id'].".".$image_type;
        }else{
            echo "move-error";
        }  
    }else{
        echo "no-image-error";
    }
?>