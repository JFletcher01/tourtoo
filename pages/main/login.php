<?php
    session_start();
    require_once "../functions/functions.php";
    if(!isset($_POST)){
        echo '<meta http-equiv="refresh" content="0; url=../../">';
    }
    if(isset($_POST['action'])){
        if($_POST['action'] == 'login'){
            
            $user = $_POST['user'];
            $pass = hash('sha256',hash('sha256',$_POST['pass']));
            
            $bd = crearConexion();
            $query = $bd->prepare('select id,user_name,password,is_monitor from tourtoo_user where user_name = ? and active = 1');
            $query->bind_param('s',$user);
            $query->bind_result($id,$user_name_real,$pass_real,$is_monitor);
            $query->execute();
            $query->store_result();
            $check = $query->affected_rows;
            $query->fetch();
            $query->close();
            cerrarConexion($bd);
            if($check != 0){
                if($user_name_real == $user && $pass_real == $pass){
                    if($is_monitor == 1){
                        $_SESSION['user-id'] = $id."|".$is_monitor;
                        if($_POST['remember']){
                            setcookie('user-id',$id."|".$is_monitor,time()+7200,'/');
                        }
                        echo $id."|".$is_monitor;
                    }else{
                        $_SESSION['user-id'] = $id;
                        if($_POST['remember']){
                            setcookie('user-id',$id,time()+7200,'/');
                        }
                        echo $id;
                    }
                    
                }else{
                    echo 'no';
                }
            }
            else{
                echo 'no';
            }
        }
        
        if($_POST['action'] == 'register'){
            $first_name = $_POST['first_name'];
            $user = $_POST['user'];
            $pass = hash('sha256',hash('sha256',$_POST['pass']));

            $bd = crearConexion();
            $query = $bd->prepare('insert into tourtoo_user values (null,?," ",?,?,1,0,0)');
            $query->bind_param('sss',$first_name,$user,$pass);
            $query->execute();
            $query->store_result();
            if($query->affected_rows != 0){
                $id = $bd->query('select max(id) from tourtoo_user');
                $last_id = $id->fetch_assoc();$_SESSION['user-id'] = $id;
                $_SESSION['user-id'] = $last_id['max(id)'];
                setcookie('user-id',$last_id['max(id)'],time()+7200,'/');
                echo $last_id['max(id)'];
            }else{
                echo 'no';
            }
            $query->close();
            cerrarConexion($bd);
        }

        if($_POST['action'] == 'guest'){
            $_SESSION['user-id'] = -1;
            echo 'ok';
        }

        if($_POST['action'] == 'logout'){
            unset($_SESSION['user-id']);
            setcookie('user-id',1,time()-1,'/');
            echo 'ok';
        }
    }
?>