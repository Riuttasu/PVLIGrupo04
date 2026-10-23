/** Jugador se mueve verticalmente (saltando) usando la tecla espaciadora*/
export default class Player extends Phaser.GameObjects.Sprite {
    /** esto es lo que va a tener el constructor 
    *@param {Phaser.Scene} scene // Escena a la que pertenece el jugador
    *@param {number} x // Posición horizontal inicial del jugador
    *@param {number} y // Posición vertical inicial del jugador
    */
    //constructor del jugador, en la cual determina su pusicion inicial, su escala y su sprite 
    // (creo, no estoy seguro)
    constructor(scene, x, y) {
        super(scene, x, y, 'player');
        scene.add.existing(this);
        this.setOrigin(0.5, 0.5);
        this.setScale(0.5);
        //this.physics.add.existing(this);
    }
    init(){

    }
    preload() {
    }
    create() {
        this.add.image(100, 300, 'player');
    }
    update(t,dt){
    }
}