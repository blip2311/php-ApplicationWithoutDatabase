<?php
session_start();
// session_destroy();
spl_autoload_register(function($className){
    include $className . '.php';
});
if(!isset($_SESSION["items"])){
    $_SESSION["items"] = array();
}
try{
    echo Router::getResponse();
}catch(Exception $e){
    http_response_code($e->getCode());
    echo $e->getMessage();
}