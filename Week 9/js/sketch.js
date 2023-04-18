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
var tempX = 0;
var tempY = 0;
var particle;
//var life = 3;
let smoke;
function preload() {

    idleSet = loadStrings("./images/idle/idle.txt");
    moveSet = loadStrings("./images/move/walk.txt");
    slideSet = loadStrings("./images/slide/slide.txt");
    
}


function setup() {
    createCanvas(800,600);
    allSprites.autoCull = false;


    //player sprite creation
    player = new Sprite(); 

    player.addAni("idle", idleSet);
    player.addAni("move", moveSet);
    player.addAni("slide", slideSet);
    player.pos = {x: 200, y: 200};
    player.scale = .3;
    player.health = 3;



    //barrier creation
    objectArr = new Group();
    for (var i = 0; i <= 3; i++) {
        spriteTemp = new objectArr.Sprite(random(0,800), random(0,600), 50, 50,  'static');
        
    }
    //fruit creation
    fruit = new Group();
    fruit.x = () => random(0, canvas.w);
	fruit.y = () => random(0, canvas.h);
    fruit.d = 50;
    fruit.collider = 'kinematic';
    fruit.color = "red";
    //fruit.health = 3;
    fruit.amount = 5;
    //bad fruit creation
    fruitB = new Group();
    fruitB.x = () => random(0, canvas.w);
	fruitB.y = () => random(0, canvas.h);
    fruitB.d = 50;
    fruitB.collider = 'kinematic';
    fruitB.color = "green";
    fruitB.amount = 3;
    

    
    //collison connection
    player.collide(fruit, goodFood);

    player.collide(fruitB, badFood);
 
}

function draw() {
    background(120);
    gameStateHandler();
    player.ani = "idle";
    /*
    if(smoke.cull(-200)) {
        new smoke.Sprite();
    }
    */
    scoreDisplay();
    if(!gameOver) {
        movementHandler();
        //goodFood();
        //badFood();
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

function goodFood(player, fruitOne) {
    
    
    
    if(kb.pressing('space')) {
        //fruitOne.health -= 1;
        
        particle = new particleSystem(fruitOne.x, fruitOne.y, "white");
        
        score += 1;
        fruitOne.remove();
        
    } 

}

function badFood(player, fruitOne) {
    
    
    
    if(kb.pressing('space')) {
        //fruitOne.health -= 1;
        
        particle = new particleSystem(fruitOne.x, fruitOne.y, "lime");
        
        player.health -= 1;
        fruitOne.remove();
        
    } 

}

function gameStateHandler() {
    if (score >= 5) {
        gameOver = true;
        fill('white');
        textAlign("center");
        textSize(30);
        text("Win!", width / 2, height / 2);
        player.vel.x = 0;
        player.vel.y = 0;
    }

    else if (player.health <= 0) {
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
    text("score: " + score + "        " + "life: " + player.health, 30, 30);
}

