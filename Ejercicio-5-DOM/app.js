
let url = document.getElementById("url");
console.log(url.textContent);

let promise1 = new Promise((resolve, reject) => { 
    let req1 = new XMLHttpRequest();
      
    req1.open("GET",url.textContent);
    req1.onload = () => {
     if (req1.status === 200){
     
       resolve(JSON.parse(req1.response));
       
       
     }
      else{
      console.log("error");
      }};
      req1.send();
    });
    promise1.then( response => {
        let list = response;
        firstTable(list);
        FindCorr(list);
        
        
})
// muestra la primera tabla
function firstTable(list){
    let table = document.getElementById("events");
    let number=1;
list.forEach(element => {
 
let events = element.events;
let result = element.squirrel;

var row = table.insertRow(number);
if (result === true){
    row.style.backgroundColor = "red";
}
var cell1 = row.insertCell(0);
var cell2 = row.insertCell(1);
var cell3 = row.insertCell(2);

cell1.innerHTML = number;
cell2.innerHTML = events;
cell3.innerHTML = result;
number ++;


});
}
// muestra la segunda tabla y hace todo lo necesario para encontrar la correlación
function FindCorr(list){
let listEvents = [];


list.forEach(element => {
  element.events.forEach(element1 => {
   
   
     if (buscar(listEvents,element1) === false){
         listEvents.push({"NAME":element1,"TN":0,"FN":0,"FP":0,"TP":0,"corr":0});
     }
    
      
  });
});

count(listEvents,list);
sort(listEvents)

let table =document.getElementById("corr");
let number=1;
listEvents.forEach(element => {
    var row = table.insertRow(number);
    var cell1 = row.insertCell(0);
var cell2 = row.insertCell(1);
var cell3 = row.insertCell(2);

cell1.innerHTML = number;
cell2.innerHTML = element.NAME;
cell3.innerHTML = element.corr;
number ++;
})

}

//cuenta los FP,TP... de cada evento , encuentra su correlación y organiza la lista
function count (listEvents,list){

    
    listEvents.forEach( element => {
    list.forEach(complete => {
        let TheList = complete.events;
        let palabra = element.NAME;
        let result = complete.squirrel;
          
       if ((buscar2(TheList,palabra) === false)  && (result === false) ){
           element.TN ++;
       }
       else if ((buscar2(TheList,palabra) === true) && (result === false)  ){
           element.FN ++;
       }
       
       else if((result === true) && (buscar2(TheList,palabra) === false) ) {
        element.FP ++;
      }
       else  {
        element.TP ++;
      }
     
      
 
    })
element.corr = ((element.TP*element.TN ) - (element.FP*element.FN))/(Math.sqrt((element.TP+element.FP)*(element.TP+element.FN)*(element.TN+element.FP)*(element.TN+element.FN)));
})
 console.log(listEvents);
}

// buscar para encontrar los eventos 
function buscar(list,palabra){
    let result = false;
    list.forEach(element => {
        if (element.NAME === palabra )
        {
            result = true;
        }
       
    });
    
    return result;
}
// buscar para contar los FP, TP ... para cada evento
function buscar2(list,palabra){
    let result = false;

    list.forEach(element => {
        console.log(element,palabra)
        if (element === palabra )
        {
            result = true;
        }
    });
    return result;
}
// funcion para organizar la lista en base a la correlaciones
function sort(list){
    
      var length = list.length;
      
     
      for (var i = length-1; i >= 0; i--){
        
         for(var j = 1; j <= i; j++){
            
             if(list[j-1].corr < list[j].corr){
                 var aux = list[j-1];
                 list[j-1] = list[j];
                 list[j] = aux;
              }
         }
      }
      return list;
  }


