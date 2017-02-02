class Ball{
    constructor(canvasWidth, canvasHeight){
        this.location = {
            x: canvasWidth / 2,
            y: canvasHeight / 2
        };
        this.velocity = {
            x: 0,
            y: 0
        };
        this.acceleration = {
            x: 0,
            y: 0
        }
        this.r = 15;
        this.frictionConstant = 0.05;
        this.stopped = false;
    }
    
    update() {
        if(!this.stopped){
            this.applyFriction();
            
            this.velocity.x += this.acceleration.x;
            this.velocity.y += this.acceleration.y;
            
            this.location.x += this.velocity.x;
            this.location.y += this.velocity.y;
            
            this.acceleration.x = 0;
            this.acceleration.y = 0;
        } else {
            this.stopped = false;
        }
    }
    
    applyFriction() {
        
    }
    
    applyForce() {
        
    }
    
    stopBall() {
        this.stopped = true;
    }
}

module.exports = Ball;


    update() {
        if(!this.stop){
            this.applyFriction();
            this.velocity.add(this.acceleration);
            this.location.add(this.velocity);

            this.acceleration.mult(0);
        } else {
            this.stop = false;
        }
    }
    
    applyFriction() {
        let friction = this.velocity.copy();
        friction.mult(-1 * this.frictionConstant);
        
        this.applyForce(friction);
    }
    
    applyForce(force) {
        this.acceleration.add(force);
        return force;
    }
    
    stopBall() {
        this.stop = true;
        this.acceleration.mult(0);
        this.velocity.mult(0);
    }
}