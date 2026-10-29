
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
    
    CreateBall() // Metodo que crea las bolas y se encarga de que cuando chocquen contra la pared se detengan
    {
       
    let ball= new Ball(this,this.player.x,this.player.y,1000,0,this.player.angleFlecha);
        this.ballsDisparadas.push(ball);  // push como los vectores amo los vectoresç
         this.physics.add.collider(ball,this.pared,() =>{
           
          this.placeball(ball,1,2); 
        })
    }

    buscarCeldaLibre(ball)
    {
        
    }
    create() //Feo pero feo 
    {
        let fondo =this.add.image(0,0,'BackgroundManagment');
        fondo.setOrigin(0,0); 
        fondo.setDisplaySize(1000,500);
        this.player =  new Player(this,500,500,'player');
        this.teclado = this.input.keyboard.createCursorKeys();
        this.balls = []; 
        this.ballsDisparadas = [];
       this.filas = 8;  // preguntar a toni sobre los array bidimensionales en java
       this.columnas = 12; 
       this.disparoAnterior = false;
       this.inicioX = 0; 
       this.inicioY = 0; 
       this.pared = this.add.rectangle(300,50,10000,10);
       this.physics.add.existing(this.pared,true);
       for(let f = 0; f<this.filas;f++)
       {
        this.balls[f] =[];
         for(let c = 0; c<this.columnas;c++)
         {
            this.balls[f][c] = null; //
            
         }
       
       }
    }
     placeball(ball,fila,columnas)
     {
       if(fila<0 && fila >this.filas && columna<0 && columna>this.columnas)
       {
       
        return;
       }
       if (this.balls[fila][columnas] != null)
       {
         
          return; 
       } 
       let x = this.inicioX + columnas * ball.displayWidth;  //Anotacion no se pone ball.sprite.etc porque ball ya es un sprite en si soy bola
       let y = this.inicioY + fila* ball.displayHeight; 
       console.log(x + " " + y);
       ball.setPosition(x,y);
       ball.body.setVelocity(0, 0);
       ball.body.setAcceleration(0, 0);
       ball.body.moves = false;
       this.balls[fila][columnas] = ball; //No me gusta java decidido
     }
    getVecinas(filas,columnas)
    {
        
    }
    update()
    {
       let disparoActual = this.teclado.up.isDown; 
       if(disparoActual && !this.disparoAnterior)
       {
        this.CreateBall();
        
       }
        this.disparoAnterior = disparoActual;

      this.player.move(this.teclado);
    }
}