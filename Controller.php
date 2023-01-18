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
        return json_encode($model);
    }

    //Returns the JSON representation of the model given as parameter with edit enabled.
    public function editModel(Model $model){
        return json_encode($model);
    }

    //Saves a new Model 
    public function saveModel(){
        return $this->store(new Model());
    }

    //Updates the model given as parameter
    public function updateModel(Model $model){
        return $this->store($model);
    }

    //Delete the model given as parameter
    public function deleteModel(Model $model){
        return $this->delete($model);
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

    private function delete(Model $model){
        if(isset($model->image) && file_exists($model->image)){
            unlink($model->image);
        }
        foreach($_SESSION["items"] as $i => $itm){
            $item = unserialize($itm);
            if($item->id == $model->id){
                unset($_SESSION["items"][$i]);
                break;
            }
        }
        $this->storeData();
        return "success";
    }

    private function store(Model $model){
        if(!isset($model->id)){
            $model->id = $this->getNextId();
        }
        if(is_dir("images") === false){
            mkdir("images");
        }
        if(isset($_FILES["image"])){
            if(isset($model->image) && file_exists($model->image)){
                unlink($model->image);
            }
            $file_tmp =$_FILES['image']['tmp_name'];
            $file_ext = end(explode(".", $_FILES['image']['name']));
            $file_real =  "images/".$model->id.".".$file_ext;
            move_uploaded_file($file_tmp,$file_real);
            $model->image = $file_real;
        }
        $model->name = $_POST["name"];
        $model->address = $_POST["address"];
        $model->gender = $_POST["gender"];
        $found = false;
        foreach($_SESSION["items"] as $i => $itm){
            $item = unserialize($itm);
            if($item->id == $model->id){
                $_SESSION["items"][$i] = serialize($model);
                $found = true;
                break;
            }
        }
        if(!$found){
            $_SESSION["items"][] = serialize($model);
        }
        $this->storeData();
        return "success";
    }

    private function storeData(){
        $file = fopen("data", "w");
        fwrite($file, serialize($_SESSION["items"]));
        fclose($file);
    }

    private function getNextId():int{
        $i = 0;
        foreach($_SESSION["items"] as $item){
            $it = unserialize($item);
            if($it->id > $i){
                $i = $it->id;
            }
        }
        return $i+1;
    }
}