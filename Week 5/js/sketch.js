var idleCatFrames = [], moveCatFrames = [];
var catIdle, catMove, orange, currentImage;
var i = 0, j = 0;
var x = 100;
var y = 200;
var dir = 1;

function preload() {
idleCatFrames = loadStrings("../images/idle/idle.txt");
moveCatFrames = loadStrings("../images/move/walk.txt"); 
//imageMode(CENTER);
}
function setup() {
    createCanvas(800,800);
    setInterval(increaseIndex, 50);

    catIdle = new imageLoader(idleCatFrames);
    catIdle.animate();
    catMove = new imageLoader(moveCatFrames);
    catMove.animate();

    orange = new fruitClass("orange", 30, width, height);
}
function draw() {
    background(220);
    if(keyIsPressed) {
        if(key == 'd') {
            x++;
            catMove.draw(i, x, y);
        }
        else if(key == 'a') {
            x--;
            push();
            translate(catMove.width,0);
            scale(-1,1);
            catMove.draw(i, -x, y);
            pop();
        }
        else {
            catIdle.draw(i, x, y);
        }
    }
    else{
        catIdle.draw(i, x, y);
    }
    
    orange.draw();
}

function increaseIndex() {
    i++;
    if (i > 9) {
        i = 0;
    }
}