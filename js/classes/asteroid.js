//This is the asteroid class.
//The asteroid can move and die
//The asteroid class extends from the entity class.

import Entity from './entity.js';
import Sprites from '../sprites.js';
import Explosion from './explosion.js';

export default class Asteroid extends Entity{
    constructor(x,y,width,height,sprite,spdX,spdY){
        super(x,y,width,height,sprite);
        this.id = Asteroid.array.length;
        this.spdX = spdX;
        this.spdY = spdY;
    }

    delete(){
        Explosion.create(this,Sprites.explosion);
        delete Asteroid.array[this.id]
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
            player.hp--;
        }
    }

    update() {

        this.move();
        this.draw()   
    }
}
Asteroid.array = [];

//This function creates asteroids.
Asteroid.create = (sprite) =>{
    let size = Math.randomBetween(20,60);
    const newAsteroid = new Asteroid(
        Math.randomBetween(0,canvas.width),
        -40,
        size,size,
        sprite,
        Math.randomBetween(-5,5),
        Math.randomBetween(5,10)
        )
        Asteroid.array.push(newAsteroid)
}        