const WebSocket = require("ws");
const fs = require("fs");
const writeMessage = (msg) => {
  let currentDate = new Date();
  let time = currentDate.getTime();
  let messages = {
    message: msg,
    author: "Héctor Castellanos",
    ts: time,
  };

  fs.readFile("./JSON/message.json", "utf8", function readFile(err, data) {
    if (err) {
      console.log(err);
    } else {
      obj = JSON.parse(data); //now it an object
      obj.messages.push(messages);
      console.log(obj.messages);
      fs.writeFileSync("./JSON/message.json", JSON.stringify(obj));
    }
  });
};

const clients = [];
const messages = [];

const wsConnection = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    clients.push(ws);
    sendMessages();

    ws.on("message", (message) => {
      messages.push(message);
      sendMessages();
      writeMessage(message);
    });
  });

  const sendMessages = () => {
    clients.forEach((client) => client.send(JSON.stringify(messages)));
  };
};

exports.wsConnection = wsConnection;
