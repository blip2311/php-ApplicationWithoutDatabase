<?php
class Router{
    // Constructor is being made private so that it should not be instantiated outside of this class.
    private function __construct(){}

    // This is the only method that can be called externally and would be the basis for routing.
    // This return the response that is to be sent to the client 
    // from the respective funtion base on the routs
    public static function getResponse(){
        $uriParts = explode("/", $_SERVER['REQUEST_URI']);
        $uriLast = $uriParts[count($uriParts)-1];
        $router = new Router();
        $controller = new Controller();
        $model = null;
        if(is_numeric($uriLast)){
            $model = $router->getModel($uriLast);
            $uriLast = $uriParts[count($uriParts)-2];
        }
        switch($uriLast){
            case "list":
                $router->checkGet();
                return $controller->getModelList();
            case "show":
                $router->checkGet();
                $router->checkModel($model);
                return $controller->showModel($model);
            case "edit":
                $router->checkGet();
                $router->checkModel($model);
                return $controller->editModel($model);
            case "save":
                $router->checkPost();
                return $controller->saveModel();
            case "update":
                $router->checkPost();
                $router->checkModel($model);
                return $controller->updateModel($model);
            default:
                $router->checkGet();
                return $controller->home();
        }
    }

    //Checks if the request method is get. If not then an exception is thrown.
    private function checkGet(){
        if($_SERVER['REQUEST_METHOD'] !== "GET"){
            throw new Exception("Only GET method is supported", 400);
        }
    }

    //Checks if the request method is post. If not then an exception is thrown.
    private function checkPost(){
        if($_SERVER['REQUEST_METHOD'] !== "POST"){
            throw new Exception("Only POST method is supported", 400);
        }
    }

    //Finds and returns the model for the given id. If no model is found then an exception is thrown.
    private function getModel(int $id):Model{
        foreach($_SESSION["items"] as $model){
            if($model->id == $id){
                return $model;
            }
        }
        throw new Exception("Item with id $id is not found", 404);
    }

    //Check whether the supplied model is not null and is of Class Model. 
    //Else it will throw an exception.
    private function checkModel($model){
        if($model == null || get_class($model) !== Model::class){
            throw new Exception("Improper URL requested", 404);
        }
    }
}