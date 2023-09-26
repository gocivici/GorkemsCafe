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

// const port = 3000

app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.sendFile(__dirname + 'index.html')
})

const bPlayers = {
   
}

io.on('connection', (socket)=>{
    console.log('user connected')
    bPlayers[socket.id] = {
        x:615,
        y:136,
        clickX:615,
        clickY:136,
        message:'',
        username:"Visitor",
        timeoutId:0
    } //create player object with new socket id property

    io.emit('updatePlayers',bPlayers)

    socket.on('disconnect',(reason)=>{
        console.log(reason)
        delete bPlayers[socket.id]
        io.emit('updatePlayers',bPlayers)
    })

    socket.on('clickPosition',(coordinates)=>{
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

    socket.on('message',(message)=>{
        let timeoutId;
        clearTimeout(bPlayers[socket.id].timeoutId);
        bPlayers[socket.id].message = message

        function startTimer() {
          timeoutId = setTimeout(() => {
                bPlayers[socket.id].message = ''
            }, 4000);
          }
          bPlayers[socket.id].timeoutId = timeoutId
        startTimer();

        console.log(bPlayers)
    })
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