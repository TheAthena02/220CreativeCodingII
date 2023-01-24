function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  //plate
  fill("white");
  ellipse(200, 300, 300, 100);
  
  //crust
  fill("rgb(141,110,72)");
  quad( 250, 180, 250, 325, 100, 300, 100, 200);
  quad(250, 180, 250, 325, 300, 310, 300, 190)
  //cheesecake
  fill("rgb(255,248,220)");
  quad( 240, 180, 240, 315, 100, 290, 100, 200);
  //"NY"
  fill("black");
  textSize(85);
  text('NY', 135,160);
  
}