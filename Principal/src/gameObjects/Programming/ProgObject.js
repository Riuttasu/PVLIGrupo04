/**
 * Objeto usado por el minijuego de programacion, cae con una gravedad hasta salirse de la pantalla o ser recogido
 */
export default class ProgObject extends Phaser.GameObjects.Container 
{
    /**
     * @param {*} name nombre del objeto (texto que saldra)
     * @param {*} gravity velocidad de gravedad del objeto
     */
    constructor(scene,x,y,name = 'objectprog',gravity=100)
    {
        //
        super(scene,x,y);
        this.setSize(64,32);
        // Borde
        this.border = new Phaser.GameObjects.Graphics(this.scene,{"x":-this.width/2, "y": -this.height/2});
        this.add(this.border);
        this.border.fillStyle(0x000000).fillRect(0,0,70,38); // Reborde exterior
        this.border.fillStyle(0x00ff00).fillRect(3,3,64,32); // Reborde interior
        // Texto
        this.text = new Phaser.GameObjects.Text(this.scene,-this.width/2+3,-this.height/2+3,name,
        {        
            fontStyle: 'bold', 
            color: '#3900f5'
        })
        this.text.setDisplaySize(this.width-3,this.height-3);
        this.add(this.text);
        // Se mete en la escena
        this.scene.add.existing(this); // Objeto en si
        this.scene.physics.add.existing(this); // Fisicas
        // Fisicas
        this.body.setGravityY(gravity); // Gravedad
        // Rotacion
        this.rotationSpeed = Phaser.Math.RND.between(-10,10);
    }
    preUpdate(t,dt)
    {
        this.rotation+= this.rotationSpeed/10*dt/1000; // Rotacion a lo pou
        // Si el objeto se cae fuera de los bordes del juego, indica que se ha perdido
        if(this.body.y > this.scene.scale.height-this.displayHeight/2) 
        {
            this.scene.EndMinigame(false);
        }
    }
    
}