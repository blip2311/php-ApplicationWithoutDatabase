let loadList = ()=>{
    fetch("\list", {
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response =>response.json())
    .then(jsonData => createListPage(jsonData));
}

let addItemClicked = e =>{
    loadNewForm();
};

let createListPage = items =>{
    let main = document.createElement("main");
    let p = document.createElement("p");
    main.appendChild(p);
    let addButton = document.createElement("button");
    addButton.id = "AddButton";
    addButton.innerText = "Add";
    addButton.addEventListener("click", addItemClicked);
    p.appendChild(addButton);
    main.appendChild(createTable(items));
    document.getElementsByTagName("body")[0].replaceChildren(main);
};

let createTable = items =>{
    let table = document.createElement("table");
    table.appendChild(createTableHeader());
    table.appendChild(createTableBody(items));
    return table;
};

let createTableHeader = () =>{
    let headerText = ["ID","NAME","IMAGE","ADDRESS","GENDER", "ACTION"];
    let thead = document.createElement("thead");
    let tr = document.createElement("tr");
    headerText.forEach((text, index, array)=>{
        tr.appendChild(createHeaderElement(text));
    });
    thead.appendChild(tr);
    return thead;
};

let createTableBody = items =>{
    let tbody = document.createElement("tbody");
    if(items.length == 0){
        tbody.appendChild(createEmptyTableRow());
    }else{
        items.forEach((item, index, array)=>{
            tbody.appendChild(createTableRow(item));
        });
    }
    return tbody;
};

let createTableRow = item =>{
    let tr = document.createElement("tr");
    tr.appendChild(getTableTextCell(item.id));
    tr.appendChild(getTableTextCell(item.name));
    tr.appendChild(getImageData(item.image));
    tr.appendChild(getTableTextCell(item.address));
    tr.appendChild(getTableTextCell(item.gender));
    tr.appendChild(getButton("edit/"+item.id, "Edit"))
    tr.appendChild(getButton("show/"+item.id, "View"))
    tr.appendChild(getButton("delete/"+item.id, "Delete"))
    return tr;
};

let getButton = (url, name)=>{
    let td = document.createElement("td");
    let button = document.createElement("button");
    button.innerText = name;
    button.dataset.url = url;
    td.appendChild(button);
    switch(name){
        case "Edit":
            button.addEventListener("click", editButtonClicked);
            break;
        case "View":
            button.addEventListener("click", viewButtonClicked);
            break;
        case "Delete":
            button.addEventListener("click", deleteButtonClicked);
            break;
    }
    return td;
};

let editButtonClicked = e =>{
    fetch(e.currentTarget.dataset.url, {
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response =>response.json())
      .then(jsonData => createFormPage(jsonData, true));
};

let viewButtonClicked = e =>{
    fetch(e.currentTarget.dataset.url, {
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response =>response.json())
      .then(jsonData => createForm(jsonData, false));
};

let deleteButtonClicked = e =>{};

let getImageData = url =>{
    let td = document.createElement("td");
    let image = document.createElement("img");
    image.src = url;
    td.appendChild(image);
    return td;
};

let createEmptyTableRow = () =>{
    let tr = document.createElement("tr");
    td = getTableTextCell("No Items are present");
    td.colSpan = 8;
    tr.appendChild(td);
    return tr;
};

let getTableTextCell = text => {
    let td = document.createElement("td");
    td.innerText = text;
    return td;
};

let createHeaderElement = text =>{
    let th = document.createElement("th");
    th.innerText = text.toUpperCase();
    if(text == "ACTION"){
        th.colSpan = 3;
    }
    return th;
};