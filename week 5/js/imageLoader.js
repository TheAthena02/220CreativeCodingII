class imageLoader {
    constructor(animation) {
    this.animation = animation;
    this.imageSet = [];
    
}

draw(j, x, y) {
    //imageMode(CENTER);
    image(this.imageSet[j], x, y, 150, 200);
}

animate() {
    for (var i = 0; i < this.animation.length; i++) {
        currentImage = loadImage(this.animation[i]);
        this.imageSet[i] = currentImage;
    }
}

}