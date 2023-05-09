var player1, stage, player2, att;
var playerSpeed = 5;
//damage percentage
var p1per = 0, p2per = 0;
var idleSet =[];
var moveSet = [];
var slideSet = [];
var jumpCount1 = 2;
var jumpCount2 = 2;
var timer1 = 0, timer2 = 0, attTimer1 = 0, attTimer2 = 0;
var p1stun = 0, p2stun = 0;
//player direction state pos = right neg = left
var direction1 = 1, direction2 = 1;


function preload() {
    idleSet = loadStrings("./images/idle/idle.txt");
    moveSet = loadStrings("./images/move/walk.txt");
    slideSet = loadStrings("./images/slide/slide.txt");

}

function setup() {
    createCanvas(800,500);
    allSprites.autoCull = false;
    world.gravity.y = 24;
    //player 1
    player1 = new Sprite();

    player1.addAni("idle", idleSet);
    player1.addAni("move", moveSet);
    player1.addAni("slide", slideSet);
    player1.pos = {x: 200, y: 360};
    player1.scale = .2;
    player1.h = 85;
    player1.health = 3;
    player1.collider = 'dynamic';
    player1.friction = 20;
    player1.drag = 10;
    player1.mass = 200;
    //player 2
    player2 = new Sprite();

    player2.addAni("idle", idleSet);
    player2.addAni("move", moveSet);
    player2.addAni("slide", slideSet);
    player2.pos = {x: 600, y: 360};
    player2.scale = .2;
    player2.h = 85;
    player2.health = 3;
    player2.collider = 'dynamic';
    player2.mirror.x = true;
    player2.friction = 20;
    player2.drag = 10;
    player2.mass = 200;
    //stage
    stage = new Sprite();
    stage.y = 400;
    stage.w = 600;
    stage.h = 50;
    stage.collider = 'static';
    
    att1 = new Sprite();
    att1.pos = {x: 1000, y: 1000};
    att1.r = 15;
    att1.color = 'red';

    att2 = new Sprite();
    att2.pos = {x:-1000, y: -1000}
    att2.r = 15;
    att2.color = 'blue';
    
}

function draw() {
    background(210);
    movementHandlerP1();
    if(p2stun <=0) {
        movementHandlerP2();
    }
    console.log(p2stun);

    attackRegister();

    attackP1();
    attackP2();

    playerTitles();
    
    attackRemover();
    
    player1.rotation = 0;
    player2.rotation = 0;

    if(player1.collides(stage)) {
        jumpCount1 = 2;
    }
    if(player2.collides(stage)) {
        jumpCount2 = 2;
    }

    timer1++;
    timer2++;
    if(p2stun >0) {
        p2stun--;
    }
    if(p1stun >0) {
        p1stun--;
    }
    winState();
    attTimer1--;
    attTimer2--;


    console.log(player2.mirror.x);
}

function movementHandlerP1 () {

    if (kb.pressing('d')) {
        player1.ani = "move";
        player1.vel.x = +playerSpeed;
        player1.mirror.x = false;
        player1.ani.loop;
        
        
    }
    else if (kb.pressing('a')) {
        player1.ani = "move";
        player1.vel.x = -playerSpeed;
        player1.mirror.x = true;
        player1.ani.loop;
        
    }
    else {
        
    }

    //jump system
    if (kb.presses('w')&& jumpCount1 >0 ) {
        player1.ani = "move";
        player1.vel.y = -10;
        player1.ani.loop;
        //handles double jump
        jumpCount1 -=1;
    }
    else if (kb.pressing('s')) {
        player1.ani = "slide";
        player1.vel.y = +playerSpeed;
        player1.ani.loop;
    }
    else {
        
        
    }
    if(!kb.pressing('d') && !kb.pressing('a') && !kb.pressing('w')&& !kb.pressing('s')) {
        player1.ani = "idle";
        player1.ani.loop;

    }
    

}

