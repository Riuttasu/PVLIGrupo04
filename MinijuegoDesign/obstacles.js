/**Obstaculos que se mueven horizontalmente de derecha a izquierda, 
 * supongo que se genera aleatoriamente entre un rango de tiempo 
 * y se destruyen cuando salen de la pantalla por la izquierda*/

export default class Obstacles extends Phaser.GameObjects.Sprite {
/**Su constructor va a tener los parametros escena, origen x, origen y su sprite 
 * @param {Phaser.Scene} scene // Escena a la que pertenece el obstaculo
 * @param {number} x // Posición horizontal inicial del obstaculo
 * @param {number} y // Posición vertical inicial del obstaculo
*/
    constructor(scene, x, y, player) {
        super(scene, x, y, 'obstacles');
        scene.add.existing(this);
        this.setOrigin(0.5, 0.5);
        this.setScale(0.5);
        // tiene fisicas pero no se mueve 
        this.scene.physics.add.existing(this, true);
        // q colisiones con el player
        this.scene.physics.add.collider(this, player);
    }
    init(){

    }
    preload() {
    }
    create() {
        this.add.image(600, 200, 'obstacles');
    }
    update(t,dt){
    }
}