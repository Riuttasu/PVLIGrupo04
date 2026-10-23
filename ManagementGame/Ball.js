export default class Ball extends Phaser.GameObjects.Sprite{

    constructor(scene,x,y,velocidad)
    {
        super(scene,x,y,'Ball')
        scene.add.existing(this);
        this.setScale(0.5);
        
        this.velocidad = velocidad;
      
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
      this.y -=this.velocidad;
    }
}