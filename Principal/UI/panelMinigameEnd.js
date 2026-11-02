export default class panelMinigameEnd extends Phaser.GameObjects.Container
{
    constructor(scene,x,y,bgColor = 0x000000)
    {
        // Super
        super(scene,x,y);
        // add
        this.scene.add.existing(this);
        // rectangulo con el color de fondo
        this.background = new Phaser.GameObjects.Rectangle(this.scene,this.x,this.y,this.scene.scale.width,this.scene.scale.height,bgColor,0.5);
        this.background.setOrigin(0,0);
        this.add(this.background);
        // TODO: botones para volver
    }
}