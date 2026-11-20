export default class Load extends Phaser.Scene{

    constructor()
    {
        super({key:'Load'});
    }
    preload()
    {
         this.load.setPath("../Principal/assets/IMG/") // Path
        // UI
        this.load.image('mini', 'UI/misushi.png');
      
        
           
    }
    create()
    {

    
          this.lod = this.add.image( 550, 310,'mini');
          this.lod.setDisplaySize(400,400);
         // Load Imagenes
        this.load.setPath("../Principal/assets/IMG/") // Path
        // UI
        this.load.image('SceneButton', 'UI/buttonscene.png');
        this.load.image('TareaGitBackground', 'UI/TareaGitBackground.png')
        // Minijuego Gestion 
        this.load.image('BackgroundManagment', 'MinijuegoManagement/FondoGestion.jpg');
        this.load.image('Player', 'MinijuegoManagement/Player.png');
        this.load.image('Ball', 'MinijuegoManagement/Ball.png'); 
        this.load.image('Arrow', 'MinijuegoManagement/Arrow.png');
        // Minijuego Design
        this.load.image('obstacles', 'MinijuegoDesign/obstacles.png');
        this.load.image('player', 'MinijuegoDesign/player.png');
        // Minijuego Programacion
        this.load.spritesheet('playerprog','MinijuegoProgramming/playerprog.png',{frameWidth:64,frameHeight:64});
        this.load.image('objectprog', 'MinijuegoProgramming/objectprog.png');
        this.load.image('BackgroundProgramming', 'MinijuegoProgramming/backgroundprog.png');
        // cargamos los json
        this.load.setPath("./Principal/assets/JSON/");
        this.load.json('skillsData', 'skills.json'); //Compendio de habilidades
        this.load.json('enemiesData', 'enemies.json'); // Compendio de enemigos
        this.load.json('levelsData', 'levels.json'); //Compendio de niveles con la lista de los indices de 
        this.load.json('playerData', 'player.json'); // Datos del jugador
        this.load.json('characterData', 'character.json'); // Datos base de los profesores
        this.playerData = this.cache.json.get('playerData'); // Cargamos los datos del jugador en la variable playerData
        console.log("Player Data:", this.playerData);

        this.load.start(); 
        this.load.on('complete', () => {this.playerData = this.cache.json.get('playerData'); // Cargamos los datos del jugador en la variable playerData
        console.log("Player Data:", this.playerData); this.scene.start('startMenu', {playerData : this.playerData})}); // Esto mira si la escena termino de cargra preguntar a toni si es asi porque los saque con una busqueda rápida

    }

    update(time,delta)
    {
        this.lod.rotation += 0.002 * delta //Giramos hay que multiplicar por delta
    }

}