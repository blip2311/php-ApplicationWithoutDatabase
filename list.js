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