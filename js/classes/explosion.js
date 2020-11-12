//This is the explosion class.
//The explosion can move and die
//The explosion class extends from the entity class.

import Entity from './entity.js'

export default class Explosion extends Entity{
    constructor(x,y,width,height,sprite){
        super(x,y,width,height,sprite);
        this.id = Explosion.array.length;
        this.animation= 0;
    }

    delete(){
        delete Explosion.array[this.id];
    }

    draw(){
        const currentFilm = Math.floor(this.animation);

        ctx.drawImage(
            this.img,
            this.swidth*currentFilm,
            this.sy,
            this.swidth
            ,this.sheight
            ,this.x, this.y,
             this.width, this.height)

    }

    update() {
        this.animation+=0.5;

        if(this.animation > 7){
            //this.delete();
        }
        this.draw()   
    }
}
Explosion.array = [];

//This function creates explosions.
Explosion.create = (owner,sprite) =>{
    let size = owner.width;
    const newExplosion = new Explosion(
        owner.x,owner.y,
        size,size,
        sprite,
        )
        Explosion.array.push(newExplosion)
}        