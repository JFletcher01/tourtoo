<?php
    session_start();
    require_once "../functions/functions.php";
    if(!isset($_POST)){
        echo '<meta http-equiv="refresh" content="0; url=../../">';
    }

    if($_POST['action'] == 'start-event'){
        $bd = crearConexion();
        $query = $bd->query('delete from tourtoo_event where saved = 0');
        $query = $bd->query('insert into tourtoo_event values (null,"t","d",0,0,0,"","",'.$_POST['monitor_id'].',0,0)');
        $last_id = $bd->query('select max(id) from tourtoo_event where saved = 0');
        $id = $last_id->fetch_assoc();
        $id = $id['max(id)'];
        $query = $bd->query('delete from tourtoo_image where event_id = '.$id);
        echo $id;
        cerrarConexion($bd);
    }

    if($_POST['action'] == 'set-title'){
        $bd = crearConexion();
        $query = $bd->prepare('update tourtoo_event set title = ? where id = ?');
        $query->bind_param('si',$_POST['title'],$_POST['event_id']);
        $query->execute();
        echo true;
        $query->close();
        cerrarConexion($bd);
    }

    if($_POST['action'] == 'set-price'){
        $bd = crearConexion();
        $query = $bd->prepare('update tourtoo_event set price = ? where id = ?');
        $query->bind_param('si',$_POST['price'],$_POST['event_id']);
        $query->execute();
        echo true;
        $query->close();
        cerrarConexion($bd);
    }

    if($_POST['action'] == 'set-description'){
        $bd = crearConexion();
        $query = $bd->prepare('update tourtoo_event set description = ? where id = ?');
        $query->bind_param('si',$_POST['text'],$_POST['event_id']);
        $query->execute();
        echo true;
        $query->close();
        cerrarConexion($bd);
    }

    if($_POST['action'] == 'set-capacity'){
        $bd = crearConexion();
        $query = $bd->prepare('update tourtoo_event set capacity = ? where id = ?');
        $query->bind_param('si',$_POST['capacity'],$_POST['event_id']);
        $query->execute();
        echo true;
        $query->close();
        cerrarConexion($bd);
    }

    if($_POST['action'] == 'set-date'){
        $bd = crearConexion();
        $query = $bd->prepare('update tourtoo_event set start_date = ?,end_date = ? where id = ?');
        $query->bind_param('ssi',$_POST['date'],$_POST['date'],$_POST['event_id']);
        $query->execute();
        echo true;
        $query->close();
        cerrarConexion($bd);
    }

    if($_POST['action'] == 'save-event'){
        $bd = crearConexion();
        $query = $bd->prepare('update tourtoo_event set saved = 1 where id = ?');
        $query->bind_param('i',$_POST['event_id']);
        $query->execute();
        echo true;
        $query->close();
        cerrarConexion($bd);
    }

    if($_POST['action'] == 'discard-changes'){
        $bd = crearConexion();
        $query = $bd->query('delete from tourtoo_event where id = '.$_POST['event_id']);
        echo 'ok';
        cerrarConexion($bd);
    }
?>