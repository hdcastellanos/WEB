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

let contador = 0;
jsonObject.forEach((element) => {
  document.write(`<div class="card" style="width: 18rem">
  <img class="card-img-top" src="${element.photo}" alt="Card image cap" />
  <div class="card-body">
    <p class="card-text">nombre: ${element.first_name}</p>
    <p class="card-text">Apellido:${element.last_lane}</p>
    <p class="card-text">email:${element.email}</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>
<br>`);
  contador++;
});

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

let rows = document.querySelectorAll("tr");
rows.forEach((element) => {
  element.addEventListener("mouseover", function () {
    ChangeBackgroundColor(element);
    console.log(rows);
  });
  element.addEventListener("mouseout", function () {
    RestoreBackgroundColor(element);
  });
});

// Specify the normal table row background color
//   and the background color for when the mouse
//   hovers over the table row.

// These two functions need no customization.
function ChangeBackgroundColor(row) {
  row.style.backgroundColor = "#9999ff";
}
function RestoreBackgroundColor(row) {
  row.style.backgroundColor = "#ffffff";
}
