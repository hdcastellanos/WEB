const fs = require("fs");
const url = require("url");
const http = require ("http");
const axios = require("axios");
const proveedoresUrl = " https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json";
const clientesUrl = " https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json"





http.createServer((req, res) => {
    var q = url.parse(req.url, true);
    var filename = "." + q.pathname;
    fs.readFile(filename, function(err, data) {
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/html'});
        return res.end("404 Not Found");
      } 
      res.writeHead(200, {'Content-Type': 'text/html'});
      let pagecontent = data.toString(); 
      console.log(filename);
      if(q.pathname === "/Clientes"){
            res.write(pagecontent);
           
           let clientes = axios.get(clientesUrl).then((response => {
               res.write(`<table  id = "clientes "class="table-striped">
               <tr>
               <th> ID</th>
               <th> Compañia</th>
               <th>Contacto</th>
               </tr>`);
           
            response.data.forEach(element => {
                res.write( `
                <tr>
                <td>${element.idCliente} </td>
                <td>${element.NombreCompania} </td>
                <td>${element.NombreContacto} </td>
                </tr>`) ;
            });
            res.write(`</table>`)
           }));
            
           return clientes;
      }
      else {
          res.write(pagecontent);
          let proveedores = axios.get(proveedoresUrl).then((response => {
            res.write(`<table  id = "proveedores "class="table-striped">
            <tr>
            <th> ID</th>
            <th>Compañia</th>
            <th>Contacto</th>
            </tr>`);
        
         response.data.forEach(element => {
             res.write( `
             <tr>
             <td>${element.idproveedor} </td>
             <td>${element.nombrecompania} </td>
             <td>${element.nombrecontacto} </td>
             </tr>`) ;
         });
         res.write(`</table>`)
        }));
         
        return proveedores;
          }
    })
}).listen(8081)