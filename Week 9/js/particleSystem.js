class particleSystem {
    constructor(x, y, color) {
        this.particle = new Group();
        this.particle.x = x;
        this.particle.y = y;
        this.particle.direction = () => random(0, 360);
	    this.particle.speed = () => random(1, 5);
	    this.particle.d = 20;
	    this.particle.amount = 10;
        this.particle.life = 50;
        this.particle.color = color;
    }
}