class Sprite{
    constructor({position, imageSrc,frames = 1,center,atPosition,sprites={up:'',down:'',left:'',right:''}}){
        this.position = position
        this.atPosition = atPosition
        this.center = center
        this.image = new Image()
        this.image.onload = () => {
            this.loaded = true
            this.width = this.image.width / this.frames
            this.height = this.image.height
        }
        this.image.src = imageSrc
        this.loaded = false
        this.frames = frames
        this.currentFrame = 0
        this.elapsedFrames = 0
        this.frameBuffer = 10
        this.sprites = sprites
        this.Up = new Image()
        this.Down = new Image()
        this.Left = new Image()
        this.Right = new Image()
        this.Up.src = sprites.up
        this.Down.src = sprites.down
        this.Left.src = sprites.left
        this.Right.src = sprites.right
    }
    draw(){
        if(!this.loaded) return
        const cropbox = {
            position: {
                x: this.width * this.currentFrame,
                y:0
            },
            width:this.width,
            height:this.height
        }
        if(this.center){
        ctx.drawImage(
            this.image, 
            cropbox.position.x,
            cropbox.position.y,
            cropbox.width,
            cropbox.height,
            this.position.x-cropbox.width/2,
            this.position.y-cropbox.height,
            this.width,
            this.height
            )
        }else{
            ctx.drawImage(
                this.image, 
                cropbox.position.x,
                cropbox.position.y,
                cropbox.width,
                cropbox.height,
                this.position.x,
                this.position.y,
                this.width,
                this.height
                )
        }

    if(!this.atPosition) {this.updateFrames()}else{this.currentFrame=0}
    }
    updateFrames(){
        this.elapsedFrames++
        // this.currentFrame++
        if(this.elapsedFrames % this.frameBuffer === 0){
        if(this.currentFrame < this.frames-1){
            this.currentFrame++
        }
        else{
            this.currentFrame=0
        }
    }
    }
} 