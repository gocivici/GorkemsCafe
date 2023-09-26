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

const port = 3000

app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.sendFile(__dirname + 'index.html')
})

const bPlayers = {
   
}

io.on('connection', (socket)=>{
    console.log('user connected')
    bPlayers[socket.id] = {
        x:200,
        y:200,
        clickX:200,
        clickY:200,
        message:'',
        username:"Visitor"
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
        console.log("updated username for: "+bPlayers[socket.id])
    })

    socket.on('message',(message)=>{

        clearTimeout(timeoutHandle);
        bPlayers[socket.id].message = message

        function startTimer() {
            timeoutHandle = setTimeout(() => {
                bPlayers[socket.id].message = ''
            }, 4000);
          }
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

server.listen(port,() =>{
    console.log(`app listening on port ${port}`)
})