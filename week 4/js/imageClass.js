class imageClass{
    constructor(imgStrings) {
        this.imgStrings = imgStrings;
        this.imgs = [];
        this.loadAnimations();
        this.currentFrameCount;
        this.j = 0;
    }

    loadAnimations() {
        for (var i = 0; i < this.imgStrings.length; i++) {
            var img = loadImage(this.imgStrings[i]);
            this.imgs[i] = img;
        }
    }

    drawAnim(j) {
        image(this.imgs[j],100,250,150,150);
    }


    setCurrentFrameCount(currentFrameCount){

    }
}