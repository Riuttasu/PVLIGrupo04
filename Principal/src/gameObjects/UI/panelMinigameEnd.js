/**
 * Panel que se mostrara al finalizar un minijuego
 */
export default class panelMinigameEnd extends Phaser.GameObjects.Container
{
    /**
     * 
     * @param {*} scene Escena padre 
     * @param {*} x x = 0 porfa
     * @param {*} y y = 0 porfa
     * @param {*} isWin si se ha ganado o perdido el minijuego, cambia apariencia dependiendo de esto
     * @param {*} backgroundscene escena que hay detras de este panel, no la padre, por si tiene que pausarla o acabarla
     */
    constructor(scene,x,y,isWin = false, backgroundscene = undefined)
    {
        // Super
        super(scene,x,y,[]);
        // add
        this.scene.add.existing(this);
        // rectangulo con el color de fondo
        let bgColor = 0x000000;
        isWin ? bgColor=0x00ff00 : bgColor=0xff0000;
        let background =
        new Phaser.GameObjects.Rectangle(this.scene,this.x,this.y,this.scene.scale.width,this.scene.scale.height,bgColor,0.5);
        background.setOrigin(0,0);
        // texto de ganar/perder
        let infoText = "";
        isWin ? infoText = "Has ganado" : infoText = "Has perdido";
        // Creacion
        let text = 
        new Phaser.GameObjects.Text(this.scene,this.scene.scale.width/2,this.scene.scale.height/3,infoText,{ fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif'});
        text.setOrigin(0.5,0.5);
        text.setScale(2,2);
        // Boton para volver
        let button = 
        new Phaser.GameObjects.Image(this.scene,this.scene.scale.width/2,this.scene.scale.height/3*2,'SceneButton');
        button.setOrigin(0.5,0.5);
        button.setDisplaySize(128,128);
        // Interactividad del boton con funcion
        button.setInteractive();
        button.on('pointerdown', ()=>
            {
                if(backgroundscene!=undefined) this.scene.scene.stop(`${backgroundscene}`);
                this.scene.scene.start('MenuScene', { isWin: isWin, backgroundScene: backgroundscene});
            }
        );
        // Añadir todo
        this.add(background);
        this.add(text);
        this.add(button); 
    }
}