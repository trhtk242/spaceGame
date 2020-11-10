//This js is the main js.

import Player from './classes/player.js';
import Rocket from './classes/rocket.js';
import Asteroid from './classes/asteroid.js';
import Enemy from './classes/enemy.js';
import Gift from './classes/gift.js';
import Cannon from './classes/cannon.js';
import Sprites from './sprites.js'

//The function starts the game
function start(){
    player = new Player(canvas.width/2-50,canvas.height-150,100,100,Sprites.playerShip);
    setting.frame = 0;
    setting.score = 0;
    setting.didBosscome = false;
    setting.win = false;
    Enemy.array = [];
    Asteroid.array = [];
    Gift.array = [];
    Rocket.array = [];
    Cannon.array=[];
}

//Starting the game.
start();

//The loop game 
const loopGame = setInterval(()=>{
    //When alerts open
    if(setting.swal){
        return false;
    }

    //When the player is dead.
    if(player.hp <= 0 &&! setting.swal){
        setting.swal = true;
        Swal.fire({
            title: '<h1>You lost!</h1>',
            width:canvas.width,
            confirmButtonText:'Play again',
            cancelButtonText:'It\'s lame',
            showCancelButton:true,
            html:
            `<div class="swal">
                <b>Score:</b>${setting.score}<br>
                <b>Time:</b>${(setting.frame/1000)*40} seconds<br>
            </div>`
        }).then((result) => {
            if (result.isConfirmed) {
                start();
                setting.swal = false;
            }else{
                Swal.fire('We\'re very sorry to hear it.\n Play again.').then(()=>{
                    start();
                    setting.swal = false;
                })
            }
          })
        return false;
        
    }

    //When player wins.
    if(setting.win &&! setting.swal){
        setting.swal = true;
        Swal.fire({
            title: '<h1>You won!</h1>',
            width:canvas.width,
            confirmButtonText:'Play again',
            cancelButtonText:'It\'s lame',
            showCancelButton:true,
            html:
            `<div class="swal">
                <b>Score:</b>${setting.score}<br>
                <b>Time:</b>${(setting.frame/1000)*40} seconds<br>
            </div>`
        }).then((result) => {
            if (result.isConfirmed) {
                start();
                setting.swal = false;
            }else{
                Swal.fire('We\'re very sorry to hear it.\n Play again.').then(()=>{
                    start();
                    setting.swal = false;
                })
            }
          })
        return false;
    }

    setting.frame++;

    ctx.clearRect(0,0,canvas.width,canvas.height,0,0,1000,1000)

    /*
    ctx.save();
    ctx.fillStyle = "#09f";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.globalCompositeOperation = "lighter";
    ctx.restore()
    */

    //Drawing the background img.
    const img = new Image();
    img.src = '../img/back.jpg'
    ctx.drawImage(img,0, 0, canvas.width, canvas.height);

    //Writing the score and player's hp.
    ctx.fillStyle = 'yellow'
    ctx.font = "25px Arial";
    ctx.fillText(`Hp:${player.hp}`, 10, 50);
    ctx.fillText(`Score:${setting.score}`, canvas.width-150,50);

    //Creating enemies and gifts.
    if(!setting.didBosscome&& setting.score>=50){
        enemyBoss = Enemy.bossCreate(Sprites.shipEnemy)
        setting.didBosscome = true;
    }

    if(setting.frame % 50 === 0){//every 200 ms
        Asteroid.create(Sprites.asteroid)

    }
    if(setting.frame % 100 === 0){//every 4 s
        Enemy.create(Sprites.miniShipEnemy)
    }
    if(setting.frame % 150 === 0){//every 6 s
        Gift.create(Sprites.gift)
    }
    if(setting.frame % 250 === 0){//every 10 s
        Enemy.superCreate(Sprites.shipEnemy)
    }

    //Drawing all the entities.
    player.update();

    Asteroid.array.forEach(asteroid => {
        asteroid.update();
    })
    Gift.array.forEach(gift => {
        gift.update();
    })
    Enemy.array.forEach(enemy => {
        enemy.update();
    })

    Cannon.array.forEach(cannon => {
        cannon.update();
    })
    Rocket.array.forEach(rocket => {
        rocket.update()
    })
},setting.speedGame)