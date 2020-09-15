var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const fs = require("fs");
const Joi = require("joi");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const { send } = require("process");
const { json } = require("express");

var app = express();
app.use(express.json());
/**
 * Get todos
 */
app.get("/chat/api/mensajes", (req, res) => {
  fs.readFile("./JSON/message.json", "utf8", function readFile(err, data) {
    if (err) {
      console.log(err);
    } else {
      //now it an object
      res.send(JSON.parse(data));
    }
  });
});

/**
 * Get por ts
 */

app.get("/chat/api/mensajes/:ts", (req, res) => {
  fs.readFile("./JSON/message.json", "utf8", function readFile(err, data) {
    if (err) {
      console.log(err);
    } else {
      let obj = JSON.parse(data);
      let messages = obj.messages;
      let msg = messages.find((c) => c.ts === parseInt(req.params.ts));
      if (!msg) {
        res.send(
          "No se ha encontrado el mensaje que busca con ts: " + req.params.ts
        );
      } else {
        res.send(msg);
      }
    }
  });
});
/**
 * Funcion para agregar un nuevo mensaje por post
 */
app.post("/chat/api/mensajes", (req, res) => {
  const schema = Joi.object({
    message: Joi.string().min(5).required(),
    author: Joi.string().required(),
    ts: Joi.required(),
  });
  const { error } = schema.validate(req.body);
  if (error) res.send(error);
  else {
    fs.readFile("./JSON/message.json", "utf8", function readFile(err, data) {
      if (err) {
        console.log(err);
      } else {
        let nuevo = {
          message: req.body.message,
          author: req.body.author,
          ts: parseInt(req.body.ts),
        };

        obj = JSON.parse(data);
        obj.messages.push(nuevo);
        fs.writeFileSync("./JSON/message.json", JSON.stringify(obj));
        res.send("Se ha agregado el nuevo mensaje" + JSON.stringify(nuevo));
      }
    });
  }
});

/**
 * editar un mensaje
 */
app.put("/chat/api/mensajes/:ts", (req, res) => {
  fs.readFile("./JSON/message.json", "utf8", function readFile(err, data) {
    if (err) {
      console.log(err);
    } else {
      let obj = JSON.parse(data);
      let messages = obj.messages;
      let msg = messages.find((c) => c.ts === parseInt(req.params.ts));

      if (!msg) {
        res.send(
          "No se ha encontrado el mensaje que busca con ts: " + req.params.ts
        );
      } else {
        const schema = Joi.object({
          message: Joi.string().min(5).required(),
          author: Joi.string().required(),
          ts: Joi.required(),
        });

        const { error } = schema.validate(req.body);
        if (error) res.send(error);
        else {
          msg.message = req.body.message;
          msg.author = req.body.author;
          msg.ts = parseInt(req.body.ts);
          fs.writeFileSync("./JSON/message.json", JSON.stringify(obj));
          res.send("Se ha actualizado el  mensaje" + JSON.stringify(msg));
        }
      }
    }
  });
});
/**
 * eliminar mensaje
 */
app.delete("/chat/api/mensajes/:ts", (req, res) => {
  fs.readFile("./JSON/message.json", "utf8", function readFile(err, data) {
    if (err) {
      console.log(err);
    } else {
      let obj = JSON.parse(data);
      let messages = obj.messages;
      let msg = messages.find((c) => c.ts === parseInt(req.params.ts));
      if (!msg) {
        res.send(
          "No se ha encontrado el mensaje que quiere borrar con ts: " +
            req.params.ts
        );
      } else {
        const index = messages.indexOf(msg);
        messages.splice(index, 1);
        fs.writeFileSync("./JSON/message.json", JSON.stringify(obj));
        res.send("Se ha borrado el mesaje con ts: " + req.params.ts);
        res.send(JSON.stringify(msg));
      }
    }
  });
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

module.exports = app;
