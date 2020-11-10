//This is the rocket class.
//The rocket can move
//The rocket class extends from the entity class.

import Entity from './entity.js'
import Asteroid from './asteroid.js'
import Enemy from './enemy.js';

export default class Rocket extends Entity{
    constructor(x,y,width,height,sprite,whoShooted,spdX=0){
        super(x,y,width,height,sprite);
        this.whoShooted = whoShooted;
        this.id = Rocket.array.length;
        this.spdY = 15;
        this.spdX = spdX;
        this.type = sprite.type;
    }

    delete(){
        delete Rocket.array[this.id]
    }

    move(){

        if(this.whoShooted === 'player'){
            this.y-=this.spdY;
        }else{
            this.y+=this.spdY;
        }
        this.x+=this.spdX
        if(this.x + this.width>= canvas.width){
            this.spdX -= this.spdX*2
        }
        if(this.x <= 0){
            this.spdX -= this.spdX*2
        }
        if(this.type === 'circleRocket'){
            if(this.y<=0){
                this.spdY = -this.spdY;
            }
        }else{
            if(this.y<=0){
                this.delete()
            }
        }
        if(this.y>=canvas.height){
            this.delete()
        }

    }

    checkCollision(){
        if(this.whoShooted === 'player'){
            Asteroid.array.forEach(asteroid => {
                if(asteroid.collision(this)){
                    asteroid.delete()
                    this.delete();
                    player.spdAtk ++;
                    setting.score++;
                }
            })
            Enemy.array.forEach(enemy => {
                if(enemy.collision(this)){
                    enemy.hp--;
                    setting.score+=1;
                    player.spdAtk ++;
                    this.delete();
                }
            })
        }else if(this.whoShooted === 'shipEnemy' || this.whoShooted === 'miniShipEnemy' || this.whoShooted === 'bossEnemy'){
            if(player.collision(this)){
                this.delete();
                player.hp--;
            }
            
        }
    }

    update() {
        this.checkCollision()
        this.move();
        this.draw()   
    }


}
Rocket.array = [];

//This function creates rockets.
Rocket.create = (sprite,whoShooted) =>{
    const newRocket = new Rocket(
        whoShooted.x+whoShooted.width/2-5,
        whoShooted.y,
        10,40,
        sprite,
        whoShooted.type)
    Rocket.array.push(newRocket)
}

//This function creates two-rockets.
Rocket.superCreate = (sprite,whoShooted) => {
    const newRocket1 = new Rocket(
        whoShooted.x+(whoShooted.width/2-5)-10,
        whoShooted.y,
        10,40,
        sprite,
        whoShooted.type)
    Rocket.array.push(newRocket1)
    const newRocket2 = new Rocket(
        whoShooted.x+(whoShooted.width/2-5)+10,
        whoShooted.y,
        10,40,
        sprite,
        whoShooted.type)
    Rocket.array.push(newRocket2)

}
//This function creates space-balls.
Rocket.specialCreate = (sprite,whoShooted) => {
    const newRocket = new Rocket(
        whoShooted.x+whoShooted.width/2-5,
        whoShooted.y,
        40,40,
        sprite,
        whoShooted.type,
        Math.randomBetween(-10,10))
    Rocket.array.push(newRocket)

}