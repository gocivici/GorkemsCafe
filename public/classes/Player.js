
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
        
        // ctx.fillStyle = this.color;
        
        ctx.textAlign = "center";
        ctx.fillStyle = 'hsla(211, 100%, 100%, 0.5)';
        ctx.font = 'normal 12px sans-serif';
       
        ctx.fillText("Click X&Y :"+[this.clickX,this.clickY], this.position.x, this.position.y-110);
        ctx.fillText("Position: "+[Math.round(this.position.x),Math.round(this.position.y)], this.position.x, this.position.y-98);
        ctx.fillText("Inc X&Y :"+[this.incrementX.toFixed(2),this.incrementY.toFixed(2)], this.position.x, this.position.y-85);

        ctx.font = 'Normal 16px sans-serif';
        ctx.textAlign = "center";
        ctx.fillStyle = 'orange';
        ctx.fillText("user ID: " + this.userId, this.position.x, this.position.y+35);

        ctx.fill()
        
        
    }
    update(){
        if(this.message!=''){SpeechBubble(ctx,ctx.measureText(this.message).width-20,20,'hsla(181, 100%, 100%, 0.6)',this.position.x-25,this.position.y-100,10)}

        ctx.beginPath();
        ctx.textAlign = "center";
        ctx.font = 'bold 18px win98';
        ctx.fillStyle = 'cyan';
        ctx.fillText(this.username, this.position.x, this.position.y+15);
        ctx.font = 'normal 15px sans-serif';
        
        ctx.fillStyle = 'black';
        ctx.fillText(this.message, this.position.x-5, this.position.y-80,200);

        ctx.fill()


        function SpeechBubble(ctx, width, height, color, x, y, radius, text)
        {
          var maxWidth = 300;
          var r = radius;
          var w = (width > maxWidth ? maxWidth : width) + 40;
          var h = ((width > maxWidth ? Math.ceil(width / maxWidth) : 1) * height) + 10;
          var pi2 = Math.PI * 2;
          var ap = w/2-10;
          var aw = 20;
          var ah = 10;
            x = x-(width/2)
          // Speechbubble create start
          ctx.beginPath();
          ctx.arc(x+r, y+r, r, pi2 * 0.5, pi2 * 0.75);
          ctx.arc(x+ w - r, y+ r, r, pi2 * 0.75, pi2);
          ctx.arc(x+w - r,y+ h - r, r, 0, pi2 * 0.25);
          ctx.lineTo(x+w - ap, y+h);
          ctx.lineTo(x+w - ap - (aw / 2),y+ h + ah);
          ctx.lineTo(x+w - ap - aw, y+h);
          ctx.arc(x+r, y+h - r, r, pi2 * 0.25, pi2 * 0.5);
          ctx.fillStyle = color;
          ctx.fill();
          // Speechbubble create end
        
          // Speechbubble text start
        //   ctx.fillStyle = "#fff";
        //   wrapText(ctx, text, 25, 17, maxWidth, 16);
          // Speechbubble text end
        }
        
//ctx.measureText(this.message).width
    
    // if((Math.sign(incrementX)==1&&fPlayer.x<clickCoordinates[0])||(Math.sign(incrementX)==-1&&fPlayer.x>clickCoordinates[0])){fPlayer.x += incrementX;fPlayer.atPosition=false;    socket.emit('clickPositionX',fPlayer.x)}else{fPlayer.atPosition=true}
    // if((Math.sign(incrementY)==1&&fPlayer.y<clickCoordinates[1])||(Math.sign(incrementY)==-1&&fPlayer.y>clickCoordinates[1])){fPlayer.y += incrementY;fPlayer.atPosition=false;    socket.emit('clickPositionY',fPlayer.y)}else{fPlayer.atPosition=true}
    calculateIncrement(this);
        if(length>1){
        
            this.atPosition=false

            if(225<this.angleDeg && this.angleDeg<315){this.image = this.Up}else
            if(45<this.angleDeg && this.angleDeg<135){this.image = this.Down}else
            if(135<this.angleDeg && this.angleDeg<225){this.image = this.Left}else{this.image = this.Right}

            this.position.x+=this.incrementX;
            this.position.y+=this.incrementY;
            // console.log('goingtolocation')
        }else{
            this.atPosition=true
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

