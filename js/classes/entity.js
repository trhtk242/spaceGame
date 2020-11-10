//The first class,all classes are extended from it.

export default class Entity{
    constructor(x,y,width,height,sprite){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.sx = sprite.x;
        this.sy = sprite.y;
        this.swidth = sprite.width;
        this.sheight = sprite.height;
        this.img = new Image();
        this.img.src = sprite.img;
    }

    draw(){
        // draw 
        ctx.save();
       /* const  rot = 1;

        let w = (this.x+this.width)/rot;
        let h = (this.y+this.height)/rot;

        ctx.translate(w, h);
        ctx.rotate(Math.PI / rot);
        ctx.translate(-w, -h);
*/
        ctx.drawImage(
            this.img,
            this.sx,
            this.sy,
            this.swidth
            ,this.sheight
            ,this.x, this.y,
             this.width, this.height)

        ctx.restore();
    }

    collision(obj){
        return (this.x < obj.x + obj.width &&
            this.x + this.width > obj.x &&
            this.y < obj.y + obj.height &&
            this.y + this.height > obj.y) 
             
         
    }


}