function movementHandlerP2 () {
    
    if (kb.pressing('l')) {
        player2.ani = "move";
        player2.vel.x = +playerSpeed;
        player2.mirror.x = false;
        player2.ani.loop;
        
    }
    else if (kb.pressing('j')) {
        player2.ani = "move";
        player2.vel.x = -playerSpeed;
        player2.mirror.x = true;
        player2.ani.loop;
    }
    else {
        
    }
    if (kb.presses('i')&& jumpCount2 >0 ) {
        player2.ani = "move";
        player2.vel.y = -10;
        player2.ani.loop;
        jumpCount2 -=1;
    }
    else if (kb.pressing('k')) {
        player2.ani = "slide";
        player2.vel.y = +playerSpeed;
        player2.ani.loop;
    }
    else {
        
    }
    if(!kb.pressing('l') && !kb.pressing('j') && !kb.pressing('i')&& !kb.pressing('k')) {
        player2.ani = "idle";
        player2.ani.loop;

    }
    

}



function attackP1() {
    
    
    if(kb.presses('space') && (kb.pressing('d') || kb.pressing('a')) && attTimer1 < 0) {
        if(player1.mirror.x == true) {
            direction1 = -1;
        }
        att1.x = player1.x + 10 * direction1;
        att1.y = player1.y;
        att1.vel.x = 30 * direction1;
        att1.vel.y = 0;
        att1.r = 30;
        timer1 = 0;
        attTimer1 = 45;
        direction1 = 1;
        damage1 = 5
    }
    if(kb.presses('space') && attTimer1 < 0) {
        if(player1.mirror.x == true) {
            direction1 = -1;
        }
        att1.x = player1.x + 10 * direction1;
        att1.y = player1.y;
        att1.vel.x = 10 * direction1;
        att1.vel.y = 0;
        att1.r = 15;
        //timer for att sprite to disapear
        timer1 = 0;
        //timer between inputs
        attTimer1 = 30;
        direction1 = 1;
        damage1 = 10;
    } 
    
}

function attackP2() {

    if(kb.presses('Enter') && (kb.pressing('l') || kb.pressing('j')) && attTimer2 < 0) {
        if(player2.mirror.x == true) {
            direction2 = -1;
        }
        att2.x = player2.x + 10 * direction2;
        att2.y = player2.y;
        att2.vel.x = 30 * direction2;
        att2.vel.y = 0;
        att2.r = 30;
        timer2 = 0;
        attTimer2 = 45;
        direction2 = 1;
        damage2 = 5
    }
    if(kb.presses('Enter') && attTimer2 < 0) {
        if(player2.mirror.x == true) {
            direction2 = -1;
        }
        att2.x = player2.x + 10 * direction2;
        att2.y = player2.y;
        att2.vel.x = 10 * direction2;
        att2.vel.y = 0;
        att2.r = 15;
        timer2 = 0;
        attTimer2 = 30;
        direction2 = 1;
    } 
}

function attackRemover() {
    //removes attack objects
    if (timer1 == 5) {
        att1.pos = {x: 5100, y: -100};
    }
    if (timer2 == 5) {
        att2.pos = {x: 5100, y: -100};
    }
}

function attackRegister() {
    if(att1.collides(player2)) {
        p2per += damage1;
        p2stun += 1 * (p2per /2);
        player2.vel.x = 1 * p2per;
        player2.vel.y = -.1 * p2per;
        if(jumpCount1 < 2) {
            jumpCount1 + 1;
        }
        attTimer1 = 0;
    }
    if (att2.collides(player1)) {
        p1per += damage2;
        p1stun += 1 * (p1per /2);
        player1.vel.x = -1 * p1per;
        player1.vel.y = -.1 * p1per;
        if(jumpCount2 < 2) {
            jumpCount2 + 1;
        }
        attTimer2 = 0;
    }
}
//text that handles 
function winState(){
    textSize(50);
    if(player1.y > height + 50) {
        p1stun = 400000;
        text('Player 2 wins!', 250, 250);
    }
    else if(player2.y > height + 50) {
        p2stun = 400000;
        text('Player 1 wins!', 250, 250);
    }
}
//text that is always visible
function playerTitles() {
    textSize(10);
    text("Player 1", player1.x - 10, player1.y - 60);
    text("Player 2", player2.x - 10, player2.y - 60);
    textSize(30);
    text("Player 1: " + p1per, 100, 100);
    text("Player 2: " + p2per, 600, 100);
}