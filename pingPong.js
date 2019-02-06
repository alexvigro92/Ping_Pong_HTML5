let canvas;
let canvasContext;
let fps = 30;
let second = 1000;
let ballX = 50;
let ballY = 50;
let ballSpeedX = 10;
let ballSpeedY = 5;

let paddleSpace = 10;
let paddleWidth = 10;
let movePaddleButton = 30;

let paddlePlayerY = 10;
let paddleHeight = 100;

let paddle2PlayerY = 10;
let paddle2Height = 100;
let paddle2Limit = 25;

let playerWins = false;

let playerScore = 0;
let player2Score = 0;

const WINNING_SCORE = 1;

window.onload = () => {
  canvas = document.getElementById('canvasGame');
  canvasContext = canvas.getContext('2d');
  setInterval(() => {
    moveEverything();
    drawEverything();
  },second/fps);

  canvas.addEventListener('mousemove', (event) => {
    let mousePos = calculateMousePaddle(event);
    paddlePlayerY = mousePos.y - (paddleHeight/2);
  });

  window.addEventListener('keydown',(event) => {
    let keyPressedPos = calculateKeyPaddle(event.key);
    paddlePlayerY = paddlePlayerY + keyPressedPos;
  },false);

  window.addEventListener('click',(event) => {
    if(playerWins) {
      playerWins = false;
      playerScore = 0;
      player2Score = 0;
    }
  },false);
}

resetBall = () => {
  verifyScore();
  ballSpeedX = -ballSpeedX;
  ballX = canvas.width/2;
  ballY = canvas.height/2;
}

calculateMousePaddle = (event) => {
   let rect = canvas.getBoundingClientRect();
   let root = document.documentElement;
   let mouseX = event.clientX - rect.left - root.scrollLeft;
   let mouseY = event.clientY - rect.top - root.scrollTop;
   let positionMouse = {
     x: mouseX,
     y: mouseY
   };
   return positionMouse;
}

verifyScore = () =>{
  if (playerScore >= WINNING_SCORE || player2Score >= WINNING_SCORE) {
    playerWins = true;
  }
}

calculateKeyPaddle = (keyPressed) => {
   let rect = canvas.getBoundingClientRect();
   if (keyPressed == 'ArrowDown') {
     return +movePaddleButton;
   }else if(keyPressed == 'ArrowUp') {
     return -movePaddleButton;
   }
}

computerAI = () => {
  let paddle2YMiddle = paddle2PlayerY + (paddleHeight/2)
    if (paddle2YMiddle < ballY-paddle2Limit) {
      paddle2PlayerY += 6;
    }else if(paddle2YMiddle > ballY+paddle2Limit){
      paddle2PlayerY -= 6;
    }
}

drawMiddleLines = () => {
  for (var i = 0; i < canvas.height; i+=30) {
    colorGame(canvas.width/2-1,i,2,20,'white')
  }
}

moveEverything = () => {
  if (playerWins) {
    return;
  }
  computerAI();

  ballX += ballSpeedX;
  ballY += ballSpeedY;
  if(ballX >= (canvas.width-5)){
    playerScore++;
    resetBall();
  }else if(ballX <= 0){
    player2Score++;
    resetBall();
  }else if((ballY > paddlePlayerY) && (ballY < (paddlePlayerY + paddleHeight)) && (ballX == (paddleSpace+paddleWidth))) {
    ballSpeedX = -ballSpeedX;
    let deltaY = ballY - (paddlePlayerY + paddleHeight/2);
    ballSpeedY = deltaY * 0.35;
  }else if((ballY > paddle2PlayerY) && (ballY < (paddle2PlayerY + paddleHeight)) && (ballX == (canvas.width-(paddleSpace+paddleWidth)))) {
    ballSpeedX = -ballSpeedX;
    let deltaY = ballY - (paddle2PlayerY + paddleHeight/2);
    ballSpeedY = deltaY * 0.35;
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

  //verify if a player wins
  if (playerWins) {
    canvasContext.fillStyle = 'white';
    if (playerScore >= WINNING_SCORE){
      canvasContext.fillText("Player 1 won",((canvas.width/2)-50),200)
    }
    else if(player2Score >= WINNING_SCORE){
      canvasContext.fillText("Player 2 won",((canvas.width/2)-50),200)
    }
    canvasContext.fillText("Click to continue",((canvas.width/2)-50),220)
    return;
  }

  //this line draws the lines in the middle
  drawMiddleLines();

  //this line draws the paddle
  colorGame(paddleSpace,paddlePlayerY,paddleWidth,paddleHeight,'white');

  //this line draws the paddle
  colorGame(canvas.width-(paddleSpace+paddleWidth),paddle2PlayerY,paddleWidth,paddle2Height,'white');

  //this line draws the ball
  colorBall(ballX,ballY,5,'white')

  canvasContext.fillText("Player 1",100,100)
  canvasContext.fillText("Player 2",((canvas.width - 150)),100)

  canvasContext.fillText(playerScore,100,120)
  canvasContext.fillText(player2Score,((canvas.width - 150)),120)
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
