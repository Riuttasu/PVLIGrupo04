export default class Ball extends Phaser.GameObjects.Sprite{

    constructor(scene,x,y,velocidad, color, angulo)
    {
        super(scene,x,y,'Ball')
        scene.add.existing(this);
        scene.physics.add.existing(this) //Añadimos fisica
       
        this.color = color;
        this.Speed = velocidad;
        this.Placed = false;
        if (color == 0)
        {
       this.setTint(0xffff00); 
        console.log("color3");
        }
        else if (color == 1)
        {
           this.setTint(0x00ff00); 
            console.log("color2") ;
        }
        else{
            this.setTint(0xff69b4);
            console.log("color1");
           
        }

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