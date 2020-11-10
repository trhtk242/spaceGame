//The event file manager the events in the game.
//The keybord for example.

//The keybord events.
document.onkeydown = event =>{
    if(event.keyCode === 68){
        player.movingRight = true;
    }
    if(event.keyCode === 65){
        player.movingLeft = true;
    }
    if(event.keyCode === 72){

        player.simpleAtk()
    }
    if(event.keyCode === 74){
        player.superAtk();
    }
    if(event.keyCode === 75){
        player.specialAtk();
    }
    
}
document.onkeyup = event =>{
    if(event.keyCode === 68){
        player.movingRight = false;
    }
    if(event.keyCode === 65){
        player.movingLeft = false;
    }
}