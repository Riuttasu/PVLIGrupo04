/**esta es una escena que sirve para elegir el minijuego */
export default class MenuChooseMiniGame extends Phaser.Scene {
    constructor() {
        super({key: 'MenuChooseMiniGame'});
    }
    create() {
        //boton para ir al minijuego de gestion
        let BotonManagement = this.add.image(100,100,'SceneButton')
        BotonManagement.setScale(0.2);
        BotonManagement.setTint(0x008000);
        BotonManagement.setInteractive();
        //boton para ir al minijuego de programación
        let Botonprogramming = this.add.image(100,200,'SceneButton')
        Botonprogramming.setScale(0.2);
        Botonprogramming.setTint(0xFFFF00);
        Botonprogramming.setInteractive();
        //boton para ir al minijuego de diseño
        let BotonDesign = this.add.image(100,300,'SceneButton')
        BotonDesign.setScale(0.2);
        BotonDesign.setTint(0xFFC0CB);
        BotonDesign.setInteractive();

        //que los botones sean interactivos y cambien de escena al hacer click
        BotonManagement.on('pointerdown', ()=>{this.scene.start('ManagementGame')}) // usamos flechi inportante ehhhh
        Botonprogramming.on('pointerdown', ()=>{this.scene.start('programmingMinigame')}) // usamos flechi inportante ehhhh
        BotonDesign.on('pointerdown', ()=>{this.scene.start('DesignGame')}) // usamos flechi inportante ehhhh
    }
}