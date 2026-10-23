export default class Load extends Phaser.Scene{

    constructor()
    {
        super({key:'Load'});
    }
    preload()
    {
       this.load.image('BackgroundManagment', 'IMG/FondoGestion.jpg');
       this.load.image('SceneButton', 'IMG/buttonscene.png');
       // Minijuego Programacion
       this.load.spritesheet('playerprog','IMG/playerprog.png',{frameWidth:64,frameHeight:64});
       //this.load.image('objectprog', 'IMG/objectprog.png');
    }
    create()
    {
        this.scene.start('MenuScene')
    }
}