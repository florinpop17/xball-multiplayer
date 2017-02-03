const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const bodyParser = require('body-parser');
const Ball = require('./libs/ball');
const User = require('./libs/user');

const PORT = process.env.PORT || 3000;

let canvasWidth = 800; // Make sure to be same as on client's
let canvasHeight = 600; // Make sure to be same as on client's
let fieldOffset = 30; // Make sure to be same as on client's
let r = 20; // Make sure to be same as on client's

let connections = [];
let users = [];
let ball = new Ball(canvasWidth, canvasHeight);
let teams = [{
    name: 'Pink',
    count: 0
},{
    name: 'Teal',
    count: 0
}];

setInterval(tick, 20); // 50 frames / second => 1000 / 20 => 50
//setInterval(()=>{console.log(users); console.log();}, 2000);
function tick() {
//    console.log(users);
//    console.log('------------------------------');
    io.sockets.emit('tick', users);
}



app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('index.html');
});

server.listen(PORT, () => {
    console.log("Server listening on port", PORT);
});

io.sockets.on('connection', (socket) => {
    connections.push(socket);
    console.log('Connected: %s sockets connected.', connections.length);
    
    socket.emit('connectNewUser', createNewUser(socket.id));
    
    socket.on('updateUser', (updatedUser) => {
        users.forEach(user => {
            if(user.id === socket.id){
                user.x = updatedUser.x;
                user.y = updatedUser.y;
                user.isKicking = updatedUser.isKicking;
            }
        })
    });
    
    //Disconnect
    socket.on('disconnect', (data) => {
        connections.splice(connections.indexOf(socket), 1);
        users = users.filter(user =>{
            if(user.id !== socket.id){
                console.log(user.id, socket.id);
                console.log('NOT disconnected')
                return true;
            } else {
                console.log('disconnected')
                return false;
            }
        });
        console.log('Disconnected: %s sockets connected.', connections.length);
    });
});

function createNewUser(_id) {
    let newUser = {};
    
    newUser.id = _id;
    newUser.team = getTeam();
    
    if(newUser.team === teams[0].name){ // Pink
        newUser.x = (Math.random() * (canvasWidth / 2 - r)) + fieldOffset + r;
    } else { // Teal
        newUser.x = (Math.random() * (canvasWidth / 2 - fieldOffset - r)) + (canvasWidth / 2) + r;
    }
    
    newUser.y = (Math.random() * (canvasHeight - r / 2)) + r;
    
    users.push(newUser);
    return newUser;
}

function getTeam() {
    let teamName;
    
    // If teal team has more users, add to pink
    if(teams[1].count > teams[0].count){
        teamName = teams[0].name;
        teams[0].count++;
    } else {
        teamName = teams[1].name;
        teams[1].count++;
    }
    
    return teamName;
}