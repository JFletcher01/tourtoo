<?php
    session_start();
    if(isset($_COOKIE['user-id'])){
        $_SESSION['user-id'] = $_COOKIE['user-id'];
    }
    if(!isset($_SESSION['user-id'])){
        $_SESSION['user-id'] = -1;
    }
    include "pages/main/index.php";
?>