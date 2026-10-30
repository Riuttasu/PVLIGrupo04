
export default class ProgramObject extends Phaser.GameObjects.Sprite 
{
    constructor(scene,x,y,gravity=100)
    {
        super(scene,x,y,'objectprog');
        // Se mete en la escena
        this.scene.add.existing(this); // objeto en si
        this.scene.physics.add.existing(this); // fisicas
        this.body.setGravityY(gravity);
    }
    preUpdate(t,dt)
    {
        if(this.body.y > this.scene.scale.height-this.displayHeight/2) 
        {
            this.scene.lose();
        }
    }
}