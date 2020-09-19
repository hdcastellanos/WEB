let jsonObject = [
  {
    last_lane: "Daws",

    first_name: "Nari",

    email: "ndaws0@dell.com",

    photo: "http://dummyimage.com/155x119.jpg/ff4444/ffffff",
  },
  {
    last_lane: "Withams",

    first_name: "Winona",

    email: "wwithams1@ibm.com",

    photo: "http://dummyimage.com/161x166.bmp/cc0000/ffffff",
  },
  {
    last_lane: "Streatfield",

    first_name: "Northrup",

    email: "nstreatfield2@macromedia.com",

    photo: "http://dummyimage.com/195x201.png/ff4444/ffffff",
  },
];
// inicializar tabla
document.write(`<table  id = "tabla2" class="table-striped">
                 <tr>
                 <th id="nombre"> Nombre</th>
                 <th id="Apellido"> Apellido</th>
                 <th id="Email">Email</th>
                 <th id="foto">Foto</th>
                 <th id="Eliminar">Eliminar</th>
                 </tr>`);
let contador = 0;
jsonObject.forEach((element) => {
  document.write(`<tr id="R${contador}">
          <td id ="N${contador}">${element.first_name} </td>
          <td id ="A${contador}"> ${element.last_lane} </td>
          <td id="E${contador}">${element.email} </td>
          <td id="F${contador}"><img src="${element.photo}" alt=""> </td>
          <td id="B${contador}">
      <button id="EliminarButton${contador}" type="button">Eliminar</button>
    </td></tr>`);
  contador++;
});
document.write(`</table>
<button id="EliminarTodo" type="button">Eliminar Todo</button>
`);

// crear otra fila
document.write(`<form>
  <label for="fname">First name:</label><br />
  <input type="text" id="fname" name="fname" /><br />
  <label for="lname">Last name:</label><br />
  <input type="text" id="lname" name="lname" /> <br />
  <label for="fEmail">Email: </label> <br />
  <input type="email" id="FEmail" name="FEmail" /> <br />
  <label for="fPhoto">Photo: </label> <br />
  <input type="text" id="FPhoto" name="FPhoto" /> <br />
  <button id="crearButton" type='button'>Agregar</button>
</form>`);
let crearButton = document.getElementById("crearButton");
crearButton.addEventListener("click", function () {
  let name = document.getElementById("fname").value;
  let last = document.getElementById("lname").value;
  let email = document.getElementById("FEmail").value;
  let photo = document.getElementById("FPhoto").value;
  let newOb = {
    last_lane: name,

    first_name: last,

    email: email,

    photo: photo,
  };

  jsonObject.push(newOb);
  let tableRef = document
    .getElementById("tabla2")
    .getElementsByTagName("tbody")[0];

  // Insert a row in the table at the last row
  let newRow = tableRef.insertRow();
  newRow.id = "R4";
  newRow.innerHTML = `<tr id="R${jsonObject.length}">
  <td id ="N${jsonObject.length - 1}">${name} </td>
  <td id ="A${jsonObject.length - 1}"> ${last} </td>
  <td id="E${jsonObject.length - 1}">${email} </td>
  <td id="F${jsonObject.length - 1}"><img src="${photo}" alt="New image"> </td>
  <td id="B${jsonObject.length - 1}">
      <button id="EliminarButton${
        jsonObject.length - 1
      }" type="button">Eliminar</button>
    </td>       
  
  </tr>`;
  console.log(newRow);
  console.log(tableRef);
});

// ordernar por nombre
let nombreCell = document.getElementById("nombre");
nombreCell.addEventListener("click", function () {
  console.log(jsonObject);
  let ordenada = sortByName(jsonObject);
  contador = 0;
  ordenada.forEach((element) => {
    let name = document.getElementById("N" + contador);
    let last = document.getElementById("A" + contador);
    let email = document.getElementById("E" + contador);
    let photo = document.getElementById("F" + contador);

    name.innerText = element.first_name;
    last.innerText = element.last_lane;
    email.innerText = element.email;
    photo.innerHTML = `<img src="${element.photo}" alt=""> `;
    contador++;
  });
});

