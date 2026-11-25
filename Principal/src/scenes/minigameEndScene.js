import panelMinigameEnd from "../gameObjects/UI/panelMinigameEnd.js";
/**
 * Escena de final de minijuego, pausa la escena que la llama en el launch y se lanza en paralelo a esa
 */
export default class minigameEndScene extends Phaser.Scene
{
    constructor()
    {
        super ({key: 'minigameEndScene'});
    }
    /**
     * 
     * @param {*} data win : si se ha ganado, cambiara apariencia key : escena que la llama para pausarla
     */
    init(data)
    {
        // Por si no se manda data
        data.win != undefined ? this.isWin = data.win : this.isWin = false;
        data.key != undefined ? this.backgroundScene = data.key : this.backgroundScene = undefined;
    }
    create()
    {
        // Pausa la escena que lo ha llamado
        if (this.backgroundScene != undefined) this.scene.pause(`${this.backgroundScene}`);
        // Crea el container que tendrá toda la información
        new panelMinigameEnd(this,0,0,this.isWin,this.backgroundScene);
    }
}