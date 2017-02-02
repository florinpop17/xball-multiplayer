let users = [];
let ball;
let user;
let x;

let windowOffset = 30;
let goal = {x: 30, y: 150};

let score = '0 - 0';
let tealScore = 0;
let pinkScore = 0;

function setup(){
    createCanvas(800, 500);
    
    users.push(new User('teal', windowOffset));
    users.push(new User('pink', windowOffset));
    
    ball = new Ball(windowOffset, goal);
}

function draw() {
    background('#00680A');
    drawField();
    drawScore();
    
    checkBallCollision(users, ball);
    
    users.forEach(user => {
        user.move();
        user.edges();
        user.draw();
    });
    
    ballEdges(ball);
    ball.update();
    ball.draw();
    
}

function drawScore() {
    fill(255);
    strokeWeight(0);
    textSize(16);
    text('Pink - Teal', 40, 30);
    text(score, 63, 50);
}

function drawField() {
    // Draw field margins
    fill('#00680A');
    strokeWeight(10);
    stroke(255);
    rect(windowOffset, 0, width - windowOffset * 2, height);
    
    // Draw middle line
    strokeWeight(6);
    line(width/2, 0, width/2, height);
    
    // Draw middle cercle
    ellipse(width/2, height/2, 100, 100);
    
    // Draw middle point
    fill(255);
    ellipse(width/2, height/2, 10, 10);
    
    // Draw the 4 edges
    fill(0);
    stroke(0);
    // Top-left edge
    rect(0, 0, windowOffset - 3, height/2 - goal.y/2);
    // Bottom-left edge
    rect(0, height/2 + goal.y/2, windowOffset - 3, height/2 - goal.y/2);
    // Top-right edge
    rect(width-goal.x + 3, 0, windowOffset - 3, height/2 - goal.y/2);
    // Bottom-right edge
    rect(width-goal.x + 3, height/2 + goal.y/2, windowOffset - 3, height/2 - goal.y/2);
    
    // Drawing the 2 goals
    fill('#00680A')
    stroke(255);
    
    // Left goal
    rect(2, height/2 - goal.y/2, goal.x, goal.y);
    
    // Right goal
    rect(width - goal.x - 2, height/2 - goal.y/2, goal.x, goal.y);
}

function checkBallCollision(users, ball) {
    
    users.forEach(user => {
        let d = dist(user.location.x, user.location.y, ball.location.x, ball.location.y);

        if(d-3 <= user.r + ball.r){
            if(user.isKicking) {
                x = createVector(ball.location.x - user.location.x, ball.location.y - user.location.y).setMag(20);
            } else {
                x = createVector(ball.location.x - user.location.x, ball.location.y - user.location.y).setMag(1.5);
                user.isKicking = false;
            }
            ball.applyForce(x);
        }
    });
}

function keyPressed() {
    // 191 is the keyCode for the '/' button
    // 32 is the keyCode for the 'space' button
    users.forEach(user => {
        if(keyCode === 191 && user.team === 'pink') {
            user.isKicking = true;
        }
        if(keyCode === 32 && user.team === 'teal') {
            user.isKicking = true;
        }
    });
}

function keyReleased() {
    // 191 is the keyCode for the '/' button
    // 32 is the keyCode for the 'space' button
    users.forEach(user => {
        if(keyCode === 191 && user.team === 'pink'){
            user.isKicking = false;
        }    
        if (keyCode === 32 && user.team === 'teal') {
            user.isKicking = false;
        }
    });
}

function ballEdges(ball) {
    
    // Check if outside the goal (y check) right-side
    if(ball.location.x + ball.r > width - windowOffset && ball.location.y < height/2 - goal.y/2 || ball.location.x + ball.r > width - windowOffset && ball.location.y > height/2 + goal.y/2){
            ball.location.x = width - ball.r - windowOffset;
            ball.velocity.x *= -1;

    // Check if inside the goal right-side && score team 1 (pink)
    } else if (ball.location.x + ball.r > width && ball.location.y > height/2 - goal.y/2 || ball.location.x + ball.r > width && ball.location.y < height/2 + goal.y/2){
            ball.location.x = width - ball.r;
            scored('pink');            

    // Check if outside the goal (y check) left-side
    } else if (ball.location.x - ball.r < windowOffset && ball.location.y < height/2 - goal.y/2 || ball.location.x - ball.r < windowOffset && ball.location.y > height/2 + goal.y/2){
            ball.location.x = windowOffset + ball.r;
            ball.velocity.x *= -1;

    // Check if inside the goal left-side && score team 1 (pink)
    } else if (ball.location.x - ball.r < 0 && ball.location.y > height/2 - goal.y/2 || ball.location.x - ball.r < 0 && ball.location.y < height/2 + goal.y/2){
            ball.location.x = ball.r;
            scored('teal');
    }

    if(ball.location.y + ball.r > height){
        ball.velocity.y *= -1;
        ball.location.y = height - ball.r;
    } else if (ball.location.y - ball.r < 0) {
        ball.velocity.y *= -1;
        ball.location.y = ball.r;
    }
}

function scored(team) {
    if(team === 'pink')
        pinkScore++;
    if(team === 'teal')
        tealScore++;
    
    ball.location.x = width / 2;
    ball.location.y = height / 2;
    
    ball.stopBall();
    
    score = `${pinkScore} - ${tealScore}`;
}