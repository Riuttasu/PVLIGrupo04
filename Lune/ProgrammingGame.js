import ProgramPlayer from "./ProgramPlayer.js";
import MinigameEnd from "./MinigameEnd.js";
import ProgramObject from "./ProgramObject.js";

export default class ProgrammingGame extends Phaser.Scene {

    constructor(minigameTime = 10, minigameObjects = 10)
    {
        super({key: 'miniprogra'})
        this.minigameTime = minigameTime;
        this.numObjects = minigameObjects;
    }
    create(){
        // Jugador
        this.player = new ProgramPlayer(this,this.scale.width/2,this.scale.height-this.scale.height/9);      
        // Spawn de objetos
        this.timePerObject = (this.minigameTime-2)/this.numObjects; // Calcula cada cuanto va a tener q spawnearse un objeto, maxtime-2 para dar margen de caida
        this.objectsSpawned = 0; // Numero de objetos spawneados
        this.lastObject = 0; // Tiempo desde el ultimo objeto
        this.lastObjectX = this.scale.width/2; // Posicion del ultimo objeto, para no hacerlo imposible
        this.objectXPadding = 20; // Margen que se da entre los bordes de la pantalla para que no toque los extremos
        this.objectXBetWeen = this.scale.width/3; // Margen entre el objeto spawneado y el anterior
        // Colisiones de objetos
        this.objects = this.add.group(); // grupo de objetos que caen
        this.physics.add.collider(this.objects,this.player,this.objectPickedUp,null,this); // Collider del grupo de objetos con el jugador
    }
    update(t,dt)
    {
        this.minigameTime-= dt;
        // Si se ha pasado el tiempo del minijuego your taking too long
        if (this.minigameTime <= 0) {}
        // Spawn de objetos si se ha cumplido el tiempo
        this.lastObject+=dt/1000;
        if (this.objectsSpawned < this.numObjects && this.lastObject > this.timePerObject)
        {
            this.spawn();
            this.lastObject=0;
        }

    }
    // Funcion para spawnear un nuevo objeto que va a caer en la escena
    spawn()
    {
        // Aumenta el numero de objetos spawneado
        ++this.objectsSpawned;
        // Anade al grupo de objetos un nuevo objeto en posiciones random cercanas al antiguo
        let minNewX = Phaser.Math.Clamp(this.lastObjectX-this.objectXBetWeen,this.objectXPadding,this.scale.width-this.objectXPadding);
        let maxNewX = Phaser.Math.Clamp(this.lastObjectX+this.objectXBetWeen,this.objectXPadding,this.scale.width-this.objectXPadding);
        let newX = Phaser.Math.RND.between(minNewX,maxNewX);
        // Spawn
        this.objects.add(new ProgramObject(this,newX,0));
        // Guarda la ultima posicion X del objeto que se acaba de spawnear
        this.lastObjectX = newX;
    }
    // Funcion para perder el juego jeje, llamada principalmente por los objetos que se caen
    lose()
    {
        this.endMinigame(false);
        // TODO: perder juego
        console.log("ay");
    }
    // Cuando se detecta una colision entre uno de los objetos y el jugador
    objectPickedUp(object,player)
    {
        // Destruye el objeto
        object.destroy();
    }
    endMinigame(win)
    {
        this.scene.launch('minigameending');
    }
}