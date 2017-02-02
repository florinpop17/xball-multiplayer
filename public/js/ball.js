class Ball {
    constructor(_windowOffset) {
        this.location = createVector(width/2, height/2);
        this.velocity = createVector(0, 0);
        this.acceleration = createVector(0, 0);
        this.r = 15;
        this.frictionConstant = 0.05;
        this.stop = false;
        
        this.windowOffset = _windowOffset;
    }
    
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
    
    draw() {
        fill(255);
        strokeWeight(3);
        stroke(0);
        ellipse(this.location.x, this.location.y, this.r*2, this.r*2);
    }
    
    scored(team) {
        console.log(`Team ${team} scored!`);
        this.stop = true;
    }
}