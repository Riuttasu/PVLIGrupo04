export default class Player extends Phaser.GameObjects.Sprite{

    constructor(scene,x,y)
    {
        super(scene,x,y,'Arrow')
        scene.add.existing(this);
        this.setScale(0.5);
        this.angle=-90;
      
         
        this.setScale(0.5);
      
    }
    move(teclado)
    {
     if (teclado.left.isDown)
     {
        if(this.angle>-180)
        {
          this.angle -=10; 
        }
       
     }
     else if (teclado.right.isDown)
     {
        if(this.angle<180)
        {
          this.angle +=10; 
        }
       
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