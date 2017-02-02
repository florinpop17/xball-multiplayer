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

let connections = [];
let teams = ['Pink', 'Teal'];
let users = [];
let ball = new Ball(canvasWidth, canvasHeight);

setInterval(tick, 1000);

function tick() {
    console.log(users);
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
    
    //Disconnect
    socket.on('disconnect', (data) => {
        connections.splice(connections.indexOf(socket), 1);
        users = users.filter(user => user.id !== socket.id);
        console.log('Disconnected: %s sockets connected.', connections.length);
    });
});

function createNewUser(_id) {
    let newUser = {};
    
    newUser.id = _id;
    newUser.team = getTeam();
    
    users.push(newUser);
    return newUser;
}

function getTeam() {
    // If users.length % 2 === 0 => Pink team else => Teal team
    return teams[users.length % 2];
}