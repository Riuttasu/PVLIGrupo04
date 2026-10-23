export default class Load extends Phaser.Scene{

    constructor()
    {
         super({key:'Load'});
    }
    preload()
    {
       this.load.image('BackgroundManagment', 'IMG/FondoGestion.jpg');
       this.load.image('SceneButton', 'IMG/buttonscene.png');

       this.load.image('obstacles', '../IMG/MinijuegoDesign/obstacles.png');
       this.load.image('player', '../IMG/MinijuegoDesign/player.png');

    }
    create()
    {
        this.scene.start('MenuScene');
    }
}