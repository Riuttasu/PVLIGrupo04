/** escena principal de minigame de design*/
import Player from './player.js';
import Obstacles from './obstacles.js';
/** Esta sera la escena del juego de diseño donde creara el jugador y el obstaculo */
export default class DesignGame extends Phaser.Scene{
    constructor(timeGame = 30)
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
        this.preloadlayer = new Player(this, 100, 500, 600);
        this.obstacles = this.add.group();
        
        //times en segundos
        this.timeMax = 2; // tiempo maximo para generar obstaculos
        this.timeMin = 1; // y este es el minimo
        this.randomTime; // el timepo que va a tardar en generar el siguienteobstaculo
        this.timeNow = 0; // timepo actual
        this.randomTime = Phaser.Math.RND.between(this.timeMin * 1000, this.timeMax * 1000); 
    }
    update(t, dt){
        this.timeGame -= dt/1000; // restamos el tiempo transcurrido desde la ultima actualizacion
        if(this.timeGame <= 0){
            this.scene.start('MenuScene'); // si el tiempo se acaba, volvemos al menu
        }
        this.timeNow += dt; // sumamos el tiempo transcurrido desde la ultima actualizacion
        // genera un tiempo aleatorio entre el minimo y el maximo
        if (this.timeNow >= this.randomTime) {
            this.spawnObstacles();
            this.timeNow = 0;
        }
    }
    // meotodo en la que genera un obstaculo y lo añade al grupo "Obstacles". 
    // Uso: es llamado en el metodo update() cuando el tiempo transcurrido desde la ultima 
    // generacion de obstaculos es mayor o igual al tiempo aleatorio generado entre el minimo y el maximo.
    spawnObstacles() {
        this.obstacles.add(new Obstacles(this, 800, 550, this.preloadlayer));
        this.randomTime = Phaser.Math.RND.between(this.timeMin * 1000, this.timeMax * 1000); 
    }
    // metodo para eliminar un obstaculo del grupo "Obstacles" y de la escena.
    // Uso: es llamado en el metodo preUpdate() de la clase Obstacles cuando el obstaculo 
    // sale de la pantalla por la izquierda.
    remove(object){
        this.obstacles.remove(object, true, true); // elimina el obstaculo del grupo y de la escena
    }
}