let loadNewForm = () =>{
    createFormPage(null,true);
};

let createFormPage = (item, edit) =>{
    let main = document.createElement("main");
    main.appendChild(createForm(item, edit));
    document.querySelector("body").replaceChildren(main);
};

let createForm = (item, edit) =>{
    let form = document.createElement("form");
    form.id = "ItemForm";
    form.appendChild( createFieldSet({
        input:"input",
        type:"text",
        name:"id",
        disabled:true, 
        value:(item==null)?"":item.id
    }));
    form.appendChild(createFieldSet({
        input:"input",
        type:"text",
        name:"name",
        disabled:!edit, 
        value:(item==null)?"":item.name
    }));
    form.appendChild(createFieldSet({
        input:"input",
        type:"file",
        name:"image",
        disabled:!edit, 
        value:(item==null)?"":item.image
    }));
    form.appendChild(createFieldSet({
        input:"textarea",
        type:null,
        name:"address",
        disabled:!edit, 
        value:(item==null)?"":item.address
    }));
    form.appendChild(createFieldSet({
        input:"input",
        type:"radio",
        name:"gender",
        options:["male","female"],
        disabled:!edit, 
        value:(item==null)?"":item.address
    }));
    return form;
};

let createFieldSet = data =>{
    let fieldset = document.createElement("fieldset");
    let label = document.createElement("legend");
    let id = data.name.toUpperCase();
    label.innerText = id;
    fieldset.appendChild(label);
    if(data.hasOwnProperty('options')){
        data.options.forEach((opt, i, arr)=>{
            let p = document.createElement("p");
            let input = document.createElement("input");
            input.type = "radio";
            input.value = opt;
            input.id = id+i;
            input.name = data.name;
            p.appendChild(input);
            if(opt == data.value){
                input.checked = "checked";
            }
            let label = document.createElement("label");
            label.htmlFor = input.id;
            label.innerText = opt.toUpperCase();
            p.appendChild(label);
            fieldset.appendChild(p);
        });
    }else{
        let input = document.createElement(data.input);
        if(data.type!=null){
            input.type = data.type;
        }
        input.id = id;
        input.name = id.toLowerCase();
        input.value = data.value;
        if(data.disabled){
            input.disabled = "disabled";
        }
        fieldset.appendChild(input);
    }
    return fieldset;
}