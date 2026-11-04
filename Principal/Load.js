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

         // Minijuego Design
       this.load.image('obstacles', '../IMG/MinijuegoDesign/obstacles.png');
       this.load.image('player', '../IMG/MinijuegoDesign/player.png');


       // Minijuego Programacion
       this.load.spritesheet('playerprog','IMG/playerprog.png',{frameWidth:64,frameHeight:64});
       this.load.image('objectprog', 'IMG/objectprog.png');
       this.load.image('BackgroundProgramming', 'IMG/backgroundprog.png');
    }
    create()
    {
        this.scene.start('MenuScene');
    }
}