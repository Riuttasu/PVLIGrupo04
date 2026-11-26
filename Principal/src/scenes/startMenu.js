export default class startMenu extends Phaser.Scene{

    constructor()
    {
        super({key:'startMenu'});
    }
    create()
    {
        // Fondo
        let fondo = this.add.image(0,0,'mainBackground');
        fondo.setDisplaySize(this.scale.width,this.scale.height);
        // Boton de empezar el juego
        let startButton = this.add.image(900,350,'playButton');
        startButton.setDisplaySize(300,120);
        startButton.setInteractive();
        startButton.on('pointerdown', ()=>{this.scene.start('selectCharacter');});
        // Boton de creditos
        let creditsButton = this.add.image(900,500,'creditsButton');
        creditsButton.setDisplaySize(300,120);
        creditsButton.setInteractive();
        creditsButton.on('pointerdown', ()=>{this.scene.start('credits');});
        // Boton de opciones (TODO)
        //let optionsButton = this.add.image(700,500,'sceneButton');
    }
}