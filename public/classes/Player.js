
class Player extends Sprite {
    constructor({position,clickX,clickY,incrementX,incrementY,userId,username,message,atPosition,animationColumn,imageSrc,frames,center,sprites}){
        super({position,imageSrc,frames,center,atPosition,sprites})
        // super({imageSrc})
        this.clickX = clickX
        this.clickY = clickY
        this.angleDeg = 90
        this.incrementX = incrementX
        this.incrementY = incrementY
        this.userId = userId
        this.username = username
        this.message = message
        this.messageSent = false


    }
    
    debug(){

    //     ctx.beginPath()
        
    //     if(!this.atPosition){
    //     if(currentFrame%15==0){
    //         animationFrame++
    //         this.animationColumn = animationFrame
    //     }
    //     if (animationFrame> 2){
    //         animationFrame = 0;
    //     }
    // }else{
    //     this.animationColumn = 0;
    // }
       
        
        // ctx.drawImage(img,this.animationColumn*frameWidth,row*frameHeight, frameWidth, frameHeight, this.position.x-frameWidth/2-8, this.position.y-frameHeight/2,frameWidth*2, frameHeight*2);
        
        ctx.fillStyle = this.color;
        
        ctx.textAlign = "center";
        ctx.fillStyle = 'white';
        ctx.font = 'normal 12px sans-serif';
       
        ctx.fillText("Click X&Y :"+[this.clickX,this.clickY], this.position.x, this.position.y-110);
        ctx.fillText("Position: "+[Math.round(this.position.x),Math.round(this.position.y)], this.position.x, this.position.y-98);
        ctx.fillText("Inc X&Y :"+[this.incrementX.toFixed(2),this.incrementY.toFixed(2)], this.position.x, this.position.y-85);
        ctx.font = 'italic 15px sans-serif';
        ctx.fillStyle = 'pink';
        ctx.fillText(this.message, this.position.x, this.position.y-65);
        ctx.font = 'Normal 16px sans-serif';
        ctx.textAlign = "center";
        ctx.fillStyle = 'orange';
        ctx.fillText("user ID: " + this.userId, this.position.x, this.position.y+35);
        ctx.fillStyle = 'cyan';
        ctx.fillText(this.username, this.position.x, this.position.y+15);

        ctx.fill()
        
        
    }
    update(){


    
    // if((Math.sign(incrementX)==1&&fPlayer.x<clickCoordinates[0])||(Math.sign(incrementX)==-1&&fPlayer.x>clickCoordinates[0])){fPlayer.x += incrementX;fPlayer.atPosition=false;    socket.emit('clickPositionX',fPlayer.x)}else{fPlayer.atPosition=true}
    // if((Math.sign(incrementY)==1&&fPlayer.y<clickCoordinates[1])||(Math.sign(incrementY)==-1&&fPlayer.y>clickCoordinates[1])){fPlayer.y += incrementY;fPlayer.atPosition=false;    socket.emit('clickPositionY',fPlayer.y)}else{fPlayer.atPosition=true}
    if(this.position.x.toFixed(2)!=this.clickX){
        
    calculateIncrement(this);

//     if(this.messageSent){
//         var refreshId = setInterval(() =>{
//             clearInterval(refreshId);
//             this.message=''
//             console.log("message deleted")
//             this.messageSent=false

//     },2000)
// }
console.log(this.messageSent)
    
    if(length>1){
        this.atPosition=false

        if(225<this.angleDeg && this.angleDeg<315){this.image = this.Up; console.log('going up')}else
        if(45<this.angleDeg && this.angleDeg<135){this.image = this.Down}else
        if(135<this.angleDeg && this.angleDeg<225){this.image = this.Left}else{this.image = this.Right}
        // console.log(this.angleDeg)

        // switch(this.angleDeg){
        //     case -135:
        //         this.image = this.Up
        //         break;
        //     case 1:
        //         this.image = this.Down
        //         break;
        // }



        this.position.x+=this.incrementX;
        this.position.y+=this.incrementY;
        // console.log('goingtolocation')

    } else{
        this.atPosition=true
        
    }
    // function clearMessage(){
    //    this.message='t'
    //     console.log("message deleted")
    //     this.messageSent=false
    // }
}
    
        function calculateIncrement(player){
            var dx = player.clickX - player.position.x;
            var dy = player.clickY - player.position.y;
            player.angleDeg = Math.atan2(dy, dx); 
            player.angleDeg *= 180 / Math.PI;
            if(player.angleDeg<0) player.angleDeg = 360 + player.angleDeg

            
            // console.log(player.angleDeg)
            length = Math.sqrt(dx * dx + dy * dy);
            // steps = length/speed;
            player.incrementX = dx/length*speed;
            player.incrementY = dy/length*speed;
            // console.log(length)
        }



        
    }




    

}