// ordernar por apellido
let apellidoCell = document.getElementById("Apellido");
apellidoCell.addEventListener("click", function () {
  let ordenada = sortBylast_name(jsonObject);
  contador = 0;
  ordenada.forEach((element) => {
    let name = document.getElementById("N" + contador);
    let last = document.getElementById("A" + contador);
    let email = document.getElementById("E" + contador);
    let photo = document.getElementById("F" + contador);

    name.innerText = element.first_name;
    last.innerText = element.last_lane;
    email.innerText = element.email;
    photo.innerHTML = `<img src="${element.photo}" alt=""> `;
    contador++;
  });
});

//ordenar por email

let emailCell = document.getElementById("Email");
emailCell.addEventListener("click", function () {
  let ordenada = sortByEmail(jsonObject);
  contador = 0;
  ordenada.forEach((element) => {
    let name = document.getElementById("N" + contador);
    let last = document.getElementById("A" + contador);
    let email = document.getElementById("E" + contador);
    let photo = document.getElementById("F" + contador);

    name.innerText = element.first_name;
    last.innerText = element.last_lane;
    email.innerText = element.email;
    photo.innerHTML = `<img src="${element.photo}" alt=""> `;
    contador++;
  });
});

function sortByName(list) {
  var length = list.length;

  for (var i = length - 1; i >= 0; i--) {
    for (var j = 1; j <= i; j++) {
      if (list[j - 1].first_name > list[j].first_name) {
        var aux = list[j - 1];
        list[j - 1] = list[j];
        list[j] = aux;
      }
    }
  }
  return list;
}

function sortBylast_name(list) {
  var length = list.length;

  for (var i = length - 1; i >= 0; i--) {
    for (var j = 1; j <= i; j++) {
      if (list[j - 1].last_lane < list[j].last_lane) {
        var aux = list[j - 1];
        list[j - 1] = list[j];
        list[j] = aux;
      }
    }
  }
  return list;
}

function sortByEmail(list) {
  var length = list.length;

  for (var i = length - 1; i >= 0; i--) {
    for (var j = 1; j <= i; j++) {
      if (list[j - 1].email > list[j].email) {
        var aux = list[j - 1];
        list[j - 1] = list[j];
        list[j] = aux;
      }
    }
  }
  return list;
}
// pintar las filas cuando se pasa el mouse
let rows = document.querySelectorAll("tr");
rows.forEach((element) => {
  element.addEventListener("mouseover", function () {
    ChangeBackgroundColor(element);
  });
  element.addEventListener("mouseout", function () {
    RestoreBackgroundColor(element);
  });
});

function ChangeBackgroundColor(row) {
  row.style.backgroundColor = "#9999ff";
}
function RestoreBackgroundColor(row) {
  row.style.backgroundColor = "#ffffff";
}

//Eliminar fila

let buttons = document.querySelectorAll("button");
console.log(buttons);
table = document.getElementById("tabla2");
for (let i = 0; i < buttons.length - 2; i++) {
  if (i + 1 === buttons.length) {
    buttons[i].addEventListener("click", function () {
      table.deleteRow(i);
    });
  }
  buttons[i].addEventListener("click", function () {
    table.deleteRow(i + 1);
  });
}

// eliminar todas las filas
let elminarTodo = document.getElementById("EliminarTodo");
console.log(elminarTodo);
elminarTodo.addEventListener("click", function () {
  if (getConfirmation()) {
    table.remove();
  }
});

function getConfirmation() {
  var retVal = confirm("Seguro que quiere borrar todo ?");
  if (retVal == true) {
    return true;
  } else {
    return false;
  }
}
