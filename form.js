let loadNewForm = () =>{
    createFormPage(null);
};

let createFormPage = item =>{
    let main = document.createElement("main");
    main.appendChild(createForm());
    document.querySelector("body").replaceChildren(main);
};

let createForm = item =>{
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
        disabled:false, 
        value:(item==null)?"":item.name
    }))
    form.appendChild(createFieldSet({
        input:"input",
        type:"file",
        name:"image",
        disabled:false, 
        value:(item==null)?"":item.image
    }))
    return form;
};

let createFieldSet = data =>{
    let fieldset = document.createElement("fieldset");
    let label = document.createElement("label");
    let id = data.name.toUpperCase();
    label.htmlFor = id;
    label.innerText = id;
    fieldset.appendChild(label);
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
    return fieldset;
}