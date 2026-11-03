
//Creo una clase llamada managementscene
//Heredo la clase scene de phase para que funcione como una escena de juego, Prgeuntar Toni
//Dentro describo lo que hara mi escena
import Player from './Player.js';
import Ball from './Ball.js';
export default class ManagementGame extends Phaser.Scene{

    constructor()
    {
        super({key: 'ManagementGame'});
    }
    
    create()
    {
        let fondo =this.add.image(0,0,'BackgroundManagment');
        fondo.setOrigin(0,0); 
        fondo.setDisplaySize(1000,500);
        this.player =  new Player(this,500,500,'player');
        this.teclado = this.input.keyboard.createCursorKeys();
    }
    update()
    {
       if (this.teclado.up.isDown)
       {
        let ball = new Ball(this,this.player.angle, 500,500);
        console.log(this.player.angle);
       }
        this.player.move(this.teclado);
        
      
    }
}