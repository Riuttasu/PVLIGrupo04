import panelMinigameEnd from "../Principal/UI/panelMinigameEnd.js";

export default class programmingMinigameEnd extends Phaser.Scene
{
    constructor()
    {
        super ({key: 'programmingMinigameEnd'});
    }
    init(data)
    {
        data.win != undefined ? this.isWin = data.win : this.isWin = false;
        data.key != undefined ? this.backgroundScene = data.key : this.backgroundScene = '';
        if(data.win != undefined) this.isWin = data.win;
        if(data.key != undefined) this.backgroundScene = data.key;
    }
    create()
    {
        // Pausa la escena que lo ha llamado
        if (this.backgroundScene != undefined) this.scene.pause(`${this.backgroundScene}`);
        // Crea el container que tendrá toda la información
        new panelMinigameEnd(this,0,0,this.isWin);
    }
}