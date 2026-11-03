export default class panelMinigameEnd extends Phaser.GameObjects.Container
{
    constructor(scene,x,y,isWin = false)
    {
        // Super
        super(scene,x,y,[]);
        // add
        this.scene.add.existing(this);
        // rectangulo con el color de fondo
        let bgColor = 0x000000;
        isWin ? bgColor=0x00ff00 : bgColor=0xff0000;
        this.background = 
        new Phaser.GameObjects.Rectangle(this.scene,this.x,this.y,this.scene.scale.width,this.scene.scale.height,bgColor,0.5);
        this.background.setOrigin(0,0);
        this.add(this.background);
        // texto de ganar/perder
        let infoText = "";
        isWin ? infoText = "Has ganado" : infoText = "Has perdido";
        this.text = new Phaser.GameObjects.Text(this.scene,0,0,infoText,{ fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif'});
        this.text.setPosition(this.scene.scale.width/2,this.scene.scale.height/3);
        this.text.setAlign("center");
        this.text.setDisplaySize(200,100);
        this.add(this.text);
    }
}