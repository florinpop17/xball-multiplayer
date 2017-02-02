var fieldOffset = 30;
var goalSize = {
    x: 30, 
    y:150
};

function setup() {
    createCanvas(800, 600);
}

function draw() {
    background(0);
    drawField();
}

function drawField() {
    // Draw field margins
    fill('#00680A');
    strokeWeight(10);
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
    rect(2, height/2 - goalSize.y/2, goalSize.x, goalSize.y);
    
    // Right goal
    rect(width - goalSize.x - 2, height/2 - goalSize.y/2, goalSize.x, goalSize.y);
}