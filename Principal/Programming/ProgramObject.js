
export default class ProgramObject extends Phaser.GameObjects.Sprite 
{
    constructor(scene,x,y,gravity=100)
    {
        super(scene,x,y,'objectprog');
        // Escala
        this.setDisplaySize(32,32);
        // Se mete en la escena
        this.scene.add.existing(this); // Objeto en si
        this.scene.physics.add.existing(this); // Fisicas
        // Fisicas
        this.body.setGravityY(gravity); // Gravedad
    }
    preUpdate(t,dt)
    {
        if(this.body.y > this.scene.scale.height-this.displayHeight/2) 
        {
            this.scene.lose();
        }
    }
}