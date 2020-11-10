//This is the player class.
//The player can move,shoot and die.
//The player class extends from the entity class.
import Rocket from './rocket.js'
import Entity from './entity.js'
import Sprites from '../sprites.js'
import Cannon from './cannon.js'

export default class Player extends Entity{
    constructor(x,y,width,height,sprite){
        super(x,y,width,height,sprite);
        this.movingRight = false;
        this.movingLeft = false;
        this.type = 'player';
        this.hp = 10;
        this.spdAtk = 5;//speed attak
        this.atkCounter = 0;
    }

    move(){
        if(this.movingRight){
            this.x+=10;
        }else if(this.movingLeft){
            this.x-=10;
        }
        if(this.x + this.width>= canvas.width){
            this.x = canvas.width - this.width
        }
        if(this.x <= 0){
            this.x = 0;
        }
    }

    update() {
        this.atkCounter +=this.spdAtk;
        this.move();
        this.draw();   
    }

    simpleAtk(){
        if(this.atkCounter >= 50){
            Rocket.create(Sprites.miniRocket,this)
            this.atkCounter = 0;
        }
    }
    superAtk(){
        if(this.atkCounter >= 200){
            Rocket.superCreate(Sprites.rocket,this)
            this.atkCounter = 0;
        }
    }
    specialAtk(){
        if(this.atkCounter >= 300){
            Rocket.specialCreate(Sprites.circleRocket,this)
            this.atkCounter = 0;
        }
    }
    small(){
        player.width-=40;
        player.height-=40;
        setTimeout(()=>{
            player.width+=40;
            player.height+=40;
        },4000)
    }
    cannon(sprite,side){
        Cannon.create(this,sprite,side)
    }
}