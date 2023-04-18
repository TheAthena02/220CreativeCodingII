class animationLoader {
    constructor(animationSet,x,y) {
        this.animationSet = animationSet;
        this.x = x;
        this.y = y;
        this.scale = scale;
        this.currentAnimation;
        this.direction = "";
        this.animationLoad();
        console.log("hi");
    }
    getX() {
        return this.x;
    }
    setX(x) {
        this.x = x;
    }
    animationLoad() {
        console.log(this.animationSet[0]);
        this.currentAnimation = loadAnimation(this.animationSet[0], this.animationSet[this.animationSet.length-1]);
    
    }
    animationDraw() {
        this.currentAnimation.frameDelay = 5;
        scale(this.scale);
        animation(this.currentAnimation, this.x, this.y);
    }
    /*updatePosition(direction)
    {
        this.direction = direction;
        if(direction == "forward")
        {
            this.x += 1;
        }
        else if(direction == "reverse")
        {   
            this.x -= 1;
            
        }
    }*/
    isRectanglesColliding(object) {
        return collideRectRect(this.x,this.y,this.w,this.h,object.getX(),object.getY(), object.getW(), object.getH());
    }
}