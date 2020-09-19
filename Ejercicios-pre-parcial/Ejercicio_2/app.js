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

document.write(`<table  id = "tabla2" class="table-striped">
                 <tr>
                 <th id="nombre"> Nombre</th>
                 <th id="Apellido"> Apellido</th>
                 <th id="Email">Email</th>
                 <th id="foto">Foto</th>
                 </tr>`);
let contador = 0;
jsonObject.forEach((element) => {
  document.write(`<tr id="R${contador}">
          <td id ="N${contador}">${element.first_name} </td>
          <td id ="A${contador}"> ${element.last_lane} </td>
          <td id="E${contador}">${element.email} </td>
          <td id="F${contador}"><img src="${element.photo}" alt=""> </td>
          </tr>`);
  contador++;
});
document.write("</table>");

// ordernar por nombre
let nombreCell = document.getElementById("nombre");
nombreCell.addEventListener("click", function () {
  let ordenada = sortByName(jsonObject);
  contador = 0;
  ordenada.forEach((element) => {
    let name = document.getElementById("N" + contador);
    let last = document.getElementById("A" + contador);
    let email = document.getElementById("E" + contador);
    let photo = document.getElementById("F" + contador);
    //email.replaceWith(element.email);
    //photo.replaceWith(element.photo);
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
    //email.replaceWith(element.email);
    //photo.replaceWith(element.photo);
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
    //email.replaceWith(element.email);
    //photo.replaceWith(element.photo);
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
