console.log("node is running");

let express = require("express");

let socket = require("socket.io");

let app = express();

let port = 3000;

let server = app.listen(port);

app.use(express.static("public"));

let io = socket(server);

io.on("connection", newConnection);

function newConnection(socket){
	console.log("new connection: " + socket.client.id);
  socket.on("mouse", mouseMessage);
  let clientColor = getRandomColor();
  socket.emit("color", clientColor);

  function mouseMessage(dataReceived){

    console.log(socket.client.id, dataReceived);

    socket.broadcast.emit("mouseBroadcast", dataReceived);

  }

  function getRandomColor (){
    var letters = "0123456789ABCDEF";
    var color = "#";
    for(var i=0; i<6; i++){
      color += letters[Math.floor(Math.random()*16)];
    }
    return color;
  }
}
