
var circleX = 100;
var circleY = 50;
var choices = [0.1, 0.5, 1.0, 1.5, 2.0, 3.0, 4.0, 5.0, 8.0];
var xChange = 0;
var yChange = 0;
var intendX = 0;
var intendY = 0;
var circleR = 25;
var click = false;
var directionX = 1;
var directionY = 1;
var displayText = false;
var cheeseX = 0;
var moveCheese = 5;
var intendCheese = 0;
var directionCheese = 1;
var image1, image2, image3, font1;
var timeRunning = 0;
var intendT = 15;
var timeMult;

function preload() {
    image1 = loadImage("/images/cheesecake-cat.jpeg");
    image2 = loadImage("/images/cat-portrait.png");
    image3 = loadImage("/images/clock.png");
    font1 = loadFont("/fonts/Cabin-Regular.ttf");

}

function setup() {
  createCanvas(600, 400);
  xChange = random(choices);
  yChange = random(choices);
  intendX = xChange;
  intendY = yChange;
  intendCheese = moveCheese;
  setInterval(timeIncrease, 100);
  timeMult = intendT * 100;
}

function draw() {
    FirstImage();
  
  
  
  cheeseCake();
  
  circleTeal();
  
  pauseText();

  secondImage();

  thirdImage();

  timeIncrease();
  
  //static text
  fill('black');
  textSize(12);
  textFont(font1);
  text('Cheesecake Bounce: Click to pause, refresh to randomize', 2, 25);
  text('By: Cora', (width - 60), (height-10) );
  
}

function FirstImage() {
    background(image1);
}
function secondImage(){
   image(image2, width - 100, height - 50, 50, 50);
}
function thirdImage(){
    fill('white');
    rect(0, height/2, timeRunning * (width/timeMult), 20);
    image(image3, (timeRunning * (width/timeMult))-10, height/2 - 12 ,50,50);
    
}

function timeIncrease() {
    if(timeRunning * (width/timeMult-10) <= width) {
    timeRunning++;
    }
}
function pauseText() {
  if (displayText == true) {
    textSize(100);
    text('Pause', 50,200);
  
  }
  else {
    fill('white');
}}
function circleTeal() {
  fill(0, 127.5, 127.5);
  circle(circleX, circleY , circleR);
  if(circleX >= width - (circleR/2) || circleX <= (circleR/2) ) {
    xChange *= -1;
    directionX *= -1;
  }
  circleX+= xChange;
  if(circleY >= height - (circleR/2) || circleY <= (circleR/2) ) {
    yChange *= -1;
    directionY *= -1;
  }
  circleY+= yChange;
}
function cheeseCake() {
  //crust
  fill("rgb(141,110,72)");
  quad( 250 + cheeseX, 180, 250 + cheeseX, 325, 100 + cheeseX, 300, 100 + cheeseX, 200);
  quad(250 + cheeseX, 180, 250 + cheeseX, 325, 300 + cheeseX, 310, 300 + cheeseX, 190)
  //cheesecake
  fill("rgb(255,248,220)");
  quad( 240 + cheeseX, 180, 240 + cheeseX, 315, 100 + cheeseX, 290, 100 + cheeseX, 200);
  if (cheeseX >= width-300 || cheeseX <= -100) {
    moveCheese *= -1;
    directionCheese *= -1;
  }
  cheeseX += moveCheese;
}
function mouseClicked() {
  if (click == false) {
    click = true;
    xChange = 0;
    yChange = 0;
    moveCheese = 0;
    fill(0,0,0);
    displayText = true;
  }
  else {
    click = false;
    xChange = intendX * directionX;
    yChange = intendY * directionY;
    moveCheese = intendCheese * directionCheese;
    displayText = false;
  }
}