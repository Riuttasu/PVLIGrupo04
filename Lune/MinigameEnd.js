export default class MinigameEnd extends Phaser.Scene
{
    constructor(sceneKey, win)
    {
        super ({key: 'minigameending'});
        this.backgroundScene = sceneKey;
        this.win = win;
    }
    create()
    {
        this.add.rectangle(0,0,this.scale.width,this.scale.height,0x0000ff,0.5);
        console.log(this.backgroundScene);
        this.scene.pause(this.backgroundScene);
    }
}