export default class Player extends Phaser.GameObjects.Sprite{

    constructor(scene,x,y)
    {
        super(scene,x,y,'Arrow')
        scene.add.existing(this);
        this.setScale(0.5);
       
      this.angleFlecha = -90;
       this.angle=-this.angleFlecha;
         
        this.setScale(0.5);
      
    }
    move(teclado)
    {
     if (teclado.left.isDown)
     {
       
          this.angleFlecha -=2; 
        
       
     }
     else if (teclado.right.isDown)
     {
       
          this.angleFlecha +=2; 
        
       
     }
    if (this.angleFlecha > -180 && this.angleFlecha < 0)
    {
  this.angle = this.angleFlecha;
    }
    
     
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
    update()
    {

    }
}