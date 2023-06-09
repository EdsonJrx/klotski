let W = 100
let H = 100
class Sprite {
    constructor(sX, sY, sW, sH, dX, dY, dW, dH, speed, contrast) {
        this.sX = sX*W;
        this.sY = sY*H;
        this.sW = sW*W;
        this.sH = sH*H;
        this.dX = dX*W;
        this.dY = dY*H;
        this.dW = dW*W;
        this.dH = dH*H;
        this.speed = speed;
        this.contrast = contrast;
    }
}
Sprite.prototype.halfWidth = function(){
    return this.dW/2;
}
Sprite.prototype.halfHeight = function(){
    return this.dH/2;
}
Sprite.prototype.centerX = function(){
    return this.dX + this.halfWidth();
}
Sprite.prototype.centerY = function(){
    return this.dY + this.halfHeight();
}