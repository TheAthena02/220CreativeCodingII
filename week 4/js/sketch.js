idleCatFrames = [];
var catObject, orange, currentImage;
var i = 0;
var j = 0;

function preload() {
idleCatFrames = loadStrings("../images/idle/idle.txt");
}
function setup() {
    createCanvas(800,800);
    setInterval(increaseIndex, 50);

    catObject = new imageLoader(idleCatFrames);
    catObject.animate();

    orange = new fruitClass("orange", 30, width, height);
}
function draw() {
    background(220);
    catObject.draw(i);
    orange.draw();
}

function increaseIndex() {
    i++;
    if (i > 9) {
        i = 0;
    }
}