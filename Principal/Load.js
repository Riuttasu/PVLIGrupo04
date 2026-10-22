export default class Load extends Phaser.Scene{

    constructor()
    {
         super({key:'Load'});
    }
    preload()
    {
       this.load.image('BackgroundManagment', 'IMG/FondoGestion.jpg');
       this.load.image('SceneButton', 'IMG/buttonscene.png');

    }
    create()
    {
        this.scene.start('MenuScene');
    }
}