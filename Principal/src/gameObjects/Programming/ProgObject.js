/**
 * Objeto usado por el minijuego de programacion, cae con una gravedad hasta salirse de la pantalla o ser recogido
 */
export default class ProgObject extends Phaser.GameObjects.Text 
{
    /**
     * @param {*} name nombre del objeto (texto que saldra)
     * @param {*} gravity velocidad de gravedad del objeto
     */
    constructor(scene,x,y,name = 'objectprog',gravity=100)
    {
        super(scene,x,y,name);
        // Escala
        this.setDisplaySize(64,32); 
        this.setColor('#0026ff'); // Color del texto
        this.setBackgroundColor('#00ff00'); // Color de fondo
        // Se mete en la escena
        this.scene.add.existing(this); // Objeto en si
        this.scene.physics.add.existing(this); // Fisicas
        // Fisicas
        this.body.setGravityY(gravity); // Gravedad
    }
    preUpdate(t,dt)
    {
        // Si el objeto se cae fuera de los bordes del juego, indica que se ha perdido
        if(this.body.y > this.scene.scale.height-this.displayHeight/2) 
        {
            this.scene.EndMinigame(false);
        }
    }
    
}