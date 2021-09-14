<?php

    function crearConexion(){
        $conexion = new mysqli('localhost','root','','tourtoo');
        
        $conexion->set_charset('utf8');

        return $conexion;
    }
    
    function cerrarConexion($conexion){
        return $conexion->close();
    }
?>