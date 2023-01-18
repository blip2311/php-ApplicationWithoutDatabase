<?php
class Controller{

    //Returns the list of models
    public function getModelList(){
        $returnArray = array();
        foreach($_SESSION["items"] as $item){
            $returnArray[] = unserialize($item);
        }
        return json_encode($returnArray);
    }

    //Returns the JSON representation of the model given as parameter with edit disabled.
    public function showModel(Model $model){
        return "inside showModel";
    }

    //Returns the JSON representation of the model given as parameter with edit enabled.
    public function editModel(Model $model){
        return "inside editModel";
    }

    //Saves a new Model and returns the updated list of models
    public function saveModel(){
        // var_dump($_POST, $_FILES["image"]);
        return $this->store(new Model());
        // return "inside saveModel";
    }

    //Updates the model given as parameter and returns the updated list of models
    public function updateModel(Model $model){
        return "inside updateModel";
    }

    public function deleteModel(Model $model){
        return "inside deleteModel";
    }

    //Returns the default page to be opened when site is opened.
    public function home(){
        return "   <!doctype html> 
        <html>
            <head>
                <script src='script.js'></script>
                <script src='list.js'></script>
                <script src='form.js'></script>
                <link href='style.css' rel='stylesheet'>
            </head>
            <body onload='pageLoaded()'></body>
        </html>";
    }

    private function store(Model $model){
        if(isset($_FILES["image"])){
            if(isset($model->image) && file_exists($model->image)){
                unlink($model->image);
            }
            $file_tmp =$_FILES['image']['tmp_name'];
            $file_real = "images/".$_FILES['image']['name'];
            move_uploaded_file($file_tmp, $file_real);
            $model->image = $file_real;
        }
        $model->name = $_POST["name"];
        $model->address = $_POST["address"];
        $model->gender = $_POST["gender"];
        if(!isset($model->id)){
            $model->id = $this->getNextId();
            $_SESSION["items"][] = serialize($model);
        }
        return "success";
    }

    private function getNextId():int{
        $i = 0;
        foreach($_SESSION["items"] as $item){
            if(unserialize($item)->id > $i){
                $i = $item->id;
            }
        }
        return $i+1;
    }
}