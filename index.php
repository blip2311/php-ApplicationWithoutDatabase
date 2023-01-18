<?php
session_start();
spl_autoload_register(function($className){
    include $className . '.php';
});
if(!isset($_SESSION["items"])){
    if(is_file("data")){
    $_SESSION["items"] = unserialize(file_get_contents("data"));
    }else{
        $_SESSION["items"] = array();
    }
}
try{
    echo Router::getResponse();
}catch(Exception $e){
    http_response_code($e->getCode());
    echo $e->getMessage();
}