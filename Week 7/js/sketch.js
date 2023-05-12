var idleCatFrames = [], moveCatFrames = [];
var catIdle, catMove, orange, currentImage;
var i = 0, j = 0;
var x = 100;
var y = 200;
var dir = 1;
var speedY = -3;
var speedX = 3;
let pressedKeys = {};
fruits = [];
var col = false;
let createFruit = false;
var badFruits = [];
var newButton;
var count =0;
var bgSound, badSound, goodSound;
var disButton = true;

function preload() {
idleCatFrames = loadStrings("../images/idle/idle.txt");
moveCatFrames = loadStrings("../images/move/walk.txt"); 
bgSound = loadSound("../sounds/birds.wav");
badSound = loadSound("../sounds/gurgle.mp3");
goodSound = loadSound("../sounds/eat.mp3");
//imageMode(CENTER);
}
function setup() {
    createCanvas(800,800);
    setInterval(increaseIndex, 50);

    catIdle = new imageLoader(idleCatFrames);
    catIdle.animate();
    catMove = new imageLoader(moveCatFrames);
    catMove.animate();

    fruits[0] = new fruitClass("orange", true, 30, random(200,770), random(200,770));

    addBad();

    myButton = new Button({
		x: width / 2,	y: height / 2,
		width: 100,		height: 50,
		align_x: 0,		align_y: 0,
		content: 'Play',
		on_press() {
            
			bgSound.loop();
            disButton = false;
		}
	});
}
function draw() {
    background(220);
    if(keyIsPressed) {
        
        if((pressedKeys.d && pressedKeys.w) || (pressedKeys.d && pressedKeys.s)) {
            x+= speedX;
            if(pressedKeys.w) {
                y += speedY;    
            }
            else if(pressedKeys.s) {
                y -= speedY;
            }
            catMove.draw(i, x, y);
        }
        else if(pressedKeys.d) {
            x+= speedX;
            catMove.draw(i, x, y);
        }
        
        else if((pressedKeys.a && pressedKeys.w) || (pressedKeys.a && pressedKeys.s)) {
            x-= speedX;
            if(pressedKeys.w) {
                y += speedY;    
            }
            else if(pressedKeys.s) {
                y -= speedY;
            }
            push();
            translate(150,0);
            scale(-1,1);
            catMove.draw(i, -x, y);
            pop();
        }
        else if(key == 'a') {
            x-= speedX;
            push();
            translate(150,0);
            scale(-1,1);
            catMove.draw(i, -x, y);
            pop();
        }
        else if(key == 'w') {
            y += speedY;
            catMove.draw(i, x, y);
        }
        else if(key == 's') {
            y -= speedY;
            catMove.draw(i, x, y);
        }
        else {
            catIdle.draw(i, x, y);
        }
    }
    else{
        //console.log(i, x, y);
        catIdle.draw(i, x, y);
    }
    
    for(var b = 0; b < fruits.length; b++) {
        //console.log(fruits.length, fruits[b].x);
        if(fruits[b].show == true) {
            fruits[b].draw();
        }
        
    }
    for(var b = 0; b < badFruits.length; b++) {
        //console.log(fruits.length, fruits[b].x);
        if(badFruits[b].show == true) {
            badFruits[b].draw();
        }
        
    }
    collisionCheck();
    collisionBad();
    score();
    if (disButton) {
        myButton.draw();

    }
}
function keyPressed() {
    pressedKeys[key] = true;
  }
  
  function keyReleased() {
    delete pressedKeys[key];
  }

function collisionCheck() {
    for(var b = 0; b < fruits.length; b++) {
        //console.log(b);
        col = collideRectCircle(x, y, 150,200, fruits[b].x, fruits[b].y, fruits[b].r);
        //console.log(fruits[b].y);
        createFruit = false;
        if (col) {
            createFruit = true;
            fruits[b].x = 2000;
            goodSound.playMode('untilDone');
            goodSound.play();

        }
        if(createFruit == true && fruits[b].show == true) {
            
            addFruit();
            createFruit = false;
        }
        if (col) {
            fruits[b].show = false;
            
        }

    }
    
}
function collisionBad() {
    for(var b = 0; b < badFruits.length; b++) {
        //console.log(b);
        col = collideRectCircle(x, y, 150,200, badFruits[b].x, badFruits[b].y, badFruits[b].r);
        //console.log(fruits[b].y);
        createFruit = false;
        if (col) {
            createFruit = true;
            badFruits[b].x = 2000;
            badSound.playMode('untilDone');
            badSound.play();
        }
        if(createFruit == true && badFruits[b].show == true) {
            addBad();
            createFruit = false;
        }
        if (col) {
            badFruits[b].show = false;
        }

    }
    
}
function addFruit() {
    fruits.push(new fruitClass("orange", true, 30, random(30,770), random(30,770)));

}
function addBad() {
    badFruits.push(new fruitClass("green", true, 25, random(30,770), random(30,770)));
}


function score() {
    fill("black");
    textSize(30);
    text(fruits.length - badFruits.length, 30, 40);
}
function increaseIndex() {
    i++;
    if (i > 9) {
        i = 0;
    }
}