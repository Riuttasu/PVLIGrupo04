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
        new Phaser.GameObjects.Rectangle(this.scene,this.x,this.y,this.scene.scale.width,this.scene.scale.height,bgColor,0.25);
        background.setOrigin(0,0);
        // texto de minijuego terminado
        let headerText = new Phaser.GameObjects.Text(this.scene,this.scene.scale.width/2,this.scene.scale.height/4,"Entrenamiento terminado",
            { color: '#03d4c6', fontSize: '50px', fontFamily: "paperFont"});
        headerText.setOrigin(0.5,0.5);
        headerText.setStroke("#000000",16);
        // texto de ganar/perder
        let infoText = isWin ? "Has ganado :)" : "Has perdido :(";
        let infoColour = isWin ? "#00ff00" : "#ff0000";
        let text = 
        new Phaser.GameObjects.Text(this.scene,this.scene.scale.width/2,this.scene.scale.height/2,infoText,
            { color: infoColour, fontSize: '40px', fontFamily: "paperFont"});
        text.setOrigin(0.5,0.5);
        text.setStroke("#000000",10);
        // Boton para volver
        let button = 
        new Phaser.GameObjects.Image(this.scene,this.scene.scale.width/2,4*this.scene.scale.height/5,'backButton');
        button.setOrigin(0.5,0.5);
        button.setDisplaySize(300,100);
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
        this.add(headerText);
        this.add(text);
        this.add(button); 
    }
}