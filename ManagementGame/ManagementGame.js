
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
         this.physics.add.collider(ball,this.Wall,() =>{ 
          if(!ball.Placed)
          {
            ball.Placed = true;
            console.log("Me pege");
          this.placeball(ball,1,1);   }//Temporal 
          })
          
    }

    SearchFreeCell(fila,columna) // Metodo para buscar la celda mas cercana a ala colision  //JAVAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
    {
         if(this.balls[fila][columna] === null) // Si ya la posicion creada esta bien simplemente es esa
         {
          return [fila,columna];
         }
         let StartF = Phaser.Math.Clamp(fila-1,0, this.filas-1) //Evitamos salirnos de los limites
         let EndF = Phaser.Math.Clamp(fila + 1, 0, this.filas - 1);//Evitamos salirnos de los limites

         let StartC = Phaser.Math.Clamp(columna-1,0, this.columnas-1) //Evitamos salirnos de los limites
         let EndC = Phaser.Math.Clamp(columna + 1, 0, this.columnas - 1);//Evitamos salirnos de los limites

         let MinDistance = Infinity; //Tenemos que cojer la posición mas cerdana a la colision
         let FreeF = -1; 
         let FreeC = -1;

         let f = StartF; 
         
         while(f<=EndF) //Esto antes era una busqueda pero lo converti en un recordio de ahi el while leugo lo cambio si me da tiempo
         {
             let c = StartC; 
             while(c<=EndC)
          {
            if(this.balls[f][c] === null)
            {
              let distancia = Phaser.Math.Distance.Between(fila,columna,f,c);
              if (distancia < MinDistance)
                {
                    MinDistance = distancia;
                    FreeF = f;
                    FreeC = c;
                }

            }
            c++;
          }
          f++;
         }
      if (FreeF!== -1)
      {
      return [FreeF,FreeC];
      }

      return null;
    }

    GetX(columna, ball) //Metodo para traducir cordenada x a pos pantalla
    {
       return  this.StartX + columna * ball.displayWidth;
       
    }
     GetY(fila, ball) //Metodo para traducir cordenada y a pos pantalla
    {
       return this.StartY + fila* ball.displayHeight; 
    }
    create() //Feo pero feo el codigo este
    {
        let Background =this.add.image(0,0,'BackgroundManagment'); // Cargo el fondo
        Background.setOrigin(0,0);  //Pongo su origen en el 0
        Background.setDisplaySize(1000,500);

        this.player =  new Player(this,500,300,'player');

        this.teclado = this.input.keyboard.createCursorKeys();

        this.balls = []; 

        this.ballsDisparadas = [];

       this.filas = 8;  // preguntar a toni sobre los array bidimensionales en java
       this.columnas = 12; 

       this.PreviousShot = false; // Para no spwanear
       this.StartX = 0; //Donde empieza la cuadricula
       this.StartY = 0;  //Donde empeiza la cuadricula
       this.Wall = this.add.rectangle(300,50,10000,10); // Provisional
       this.physics.add.existing(this.Wall,true);
       for(let f = 0; f<this.filas;f++)
       {
        this.balls[f] =[];
         for(let c = 0; c<this.columnas;c++)
         {
            this.balls[f][c] = null; // preguntar  a toni sobre las matrices
            
         }
       
       }
       
       this.balls[0][2] = "ocupada";
       

     


   console.log("Prueba 1:", this.SearchFreeCell(0, 2));
     console.log("Prueba 2:", this.SearchFreeCell(0, 0));
     console.log("Prueba 3:", this.SearchFreeCell(7, 11)); 
    }
     placeball(ball,fila,columnas)
     {
       if(fila<0 || fila >this.filas || columnas<0 || columnas>=this.columnas)
       {
         console.log("Fuera de límites");
        return;
       }
       if (this.balls[fila][columnas] != null)
       {
        console.log("Celda ocupada");
          return; 
       } 
       let x = this.GetX(columnas,ball)  //Anotacion no se pone ball.sprite.etc porque ball ya es un sprite en si soy bola
       let y = this.GetY(fila,ball)
       console.log(x + " " + y);

       ball.setPosition(x,y);
       ball.body.setVelocity(0, 0);
       ball.body.setAcceleration(0, 0);
       ball.body.moves = false;
       this.balls[fila][columnas] = ball; //No me gusta java decidido
     }
    GetNeighbors(filas,columnas)
    {
        
    }
    update()
    {
       let disparoActual = this.teclado.up.isDown; 
       if(disparoActual && !this.PreviousShot)
       {
        this.CreateBall();
        
       }
        this.PreviousShot = disparoActual;

      this.player.move(this.teclado);
    }
}