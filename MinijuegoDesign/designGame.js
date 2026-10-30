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
        this.Obstacles = new Obstacles(this, 800, 500, this.Player);
        
    }
    update(t, dt){
        // movimiento del obstaculo de derecha a izquierda
        if (this.Obstacles.x <= 0) {
            this.Obstacles.x = 800; // reinicia la posición del obstáculo a la derecha de la pantalla
        }
        this.Obstacles.x -= 1.025 * dt;
        
        // moviminento del jugador con la tecla espaciadora
        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        if (this.space.isDown && this.Player.body.onFloor()) {
            this.Player.body.setVelocityY(-this.Player.jumpSpeed); // saltar hacia arriba
        }
    }
}