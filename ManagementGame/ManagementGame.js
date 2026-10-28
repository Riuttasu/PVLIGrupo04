
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
        this.balls = []; 
        this.ballsDisparadas = [];
       this.filas = 3;  // preguntar a toni sobre los array bidimensionales en java
       this.columnas = 3; 
       this.disparoAnterior = false;

       for(let f = 0; f<this.filas;f++)
       {
        this.balls[f] =[];
        this.ballsDisparadas[f] = [];
         for(let c = 0; c<this.columnas;c++)
         {
            this.balls[f][c] = null; //
             this.ballsDisparadas[f][c] = null;
         }
       
       }
    }

    getVecinas(filas,columnas)
    {
        
    }
    update()
    {
       let disparoActual = this.teclado.up.isDown; 
       if(disparoActual && !this.disparoAnterior)
       {
        let ball= new Ball(this,this.player.x,this.player.y,1000,0,this.player.angleFlecha);
        this.ballsDisparadas.push(ball);  // push como los vectores amo los vectores
       }
       this.disparoAnterior = disparoActual;

      this.player.move(this.teclado);
    }
}