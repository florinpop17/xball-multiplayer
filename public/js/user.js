class User {
    constructor(_team, _windowOffset){
        this.location = createVector((_team === 'pink') ? 10 : width - 50, height/2);
        this.r = 20;
        this.speed = 3;
        this.isKicking = false;
        this.team = _team;
        this.windowOffset = _windowOffset;
    }
    
    draw(){
        // Coloring depending on team
        if(this.team === 'teal'){
            fill(116, 194, 225);
        } else if(this.team === 'pink'){
            fill(200, 0, 100);
        }
        
        strokeWeight(3);
        
        // Making the stroke white if is in kicking mode
        if(this.isKicking)
            stroke(255);
        else
            stroke(0);
        ellipse(this.location.x, this.location.y, this.r*2, this.r*2);
    }
    
    move(){
        if (keyIsDown(LEFT_ARROW) && this.team === 'pink')
            this.location.x -= this.speed;

        if (keyIsDown(RIGHT_ARROW) && this.team === 'pink')
            this.location.x += this.speed;

        if (keyIsDown(UP_ARROW) && this.team === 'pink')
            this.location.y -= this.speed;

        if (keyIsDown(DOWN_ARROW) && this.team === 'pink')
            this.location.y += this.speed;
        
        // a code = 65
        if (keyIsDown(65) && this.team === 'teal')
            this.location.x -= this.speed;
        
        // d code = 68
        if (keyIsDown(68) && this.team === 'teal')
            this.location.x += this.speed;

        // w code = 87
        if (keyIsDown(87) && this.team === 'teal')
            this.location.y -= this.speed;

        // s code = 83
        if (keyIsDown(83) && this.team === 'teal')
            this.location.y += this.speed;
        
    }
    
    edges() {
        if(this.location.x + this.r > width - this.windowOffset){
            this.location.x = width - this.r - this.windowOffset;
        } else if (this.location.x - this.r < this.windowOffset) {
            this.location.x = this.r + this.windowOffset;
        }
        
        if(this.location.y + this.r > height){
            this.location.y = height - this.r;
        } else if (this.location.y - this.r < 0) {
            this.location.y = this.r;
        }
    }
}