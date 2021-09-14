<?php
    session_start();
    require_once "../functions/functions.php";
    if(!isset($_POST)){
        echo '<meta http-equiv="refresh" content="0; url=../../">';
    }
    if($_POST['action'] == 'get-users'){
        $bd = crearConexion();
        $query = $bd->query('select id,first_name,last_name,user_name,active,is_monitor from tourtoo_user where id > 0 and removed = 0');
        $json = array();
        $json = $query->fetch_all();

        cerrarConexion($bd);
        echo json_encode($json);
    }

    if($_POST['action'] == 'show-events'){
        $bd = crearConexion();
        $query = $bd->query('select tourtoo_event.id,title,joined,capacity,price,start_date,end_date,first_name,last_name from tourtoo_event,tourtoo_user where tourtoo_event.monitor_id = tourtoo_user.id and saved = 1 and tourtoo_event.removed = 0 order by title desc ');
        
        
        $json = array();
        $json = $query->fetch_all();
        cerrarConexion($bd);
        echo json_encode($json);
    }

    if($_POST['action'] == 'add-user'){
        $bd = crearConexion();
        $query = $bd->prepare('insert into tourtoo_user values(null,?,?,?,?,null,1,?)');
        $monitor = 0;
        if($_POST['is_monitor']){
            $monitor = 1;
        }
        $pass = hash('sha256',hash('sha256',$_POST['password']));
        $query->bind_param('ssssi',$_POST['first_name'],$_POST['last_name'],$_POST['username'],$pass,$monitor);
        $query->execute();
        $query->store_result();
        if($query->affected_rows != 0){
            $last_id = $bd->query('select max(id)+1 from tourtoo_user'); 
            $last_id = $last_id->fetch_assoc();
            echo $last_id['max(id)'];
        }else{
            echo 'error';
        }
        $query->close();
        cerrarConexion($bd);
    }

    if($_POST['action'] == 'delete-user'){
        $bd = crearConexion();
        $query = $bd->query('update tourtoo_user set removed = 1 where id = '.$_POST['id']);
        if($query->affected_rows = 1){
            echo true;
        }else{
            echo false;
        }
        cerrarConexion($bd);
    }

    if($_POST['action'] == 'get-user'){
        $bd = crearConexion();
        $query = $bd->query('select id,first_name,last_name,user_name,active,is_monitor from tourtoo_user where id = '.$_POST['id']);
        $json = array();
        $json = $query->fetch_assoc();
        $json['avatar'] = 'false';
        if(file_exists("../../static/img/avatar/avatar-".$_POST['id'].".png")){
            $json['avatar']='true';
        }
        echo json_encode($json);
        cerrarConexion($bd);
    }

    if($_POST['action'] == 'save-user'){
        $bd = crearConexion();
        if($_POST['password']){
            $pass = hash('sha256',hash('sha256',$_POST['password']));
            $query = $bd->prepare('update tourtoo_user set first_name = ?, last_name = ?, user_name = ?, password = ?, is_monitor = ? where id = ?');
            $query->bind_param('ssssii',$_POST['first_name'],$_POST['last_name'],$_POST['user_name'],$pass,$_POST['is_monitor'],$_POST['id']);
        }else{
            $query = $bd->prepare('update tourtoo_user set first_name = ?, last_name = ?, user_name = ?, is_monitor = ? where id = ?');
            $query->bind_param('sssii',$_POST['first_name'],$_POST['last_name'],$_POST['user_name'],$_POST['is_monitor'],$_POST['id']);
        }
        $query->execute();
        $query->store_result();
        $query->close();
        cerrarConexion($bd);
        echo 0;
    }

    if($_POST['action'] == 'toggle-active'){
        $bd = crearConexion();
        $query = $bd->query("update tourtoo_user set active = ".$_POST['active']." where id = ".$_POST['id']);
        if($_POST['active'] == 1){
            echo 1;
        }else{
            echo 0;
        }
        cerrarConexion($bd);
    }

    if($_POST['action'] == 'get-events'){
        $bd = crearConexion();

        $query = $bd->query('select id,title,price,joined,capacity,start_date,end_date,monitor_id from tourtoo_event where removed = 1');
        $json = array();
        $json = $query->fetch_all();
        echo json_encode($json);
        cerrarConexion($bd);
    }

?>  