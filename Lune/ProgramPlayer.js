export default class ProgramPlayer extends Phaser.GameObjects.Sprite 
{
    constructor(scene,x,y)
    {
        super(scene,x,y,'playerprog');
        // Parametros
        this.speed = 200; // Velocidad del jugador
        // Le anade a la escena
        this.setScale(1,2); // Le subo la escala TODO: buena escala y eso
        this.scene.add.existing(this); // Objeto en si
        this.scene.physics.add.existing(this); // Fisicas
        // Clamp
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
        if(this.keys.a.isDown) 
        { 
            this.body.setVelocityX(-this.speed); 
            this.setFlipX(true); this.play('playerprogmove',true);}
        else if (this.keys.d.isDown) 
        { 
            this.body.setVelocityX(this.speed); 
            this.setFlipX(false); this.play('playerprogmove',true);
        }
        else 
        {
            this.body.setVelocityX(0);
            this.play('playerprogidle',true);
        }
    }
}