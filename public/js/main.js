var fieldOffset = 30;
var goalSize = {
    x: fieldOffset, 
    y: 150
};
var score = '0 - 0';

var socket = io.connect();
var user;
var name = 'Unnamed';

function preload() {
    socket.on('connectNewUser', function(data){
        user = data;
        console.log('New User Connected.');
    });
}

function setup() {
    createCanvas(800, 600);
}

function draw() {
    background('#2980b9');
    drawField();
    drawScore();
}

function drawField() {
    // Draw field margins
    fill('#00680A');
    strokeWeight(6);
    stroke(255);
    rect(fieldOffset, 0, width - fieldOffset * 2, height);
    
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
    rect(0, height/2 - goalSize.y/2, goalSize.x, goalSize.y);
    
    // Right goal
    rect(width - goalSize.x, height/2 - goalSize.y/2, goalSize.x, goalSize.y);
}

function drawScore() {
    fill(255);
    strokeWeight(0);
    textSize(16);
    text('Pink - Teal', 40, 30);
    text(score, 63, 50);
}