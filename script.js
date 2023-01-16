let pageLoaded = () =>{
    loadList();
};

let loadList = ()=>{
    fetch("\list", {
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response =>response.json())
    .then(jsonData => createList(jsonData));
}

let createList = items =>{
    let table = document.createElement("table");
    table.appendChild(createTableHeader());
    table.appendChild(createTableBody(items));
    document.getElementsByTagName("body")[0].replaceChildren(table);
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