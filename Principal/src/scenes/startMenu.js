export default class StartMenu extends Phaser.Scene{

    constructor()
    {
        super({key:'startMenu'});
    }
    create()
    {
        console.log("StartMenu");
        // Boton de empezar el juego
        let startButton = this.add.image(700,400,'SceneButton');
        startButton.setInteractive();
        startButton.on('pointerdown', ()=>{this.scene.start('MenuScene');});
        // Boton de opciones (TODO)
        let optionsButton = this.add.image(700,500,'SceneButton');
    }
}