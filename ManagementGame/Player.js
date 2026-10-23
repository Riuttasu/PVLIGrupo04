export default class Player extends Phaser.GameObjects.Sprite{

    constructor(scene,x,y)
    {
        super(scene,x,y,'Player')
        scene.add.existing(this);
        this.setScale(0.5);
        

        this.setScale(0.5);
      
    }
    move(teclado)
    {
     if (teclado.left.isDown)
     {
        this.x -=5;
     }
     else if (teclado.right.isDown)
     {
        this.x +=5; 
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