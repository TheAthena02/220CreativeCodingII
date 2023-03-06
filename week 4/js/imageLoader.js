class imageLoader {
    constructor(animation) {
    this.animation = animation;
    this.imageSet = [];
}

draw(j) {
    image(this.imageSet[j], 300, 100, 145, 250);
}

animate() {
    for (var i = 0; i < this.animation.length; i++) {
        currentImage = loadImage(this.animation[i]);
        this.imageSet[i] = currentImage;
    }
}

}