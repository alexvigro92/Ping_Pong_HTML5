let canvas;
let canvasContext;
let fps = 30;
let second = 1000;
let ballX = 50;
let ballY = 50;
ballSpeedX = 10;
ballSpeedY = 5;

window.onload = () => {
  canvas = document.getElementById('canvasGame');
  canvasContext = canvas.getContext('2d');
  setInterval(() => {
    moveEverything();
    drawEverything();
  },second/fps);
}

moveEverything = () => {
  ballX += ballSpeedX;
  ballY += ballSpeedY;
  if(ballX >= (canvas.width-5)){
    ballSpeedX = -ballSpeedX;
  }else if(ballX <= 0){
    ballSpeedX = -ballSpeedX;
  }
  if(ballY >= (canvas.height-5)){
    ballSpeedY = -ballSpeedY;
  }else if(ballY <= 0){
    ballSpeedY = -ballSpeedY;
  }
}

drawEverything = () => {
  //this line draws the space for the game
  colorGame(0,0,canvas.width,canvas.height,'black');

  //this line draws the paddle
  colorGame(10,210,10,100,'white');

  //this line draws the ball
  colorBall(ballX,ballY,5,'white')
}

colorBall = (leftX,topY,width,color) => {
  canvasContext.fillStyle = color;
  canvasContext.beginPath();
  canvasContext.arc(leftX,topY,width,0,Math.PI*2,true);
  canvasContext.fill();
}

colorGame = (leftX,topY,width,height,color) =>{
  canvasContext.fillStyle = color;
  canvasContext.fillRect(leftX,topY,width,height);
}
