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

document.write(`<table  id = "tabla1"class="table-striped">
               <tr>
               <th> Nombre</th>
               <th> Apellido</th>
               <th>Email</th>
               <th>Foto</th>
               </tr>`);

jsonObject.forEach((element) => {
  document.write(`<tr>
        <td>${element.first_name} </td>
        <td>${element.last_lane} </td>
        <td>${element.email} </td>
        <td><img src="${element.photo}" alt=""> </td>
        </tr>`);
});
document.write("</table>");
