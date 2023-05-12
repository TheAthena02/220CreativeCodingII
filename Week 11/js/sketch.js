var brickImage;
var plantImage;
var metalImage;
var clayImage;
var leatherImage;
function preload() {
    brickImage = loadImage('./images/brick-texture.jpeg');
    plantImage = loadImage('./images/plant-texture.jpeg');
    metalImage = loadImage('./images/metal-texture.jpeg');
    clayImage = loadImage('./images/clay-texture.avif');
    leatherImage = loadImage('./images/leather-texture.jpeg');
}

function setup() {
    createCanvas(800,600,WEBGL);
}

function draw() {
    background(220);
    noStroke();
    push();
    texture(brickImage);
    rotateX(frameCount * .01);
    box(45,45,45);
    pop();

    push();
    texture(plantImage);
    translate(100,100);
    rotateY(frameCount * .01);
    rotateZ(frameCount * .01);
    sphere(40);
    pop();

    push();
    texture(metalImage);
    translate(-100, -100);
    rotateZ(frameCount * .01);
    cone(20,90);
    pop();

    push();
    texture(clayImage);
    translate(-100, 100);
    rotateX(frameCount * .01);
    rotateY(frameCount * .01);
    torus(60,10);
    pop();

    push();
    texture(leatherImage);
    translate(100, -100);
    rotateZ(frameCount * .01);
    rotateX(frameCount * .01);
    cylinder(10,60);
    pop();
}