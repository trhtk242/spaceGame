//This is the cannon class.
//The cannon can move and die
//The cannon class extends from the entity class.

import Entity from './entity.js'
import Sprites from '../sprites.js'
import Rocket from './rocket.js'


export default class Cannon extends Entity{
    constructor(width,height,sprite,side,owner){
        super(null,null,width,height,sprite);
        this.side = side;
        this.type = owner.type;
        this.owner = owner;
        this.id = Cannon.array.length
    }

    delete(){
        delete Cannon.array[this.id]
    }

    draw(){
        if(this.side === 'right'){
            ctx.drawImage(
                this.img,
                this.sx,
                this.sy,
                this.swidth
                ,this.sheight
                ,this.owner.x-this.owner.width/5+this.owner.width-this.width
                ,this.owner.y+this.owner.height/2
                ,this.width
                ,this.height)
        }else{
            ctx.drawImage(
                this.img,
                this.sx,
                this.sy,
                this.swidth
                ,this.sheight
                ,this.owner.x+this.owner.width/5
                ,this.owner.y+this.owner.height/2
                ,this.width
                ,this.height)
        }

    }
    shoot(){
        if(this.side === 'right'){
            if(this.atkCounter >= 100){
                Rocket.superCreate(Sprites.miniRocketCannon,this)
                this.atkCounter = 0;
            }
        }else{
            if(this.atkCounter >= 100){
                Rocket.create(Sprites.miniRocketCannon,this)
                this.atkCounter = 0;
            }
        }
    }


    update() {
        if(this.owner.hp <= 0){
            this.delete()
        }
        this.atkCounter +=this.spdAtk;
        this.shoot()
        this.draw()   
    }
}
Cannon.array = [];

//This function creates cannons.
Cannon.create = (owner,sprite,side) =>{
    const newCannon = new Cannon(
        owner.width/5,owner.height/2,
        sprite,
        side,
        owner
        )
        Cannon.array.push(newCannon)
}   