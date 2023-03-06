class fruitClass {
    constructor (color, r, xMax, yMax) {
        this.color = color;
        this.r = r;
        this.xMax = xMax;
        this.yMax = yMax;
    }

    draw() {
        fill(this.color);
        circle(this.r, this.xMax, this.yMax);
    }
}