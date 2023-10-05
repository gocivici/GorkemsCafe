const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d')
const socket = io()


ctx.imageSmoothingEnabled = false;
const speed = 2;
var frameCount = 10
var length = 0
let img = new Image();
let frameWidth = 23.5;
let frameHeight = 29;
let column = 0;
let row = 0;
let readyNow = false
let animationFrame = 0;
let pageVisible = true;
let debugMode = false;
let timeoutHandle;

//emoji picker code

// let atPosition = true;
// img.src = 'demaSprite.png';
clickCoordinates = [100,100]



// document.getElementById("canvas").style.background = "url('baackground.png')";

// background.onload = function(){
//     ctx.drawImage(background,0,0);   
// }
if(!localStorage.getItem('username')){
    localStorage.setItem('username','Visitor')
   }
// setInterval(player.animate, 50);

canvas.width = 32 * 21 //672
canvas.height = 32 * 12 //384

console.log(ctx);



const background1 = new Sprite({
    position:{
        x:0,
        y:0
    },
    imageSrc: './img/baackground.png'
})


socket.on('disconnect',(reason)=>{
    console.log(reason);
    if (confirm("Kicked to due inactivity, click OK to refresh page") == true) {
        window.location.reload();
      }
})

// const player = new Player(100,100,'Görkem')
const fPlayers = {}

socket.on('updatePlayers', (bPlayers) =>{
    for(const id in bPlayers){
        const bPlayer = bPlayers[id]
        
        if(!fPlayers[id]){
            fPlayers[id] = new Player({
                position:{
                    x:bPlayer.x,
                    y:bPlayer.y
                },
                incrementX:0,
                incrementY:0,
                clickX:bPlayer.clickX,
                clickY:bPlayer.clickY,
                userId:id,
                username:'',
                message:'',
                atPosition:true,
                animationColumn:0,
                imageSrc:'Down.png',
                frames: 4,
                center:true,
                sprites:{
                    down:'Down.png',
                    up:'Up.png',
                    right:'Right.png',
                    left:'Left.png'
                }
                
            })
            fPlayers[socket.id].username = localStorage.getItem('username')
            socket.emit('username',fPlayers[socket.id].username);
            
        } else { 
            // if players already exist
            fPlayers[id].clickX = bPlayer.clickX
            fPlayers[id].clickY = bPlayer.clickY
            fPlayers[id].message = bPlayer.message
            fPlayers[id].username = bPlayer.username

            //update player position without animation if tab is inactive
            if (document.hidden) {
                fPlayers[id].position.x = bPlayer.x
                fPlayers[id].position.y = bPlayer.y
            }
        }
    }
for (const id in fPlayers){
    if(!bPlayers[id]){
        delete fPlayers[id]
    }
}

    // console.log(fPlayers)
    readyNow=true
})
// setInterval(animate, 60);
// player.draw()

// get cursor position function
function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    // console.log("x: " + x + " y: " + y)
    return [x,y]
}

// animate from point a to point b

let animationId
// setInterval(animate, 60);
function animate(){
 
    ctx.imageSmoothingEnabled = false;
    // console.log(pageVisible)
    
    // ctx.clearRect(0,0,canvas.width,canvas.height);
    background1.draw()
    animationId = requestAnimationFrame(animate);
    if(readyNow){
    // ctx.drawImage(background,0,0); 

    for (const id in fPlayers){
        const allfPlayer = fPlayers[id]

    allfPlayer.draw()
    if(debugMode) allfPlayer.debug()
    allfPlayer.update()
    // allfPlayer.message()
    
    }

    // fPlayer = fPlayers[socket.id]

    // if(){}
// goToPosition(fPlayer,clickCoordinates)


    // console.log(fPlayer.animationColumn)
    // return [incrementX,incrementY]
}

// function goToPosition(fPlayer,clickCoordinates){
    
    
// }

}



animate()



canvas.addEventListener('mousedown', function(e) {
    clickCoordinates = getCursorPosition(canvas, e)

// calculateIncrement(fPlayers[socket.id]);

fPlayers[socket.id].clickX = clickCoordinates[0]
fPlayers[socket.id].clickY = clickCoordinates[1]
socket.emit('clickPosition',clickCoordinates)
// length=2;

    // animate(player.x,player.y,clickCoordinates[0],clickCoordinates[1],frameCount)
    


})
//
document.querySelector('#textInput').addEventListener('submit',(event)=>{
    event.preventDefault() //do not refresh page whenform submited
    var inputValue = document.querySelector('#input').value
    if(inputValue.includes("/name ")){
        console.log('namechange')
        fPlayers[socket.id].username = inputValue.replace("/name ","")
        localStorage.setItem('username',fPlayers[socket.id].username);
        socket.emit('username',fPlayers[socket.id].username)
    }else if(inputValue==='/debug'){
        if(debugMode) {debugMode=false;}else{debugMode=true;}
        
    }else{
    fPlayers[socket.id].message=document.querySelector('#input').value

    socket.emit('message',fPlayers[socket.id].message)
    console.log('value sent')
    fPlayers[socket.id].messageSent = true;
}
    document.querySelector('#textInput').reset();
})