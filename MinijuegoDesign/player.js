/** Jugador se mueve verticalmente (saltando) usando la tecla espaciadora
 * he metido un motono de cosas sobre fisicas y colisiones
*/

export default class Player extends Phaser.GameObjects.Sprite {
    /** esto es lo que va a tener el constructor 
    *@param {Phaser.Scene} scene // Escena a la que pertenece el jugador
    *@param {number} x // Posición horizontal inicial del jugador
    *@param {number} y // Posición vertical inicial del jugador
    */
    //constructor del jugador, en la cual determina su pusicion inicial, su escala y su sprite 
    // (creo, no estoy seguro)
    constructor(scene, x, y, gravity) {
        super(scene, x, y, 'player');
        scene.add.existing(this);
        this.setOrigin(0.5, 0.5);
        this.setScale(0.125);
        this.jumpSpeed = 500; // velocidad de salto de player

        // queremos que el jugador tenga fisicas y cosas etc...
        this.scene.physics.add.existing(this);
        this.body.setGravityY(gravity); // gravedad del jugador
        this.body.setCollideWorldBounds();// no queremos que el jugador se salga de los límites del mundo

        // tecla espaciadora para saltar, se añade a la escena
        this.space = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }
    
    preUpdate(t,dt){
        // moviminento del jugador con la tecla espaciadora
        if (this.space.isDown && this.body.onFloor()) {
            this.body.setVelocityY(-this.jumpSpeed); // saltar hacia arriba
        }
    }
}