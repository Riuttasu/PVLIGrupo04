/**esta es una escena que sirve para elegir el minijuego */
export default class MenuChooseMiniGame extends Phaser.Scene {
    constructor() {
        super({key: 'MenuChooseMiniGame'});
    }
    create() {
        //fondo de la escena
        let Background = this.add.image(0, 0, 'backgroundMenuChooseMiniGame');
        Background.setOrigin(0, 0);
        Background.setDisplaySize(1100, 620);

        //titulo
        let textTitle =
        new Phaser.GameObjects.Text(this, this.scale.width / 2, 100, "ELIGE UN MINIJUEGO", { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
        textTitle.setOrigin(0.5, 0.5);
        textTitle.setScale(2, 2);
        textTitle.setStroke('#000000', 6)
        this.add.existing(textTitle);
        //boton para ir al minijuego de gestion
        let BotonManagement = this.add.image(275,300,'SceneButton')
        BotonManagement.setScale(0.2);
        BotonManagement.setTint(0x008000);
        BotonManagement.setInteractive();

        let textManagement = 
        new Phaser.GameObjects.Text(this,275,375,"Gestión",{ fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif'});
        textManagement.setOrigin(0.5,0.5);
        textManagement.setScale(2,2);
        textManagement.setStroke('#000000', 6)
        this.add.existing(textManagement);

        //boton para ir al minijuego de programación
        let Botonprogramming = this.add.image(550,300,'SceneButton')
        Botonprogramming.setScale(0.2);
        Botonprogramming.setTint(0xFFFF00);
        Botonprogramming.setInteractive();

        let textProgramming = 
        new Phaser.GameObjects.Text(this,550,375,"Programación",{ fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif'});
        textProgramming.setOrigin(0.5,0.5);
        textProgramming.setScale(2,2);
        textProgramming.setStroke('#000000', 6)
        this.add.existing(textProgramming);

        //boton para ir al minijuego de diseño
        let BotonDesign = this.add.image(825,300,'SceneButton')
        BotonDesign.setScale(0.2);
        BotonDesign.setTint(0xFFC0CB);
        BotonDesign.setInteractive();

        let textDesign = 
        new Phaser.GameObjects.Text(this,825,375,"Diseño",{ fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif'});
        textDesign.setOrigin(0.5,0.5);
        textDesign.setScale(2,2);
        textDesign.setStroke('#000000', 6)
        this.add.existing(textDesign);

        //que los botones sean interactivos y cambien de escena al hacer click
        BotonManagement.on('pointerdown', ()=>{this.scene.start('ManagementGame')}) // usamos flechi inportante ehhhh
        Botonprogramming.on('pointerdown', ()=>{this.scene.start('programmingMinigame')}) // usamos flechi inportante ehhhh
        BotonDesign.on('pointerdown', ()=>{this.scene.start('DesignGame')}) // usamos flechi inportante ehhhh
    }
}