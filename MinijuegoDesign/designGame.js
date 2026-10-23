import Player from './player.js';
import Obstacles from './obstacles.js';
/** Esta sera la escena del juego de diseño donde creara el jugador y el obstaculo */
export default class DesignGame extends Phaser.Scene{
    constructor()
    {
         super({key:'DesignGame'});
    }
    init(){

    }
    preload() {
    }
        
    create() {
        this.Player = new Player(this, 100, 300);
        this.Obstacles = new Obstacles(this, 600, 200);
    }
    update(t, dt){
        // movimiento del obstaculo de derecha a izquierda
        this.Obstacles.x -=1.1 * dt;
        // moviminento del jugador con la tecla espaciadora
        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        if (this.space.isDown) {
            this.Player.y -= 1.1 * dt ; // Mueve el jugador hacia arriba
        }
    }
}