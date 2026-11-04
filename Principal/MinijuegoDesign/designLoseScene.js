/** escena de perder del minijuego de design 
 * su unico uso es mostra un texto de perder y un boton que lleve a la escena del menu
*/
export default class DesignLoseScene extends Phaser.Scene{
    constructor()
    {
         super({key:'DesignLoseScene'});
    }
    create(){
        //texto de perder
        let text = this.add.text(this.cameras.main.centerX, 100, '- HAS PERDIDO -');
        text.setOrigin(0.5,0.5);
        //colores y sombra del texto
        text.setStroke('#000000', 6)
        text.setFill('#ffffff');
        text.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);

        //boton para volver al menu
        let boton = this.add.image(400,400,'SceneButton');
        boton.setInteractive();
        boton.on('pointerup', ()=>{this.scene.start('MenuScene')}); // esta para que se carge otra escena de design
    }
    update(){

    }
}