<?php
class Controller{

    //Returns the list of models
    public function getModelList(){
        return json_encode([]);
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
        return "inside saveModel";
    }

    //Updates the model given as parameter and returns the updated list of models
    public function updateModel(Model $model){
        return "inside updateModel";
    }

    //Returns the default page to be opened when site is opened.
    public function home(){
        return "<html>
            <head>
                <script src='script.js'></script>
                <link href='style.css' rel='stylesheet'>
            </head>
            <body onload='pageLoaded()'></body>
        </html>";
    }
}