let socket = io();
let myColor = 'white';
let myRadius = 20;

socket.on("connect", newConnection);
socket.on("mouseBroadcast", drawOtherMouse);
socket.on("color", setColor);
socket.on("radius", setRadius);


function setColor(assignedColor){

  myColor = assignedColor;

}
function setRadius(assignedRadius){

  myRadius = assignedRadius;

}

function newConnection() {
  console.log("your id:", socket.id);
}


function drawOtherMouse (data){
push();
  fill(data.color);
  noStroke();
  ellipse(data.x, data.y, data.radius);
pop();
}

function preload(){
  // put preload code here
}

function setup() {
  createCanvas(windowWidth,windowHeight)
  // put setup code here
  background('purple');
}

function draw() {
  // put drawing code here
}

function mouseMoved (){
push();
  fill(myColor);
  noStroke();
  ellipse(mouseX, mouseY, myRadius);
  pop();
  let message = {
    x: mouseX,
    y: mouseY,
    color: myColor,
    radius: myRadius,
  }
  socket.emit("mouse", message);
}
