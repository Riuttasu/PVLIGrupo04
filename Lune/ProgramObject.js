
export default class ProgramPlayer extends Phaser.GameObjects.Sprite 
{
    constructor(scene,x,y)
    {
        super(scene,x,y,'objectprog');
        // Se mete en la escena
        this.scene.add(this);
    }
}