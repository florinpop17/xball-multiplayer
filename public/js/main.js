var fieldOffset = 30;
var goalSize = {
    x: fieldOffset, 
    y: 150
};
var score = '0 - 0';

var socket = io.connect();
var users = [];
var user;
var ballLoc;
var name = 'Unnamed';
var speed = 3;
var userR = 20;
var ballR = 12;

var pink = '#C80064'; //200, 0, 100;
var teal = '#74C2E1'; //116, 194, 225;

document.getElementById('btn').addEventListener('click', function(){
    let newName = document.getElementById('name').value;
    if(newName){
        user.name = newName;
        document.getElementById('popup').style.display = 'none';
        socket.emit('setName', newName);
        loop();
    }
});


function preload() {
    socket.on('connectNewUser', function(newUser){
        user = newUser;
        console.log('User Connected.');
    });
    
    socket.on('tick', function(data) {
        users = data.users;
        ballLoc = data.ballLoc;
    });
    
    socket.on('scored', function(scores) {
//        console.log(scores);
        score = `${scores.pink} - ${scores.teal}`; 
    });
}

function setup() {
    createCanvas(800, 600);
    console.log(user);
    
    // Only start looping when you have the initial data from the server
    noLoop();
}

function draw() {
    background('#2980b9');
    drawField();
    drawScore();
    
    if(user){ // To avoid errors on first drawing
        moveUser();
        userBoundaries();
        drawUser(user);
        
        socket.emit('updateUser', user);
    }
    
    drawAllUsersExceptThis();
    
    if(ballLoc)
        drawTheBall(ballLoc);
}

function drawTheBall(_ballLoc) {
    fill(255);
    stroke(0);
    ellipse(_ballLoc.x, _ballLoc.y, ballR * 2);
}

function drawUser(_user){
    
    // Drawing the name;
    textAlign(CENTER);
    textSize(14);
    fill(255);
    strokeWeight(0);
    text(`${_user.name}`, _user.x, _user.y - userR*1.5);
    
    if(_user.team === 'Pink'){
        fill(pink)
    } else {
        fill(teal);
    }
    
    if(_user.isKicking){
        stroke(255);
    } else {
        stroke(0);
    }
    
    strokeWeight(3);
    ellipse(_user.x, _user.y, userR*2);
}

function userBoundaries() {
    // Right
    if(user.x + userR > width - fieldOffset){
        user.x = width - userR - fieldOffset;
    
    // Left
    } else if (user.x - userR < fieldOffset) {
        user.x = userR + fieldOffset;
    }
    
    // Bottom
    if(user.y + userR > height - 3){
        user.y = height - userR - 3;
        
    // Top
    } else if (user.y - userR < 3) {
        user.y = userR + 3;
    }
}

function drawAllUsersExceptThis() {
    users.forEach(user => {
        if(user.id !== socket.id){
            drawUser(user);
        } 
    });
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

function keyPressed() {
    
    // 32 is the keyCode for the 'space' button
    if(keyCode === 32) {
        user.isKicking = true;
    }
}

function keyReleased() {
    
    // 32 is the keyCode for the 'space' button
    if(keyCode === 32){
        user.isKicking = false;
    }
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
    stroke(255);
    
    // Left goal
    fill(pink);
    rect(3, height/2 - goalSize.y/2, goalSize.x - 3, goalSize.y);
    
    // Right goal
    fill(teal);
    rect(width - goalSize.x, height/2 - goalSize.y/2, goalSize.x - 3, goalSize.y);
}

function drawScore() {
    fill(255);
    strokeWeight(0);
    textAlign(LEFT);
    textSize(16);
    text('Pink - Teal', 40, 30);
    text(score, 63, 50);
}