var fieldOffset = 30;
var goalSize = {
    x: fieldOffset, 
    y: 150
};
var score = '0 - 0';

var socket = io.connect();
var users = [];
var user;
var name = 'Unnamed';
var speed = 5;

var pink = '#C80064'; //200, 0, 100;
var teal = '#74C2E1'; //116, 194, 225;

function preload() {
    socket.on('connectNewUser', function(data){
        user = data;
        console.log('New User Connected.');
        loop();
    });
}

function setup() {
    createCanvas(800, 600);
    console.log(user);
    
    // Only start looping when you have the connectedUser
    noLoop();
}

function draw() {
    background('#2980b9');
    drawField();
    drawScore();
    
    if(user){ // To avoid errors on first drawing
        moveUser();
        drawUser();
    }
}

function drawUser(){
    if(user.team === 'Pink'){
        fill(pink)
    } else {
        fill(teal);
    }
    
    strokeWeight(3);
    stroke(0);
    ellipse(user.x, user.y, user.r*2);
}

function userBoundaries() {
    if(user.x + user.r > width - fieldOffset){
        user.x = width - user.r - fieldOffset;
    } else if (user.x - user.r < fieldOffset) {
        user.x = user.r + fieldOffset;
    }

    if(user.y + user.r > height){
        user.y = height - user.r;
    } else if (user.y - user.r < 0) {
        user.y = user.r;
    }
}

function moveUser() {
    if (keyIsDown(LEFT_ARROW))
        user.x -= speed;

    if (keyIsDown(RIGHT_ARROW))
        user.x += speed;

    if (keyIsDown(UP_ARROW))
        user.y -= speed;

    if (keyIsDown(DOWN_ARROW))
        user.y += speed;
}

function drawField() {
    // Draw field margins
    fill('#00680A');
    strokeWeight(6);
    stroke(255);
    rect(fieldOffset, 3, width - fieldOffset * 2, height - 6);
    
    // Draw middle line
    strokeWeight(6);
    line(width/2, 0, width/2, height);
    
    // Draw middle cercle
    ellipse(width/2, height/2, 100, 100);
    
    // Draw middle point
    fill(255);
    ellipse(width/2, height/2, 10, 10);
    
    // Drawing the 2 goals
    fill('#00680A')
    stroke(255);
    
    // Left goal
    rect(3, height/2 - goalSize.y/2, goalSize.x - 3, goalSize.y);
    
    // Right goal
    rect(width - goalSize.x, height/2 - goalSize.y/2, goalSize.x - 3, goalSize.y);
}

function drawScore() {
    fill(255);
    strokeWeight(0);
    textSize(16);
    text('Pink - Teal', 40, 30);
    text(score, 63, 50);
}