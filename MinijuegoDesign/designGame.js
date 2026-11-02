/** escena principal de minigame de design*/
import Player from './player.js';
import Obstacles from './obstacles.js';
/** Esta sera la escena del juego de diseño donde creara el jugador y el obstaculo */
export default class DesignGame extends Phaser.Scene{
    constructor(timeGame = 10)
    {
         super({key:'DesignGame'});
         this.panel = false;
         this.timeGame = timeGame; // tiempo de juego en segundos
    }
    init(){

    }
    preload() {
    }
        
    create() {
        // creamos objetos del juego
        this.Player = new Player(this, 100, 500, 500);
        this.Obstacles = this.add.group();
        
        //times en segundos
        this.timeMax = 4; // tiempo maximo para generar obstaculos
        this.timeMin = 2; // y este es el minimo
        this.randomTime; // el timepo que va a tardar en generar el siguienteobstaculo
        this.timeNow = 0; // timepo actual
    }
    update(t, dt){
        this.timeGame -= dt/1000; // restamos el tiempo transcurrido desde la ultima actualizacion
        if(this.timeGame <= 0){
            this.scene.start('MenuScene'); // si el tiempo se acaba, volvemos al menu
        }
        this.timeNow += dt; // sumamos el tiempo transcurrido desde la ultima actualizacion
        // genera un tiempo aleatorio entre el minimo y el maximo
        this.randomTime = Phaser.Math.RND.between(this.timeMin * 1000, this.timeMax * 1000); 
        if (this.timeNow >= this.randomTime) {
            this.spawnObstacles();
            this.timeNow = 0;
        }
    }
    // meotodo en la que genera un obstaculo y lo añade al grupo "Obstacles". 
    // Uso: es llamado en el metodo update() cuando el tiempo transcurrido desde la ultima 
    // generacion de obstaculos es mayor o igual al tiempo aleatorio generado entre el minimo y el maximo.
    spawnObstacles() {
        this.Obstacles.add(new Obstacles(this, 800, 550, this.Player));
    }
    // metodo para eliminar un obstaculo del grupo "Obstacles" y de la escena.
    // Uso: es llamado en el metodo preUpdate() de la clase Obstacles cuando el obstaculo 
    // sale de la pantalla por la izquierda.
    remove(object){
        this.Obstacles.remove(object, true, true); // elimina el obstaculo del grupo y de la escena
    }
}