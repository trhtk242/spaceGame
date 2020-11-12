//This is the enemy class.
//The enemy can move and die
//The enemy class extends from the entity class.

import Entity from './entity.js'
import Sprites from '../sprites.js'
import Rocket from './rocket.js'
import Cannon from './cannon.js'
import Explosion from './explosion.js';


export default class Enemy extends Entity{
    constructor(x,y,width,height,sprite,spdX,spdY,spdAtk,hp){
        super(x,y,width,height,sprite);
        this.id = Enemy.array.length;
        this.spdX = spdX;
        this.spdY = spdY;
        this.spdAtk = spdAtk;//speed attak
        this.atkCounter = 0;
        this.type = sprite.type;
        this.hp = hp;
    }

    delete(){
        Explosion.create(this,Sprites.explosion)
        delete Enemy.array[this.id]
    }
    
    

    move(){
        this.y+=this.spdY;

        if(this.type !== 'bossEnemy'){
            if(this.x + this.width>= canvas.width){
                this.spdX -= this.spdX*2
            }
            if(this.x <= 0){
                this.spdX -= this.spdX*2
            }
        }else{
            if(this.x + this.width + 50>= canvas.width){
                this.spdX -= this.spdX*2
            }
            if(this.x - 50 <= 0){
                this.spdX -= this.spdX*2
            }
        }
        if(this.y>=100){
            this.spdY = 0;
            this.x+=this.spdX;

        }
        
    }

    shoot(){
        if(this.type === 'shipEnemy'){
            if(this.atkCounter >= 100){
                Rocket.superCreate(Sprites.miniRocketEnemy,this)
                this.atkCounter = 0;
            }
        }if(this.type === 'bossEnemy'){
            if(this.atkCounter >= 100){
                this.x+=this.width/5
                Rocket.superCreate(Sprites.miniRocketEnemy,this)
                this.x-=(this.width/5)*2
                Rocket.create(Sprites.miniRocketEnemy,this)
                this.x+=this.width/5
                this.atkCounter = 0;
            }
        }else{
            if(this.atkCounter >= 100){
                Rocket.create(Sprites.miniRocketEnemy,this)
                this.atkCounter = 0;
            }
        }
    }
    cannon(sprite,side){
        Cannon.create(this,sprite,side)
    }

    update() {
        if(this.hp <= 0){
            this.delete();
            player.spdAtk++;
        }
        this.atkCounter +=this.spdAtk;
        this.shoot()
        this.move();
        this.draw()   
    }
}
Enemy.array = [];

//This function creates mini-enemies.
Enemy.create = (sprite) =>{
    const size = 50

    const newEnemy = new Enemy(
        Math.randomBetween(0,canvas.width-size),
        -40,
        size,size,
        sprite,
        7,
        10,1,5
        )
        Enemy.array.push(newEnemy)
}    

//This function creates enemies.
Enemy.superCreate = (sprite) =>{
    const size = 100
    const newEnemy = new Enemy(
        Math.randomBetween(0,canvas.width-size),
        -40,
        size,size,
        sprite,
        7,
        10,
        2,
        15
        )
        Enemy.array.push(newEnemy)
} 

//This function creates the enemy boss.
Enemy.bossCreate = (sprite) =>{
    const size = 200
    const newEnemy = new Enemy(
        canvas.width/2-size/2,0-size,
        size,size,
        sprite,
        2,
        2,
        10,
        40);
        newEnemy.cannon(Sprites.cannonEnemy1,'left')
        newEnemy.cannon(Sprites.cannonEnemy2,'right')
        newEnemy.type = 'bossEnemy'
        newEnemy.delete = () => {
            setTimeout(()=>setting.win = true,700)
            
            Explosion.create(newEnemy,Sprites.explosion)
            delete Enemy.array[newEnemy.id]
        }
        Enemy.array.push(newEnemy)

}