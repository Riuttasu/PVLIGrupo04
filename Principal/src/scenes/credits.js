export default class credits extends Phaser.Scene{

    constructor()
    {
        super({key:'credits'});
    }
    create()
    {
        // Fondo
        let background = this.add.image(0,0,'creditsBackground');
        background.setDisplaySize(this.scale.width,this.scale.height);
        // Creditos en si
        
        // Boton de volver
        let backButton = this.add.image(900,500,'backButton');
        backButton.setDisplaySize(300,120);
        backButton.setInteractive();
        backButton.on('pointerdown', ()=>{this.scene.start('startMenu');});
    }
}