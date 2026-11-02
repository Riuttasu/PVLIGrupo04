import panelMinigameEnd from "../Principal/UI/panelMinigameEnd.js";

export default class programmingMinigameEnd extends Phaser.Scene
{
    constructor(sceneKey = undefined,isWin = false)
    {
        super ({key: 'programmingMinigameEnd'});
        this.backgroundScene = sceneKey;
        this.isWin = isWin;
    }
    init(data)
    {
        if(data.win != undefined) this.isWin = data.win;
        if(data.key != undefined) this.backgroundScene = data.key;
    }
    create()
    {
        // Pausa la escena que lo ha llamado
        if (this.backgroundScene != undefined) this.scene.pause(`${this.backgroundScene}`);
        // Crea un panel que cubrirá toda la pantalla
        // El color depende de si se ha ganado el minijuego o no
        let color = 0x000000; 
        this.isWin ? color = 0x00ff00 : color = 0xff0000;
        // Crea el panel
        this.panel = new panelMinigameEnd(this,0,0,color);
    }
}