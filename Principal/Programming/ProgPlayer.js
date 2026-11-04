export default class ProgPlayer extends Phaser.GameObjects.Sprite 
{
    constructor(scene,x,y)
    {
        super(scene,x,y,'playerprog');
        // Parametros
        this.speed = 500; // Velocidad del jugador
        this.setDisplaySize(64,128); // Tamaño
        // Le anade a la escena
        this.scene.add.existing(this); // Objeto en si
        this.scene.physics.add.existing(this); // Fisicas
        // Clamp del cuerpo fisico
        this.body.setCollideWorldBounds(true);
        // Input
        this.keys = {};
        this.keys.a = this.scene.input.keyboard.addKey("A"); // Izq
        this.keys.d = this.scene.input.keyboard.addKey("D"); // Der
        // Anims
        this.anims.create({ // Idle
            key: 'playerprogidle',
            frames: this.anims.generateFrameNumbers('playerprog', { start: 0, end: 7 }),
            frameRate: 8, 
            repeat: -1    
        });
        this.anims.create({ // Movimiento
            key: 'playerprogmove',
            frames: this.anims.generateFrameNumbers('playerprog', { start: 8, end: 13 }),
            frameRate: 8, 
            repeat: 0    
        });
    }
    preUpdate(t,dt)
    {
        super.preUpdate(t,dt);
        // Movimiento y animaciones
        // Direccion
        let dir = 0;
        if (this.keys.a.isDown) dir -= 1;
        if (this.keys.d.isDown) dir += 1;
        // Movimiento
        if (dir != 0)
        {
            dir == 1 ? this.setFlip(false) : this.setFlip(true); // Flip dependiendo de dir
            this.body.setVelocityX(this.speed*dir); // Velocidad, no va con dt por fisicas
            this.play('playerprogmove',true); // Animacion
        }
        else  // Falta de movimiento
        {
            this.body.setVelocityX(0); // Para la velocidad
            this.play('playerprogidle',true); // Cambia la animacion a idle
        }
    }
}