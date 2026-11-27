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
        this.fillRect(0,0,this.scene.scale.width-padding-this.x,barheight);
        // Barra que cambia con el tiempo
        this.fillStyle(0xaaffaa); // Verde asi bonito
        let barLeft = (this.maxTime-timePassed)/(this.maxTime); // Entre 1 y 0 dependiendo del tiempo que ha pasado 
        this.fillRect(2,2,(this.scene.scale.width-padding-this.x-2)*barLeft,barheight-4); // -2 y -4 numeros magicos para que el rectangulo pequeño este dentro del grande
    }
}