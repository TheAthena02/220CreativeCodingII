var idleSet =[];
var moveSet = [];
var slideSet = [];
var x = 200, y = 200;
var playerSpeed = 3;
var spriteTemp;
let objectArr;
let fruit, fruitB;
var gameOver = false;
var score = 0;
var life = 3;
function preload() {

    idleSet = loadStrings("./images/idle/idle.txt");
    moveSet = loadStrings("./images/move/walk.txt");
    slideSet = loadStrings("./images/slide/slide.txt");
    
}


function setup() {
    createCanvas(800,600);
    


    //player sprite creation
    player = new Sprite(); 

    player.addAni("idle", idleSet);
    player.addAni("move", moveSet);
    player.addAni("slide", slideSet);
    player.pos = {x: 200, y: 200};
    player.scale = .3;
    player.health = 1;



    //barrier creation
    objectArr = new Group();
    for (var i = 0; i <= 3; i++) {
        spriteTemp = new objectArr.Sprite(random(0,800), random(0,600), 50, 50,  'static');
        
    }

    fruit = new Sprite(random(0,800), random(0,600), 50,  'static');
    fruit.color = "red";

    fruitB = new Sprite(random(0,800), random(0,600), 50,  'static');
    fruitB.color = "green";
    
}

function draw() {
    background(120);
    gameStateHandler();
    player.ani = "idle";
    
    scoreDisplay();
    if(!gameOver) {
        movementHandler();
        goodFood();
        badFood();
    }
    
    
    player.rotation = 0;
    
    
}

function movementHandler () {

    if (kb.pressing('d')) {
        player.ani = "move";
        player.vel.x = +playerSpeed;
        player.mirror.x = false;
        player.ani.loop;
        
    }
    else if (kb.pressing('a')) {
        player.ani = "move";
        player.vel.x = -playerSpeed;
        player.mirror.x = true;
        player.ani.loop;
    }
    else {
        player.vel.x = 0;
    }
    if (kb.pressing('w')) {
        player.ani = "move";
        player.vel.y = -playerSpeed;
        player.ani.loop;
    }
    else if (kb.pressing('s')) {
        player.ani = "move";
        player.vel.y = +playerSpeed;
        player.ani.loop;
    }
    else {
        
        player.vel.y = 0;
    }
    if(!kb.pressing('d') && !kb.pressing('a') && !kb.pressing('w')&& !kb.pressing('s')) {
        player.ani = "idle";
        player.ani.loop;

    }
    

}

function goodFood() {
    if(fruit.collides(player)) {
        score += 1;
        fruit.pos = {x: random(0,800), y: random(0,600)};
        
    }

}
function badFood() {
    if(fruitB.collides(player)) {
        life -= 1;
        fruitB.pos = {x: random(0,800), y: random(0,600)};
    }
}

function gameStateHandler() {
    if (score >= 10) {
        gameOver = true;
        fill('white');
        textAlign("center");
        textSize(30);
        text("Win!", width / 2, height / 2);
        player.vel.x = 0;
        player.vel.y = 0;
    }

    else if (life <= 0) {
        gameOver = true;
        fill('white');
        textAlign("center");
        textSize(30);
        text("You Lose!", width / 2, height / 2);
        player.vel.x = 0;
        player.vel.y = 0;
    }
}

function scoreDisplay() {
    fill('white');
    textSize(30);
    textAlign("left");
    text("score: " + score + "        " + "life: " + life, 30, 30);
}

