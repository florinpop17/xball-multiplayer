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
        let friction = {
            x: this.velocity.x,
            y: this.velocity.y
        }
        
        friction.x *= -1 * this.frictionConstant;
        friction.y *= -1 * this.frictionConstant;
        
        this.applyForce(friction);
    }
    
    applyForce(force) {
        this.acceleration.x += force.x;
        this.acceleration.y += force.y;
    }
    
    stopBall() {
        this.stopped = true;
        this.acceleration.x = 0;
        this.acceleration.y = 0;
        this.velocity.x = 0;
        this.velocity.y = 0;
    }
}

module.exports = Ball;