const express = require('express')
const app = express()
let timeoutHandle;
//socket.io setup
const http = require('http')
const server = http.createServer(app)
const {Server} = require('socket.io')
const io = new Server(server, {
    // custom ping timer for duplicates
    pingInterval:2000,
    pingTimeout:5000
})

var Filter = require('./bad-words-hacked');
filter = new Filter();

// app.use(requireHTTPS); // Set 'SET NODE_ENV=development' in local computer before use

function requireHTTPS(req, res, next) {
    // The 'x-forwarded-proto' check is for Heroku
    if (!req.secure && req.get('x-forwarded-proto') !== 'https' && process.env.NODE_ENV !== "development") {
      return res.redirect('https://' + req.get('host') + req.url);
    }
    next();
  }
// const port = 3000

app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.sendFile(__dirname + 'index.html')
})

const bPlayers = {
   
}

io.on('connection', (socket)=>{
    console.log('user connected')
    resetDisconnectTimer();
    bPlayers[socket.id] = {
        x:790,
        y:154,
        clickX:790,
        clickY:154,
        roomId:1,
        message:'',
        username:"Visitor",
        skin:"Green",
        timeoutId:0
    } //create player object with new socket id property

    io.emit('updatePlayers',bPlayers)

    socket.on('disconnect',(reason)=>{
        console.log(reason)
        delete bPlayers[socket.id]
        io.emit('updatePlayers',bPlayers)
    })

    socket.on('clickPosition',(coordinates)=>{
        resetDisconnectTimer();
        bPlayers[socket.id].clickX = coordinates[0]
        bPlayers[socket.id].clickY = coordinates[1]
        bPlayers[socket.id].x = bPlayers[socket.id].clickX
        bPlayers[socket.id].y = bPlayers[socket.id].clickY
   

        console.log(bPlayers)
    })

    socket.on('username',(username)=>{
        bPlayers[socket.id].username = username
        console.log("updated username for: "+bPlayers[socket.id].username)
    })

    socket.on('skin',(skin)=>{
        bPlayers[socket.id].skin = skin
        console.log("updated skin for: "+bPlayers[socket.id].username)
    })

    socket.on('message',(message)=>{
        let timeoutId;
        clearTimeout(bPlayers[socket.id].timeoutId);
        bPlayers[socket.id].message = filter.cleanHacked(message)
        // bPlayers[socket.id].message = message

        function startTimer() {
          timeoutId = setTimeout(() => {
                bPlayers[socket.id].message = ''
            }, 4000);
          }
          bPlayers[socket.id].timeoutId = timeoutId
        startTimer();

        console.log(bPlayers)
    })

    function resetDisconnectTimer(){
        clearTimeout(socket.inactivityTimeout);
        socket.inactivityTimeout = setTimeout(() => socket.disconnect(true), 1000 * 60 * 15);
    }
    // socket.on('clickPositionX',(coordinates)=>{
    //     bPlayers[socket.id].x = coordinates
    //     console.log(coordinates)
    // })
    // socket.on('clickPositionY',(coordinates)=>{
    //     bPlayers[socket.id].y = coordinates

    // })

    console.log(bPlayers)
})

setInterval(() =>{
        io.emit('updatePlayers',bPlayers)
},15)

server.listen((process.env.PORT || 3000),() =>{
    console.log(`app listening on port ${(process.env.PORT || 3000)}`)
})

