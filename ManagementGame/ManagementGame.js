
//Creo una clase llamada managementscene
//Heredo la clase scene de phase para que funcione como una escena de juego, Prgeuntar Toni
//Dentro describo lo que hara mi escena

export default class ManagementGame extends Phaser.Scene{

    preload()
    {
       this.load.image('FondoGestion', 'IMG/FondoGestion.jpg');

    }
    create()
    {
        this.add.image(400,200,'FondoGestion');
    }
}