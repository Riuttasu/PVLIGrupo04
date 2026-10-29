export default class Ball extends Phaser.GameObjects.Sprite{

    constructor(scene,x,y,velocidad, color, angulo)
    {
        super(scene,x,y,'Ball')
        scene.add.existing(this);
        scene.physics.add.existing(this) //Añadimos fisica
        this.setScale(0.2);
        this.color = color;
        this.velocidad = velocidad;

        // Phaser te amo venditos tutoriales mentira te odia quewhf`Q´R 034U`'2 4
        let velocidadxy = scene.physics.velocityFromAngle(angulo, velocidad);
        this.body.setVelocity(velocidadxy.x, velocidadxy.y);
    }
   
    init()
    {

    }
    preload()
    {

    }
    create()
    {
    
    }
    up()
    {
    
    }
    update()
    {
      
    }
}