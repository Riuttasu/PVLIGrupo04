export default class Minigametimer extends Phaser.GameObjects.Graphics
{
    constructor(scene,x,y,time)
    {
        super(scene,{"x": x,"y":y});
        this.scene.add.existing(this);
        this.maxTime = time;
        console.log(this.x); console.log(this.y);
    }
    updateBar(timePassed)
    {
        // Constante de margen de bordes de pantalla
        const padding = 20;
        const barheight = 20;
        // Quita la anterior
        this.clear();
        // Fondo
        this.fillStyle(0x000000); // Negro
        this.fillRect(this.x,this.y,this.scene.scale.width-padding,barheight);
        // Barra que cambia con el tiempo
        this.fillStyle(0x00ff00); // Verde
        let barLeft = (this.maxTime-timePassed)/(this.maxTime); // Entre 1 y 0 dependiendo del tiempo que ha pasado 
        this.fillRect(this.x,this.y-2,(this.scene.scale.width-padding)*barLeft,barheight-2);
    }
}