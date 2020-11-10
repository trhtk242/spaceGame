//This is the gift class.
//The gift can move and die
//The gift class extends from the entity class.

import Entity from './entity.js'

export default class Gift extends Entity{
    constructor(x,y,width,height,sprite,spdX,spdY){
        super(x,y,width,height,sprite);
        this.id = Gift.array.length;
        this.spdX = spdX;
        this.spdY = spdY;
    }

    delete(){
        delete Gift.array[this.id]
    }
    
    

    move(){
        this.x+=this.spdX;
        this.y+=this.spdY;
        if(this.x + this.width>= canvas.width){
            this.spdX -= this.spdX*2
        }
        if(this.x <= 0){
            this.spdX -= this.spdX*2
        }
        if(this.collision(player)){
            this.delete()
            const rnd = Math.randomBetween(0,2);
            switch(rnd){
                case 0:player.hp+=2;
                    break;
                case 1:player.small()
                    break;
                case 2:player.hp+=2;
                    break;
                default:
                    console.log(rnd);
                    break;
            }

        }
    }

    update() {

        this.move();
        this.draw()   
    }
}
Gift.array = [];

//This function creates gifts.
Gift.create = (sprite) =>{
    let size = 40
    const newGift = new Gift(
        Math.randomBetween(0,canvas.width),
        -40,
        size,size,
        sprite,
        Math.randomBetween(-5,5),
        10
        )
        Gift.array.push(newGift)
}        