export default class Load extends Phaser.Scene{

    constructor()
    {
         super({key:'Load'});
    }
    preload()
    {
       this.load.image('BackgroundManagment', 'IMG/FondoGestion.jpg');
       this.load.image('SceneButton', 'IMG/buttonscene.png');
        this.load.image('Player', 'IMG/Player.png');
        this.load.image('Ball', 'IMG/Ball.png');
        this.load.image('Arrow', 'IMG/Arrow.png');

    }
    create()
    {
        this.scene.start('MenuScene')
    }
}