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
        this.setScale(0.25);
        this.jumpSpeed = 400; // salto de player
        // queremos que el jugador tenga fisicas y cosas etc...
        this.scene.physics.add.existing(this);
        // no queremos que el jugador se salga de los límites del mundo
        this.body.setCollideWorldBounds();
        // this.body... (esta es la propiedad donde puedo acceder a las propiedades fisicas del jugador, 
        // como la gravedad, la velocidad, etc)
        // this.add.existing(floor, true); (esto es para que el suelo tenga fisicas pero no le afecte la gravedad).
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