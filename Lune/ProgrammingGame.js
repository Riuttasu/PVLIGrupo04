import ProgramPlayer from "./ProgramPlayer.js";

export default class ProgrammingGame extends Phaser.Scene {

    constructor(minigameTime = 10, minigameObjects = 10)
    {
        super({key: 'miniprogra'})
        this.minigameTime = minigameTime;
        this.numObjects = minigameObjects;
    }
    init(){
    }
    preload(){
    }
    create(){
        // Jugador
        this.player = new ProgramPlayer(this,this.scale.width/2,this.scale.height-this.scale.height/9);      
        // Calcula cada cuanto va a tener q spawnearse un objeto
        // maxtime - 2 para dejar que al menos caigan un poco
        this.timePerObject = (this.minigameTime-2)/this.numObjects;
        // Tiempo desde el ultimo objeto
        this.lastObject = 0;  
        // Spawn de objetos
        this.objectsSpawned = 0;
        this.spawn();
    }
    update(t,dt)
    {
        this.minigameTime-= dt;
        // Si se ha pasado el tiempo del minijuego your taking too long
        if (this.minigameTime <= 0) {}

    }
    spawn()
    {

    }
}