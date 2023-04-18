class fruitClass {
    constructor (color, show, r, x, y) {
        this.color = color;
        this.r = r;
        this. x = x;
        this.y = y;
        this.show = show;
    }

    draw() {
        fill(this.color);
        
        circle(this.x, this.y, this.r);
        
        
    }
}