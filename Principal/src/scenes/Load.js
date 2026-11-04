export default class Load extends Phaser.Scene{

    constructor()
    {
        super({key:'Load'});
    }
    preload()
    {
        // Load Imagenes
        this.load.setPath("../Principal/assets/IMG/") // Path
        // UI
        this.load.image('SceneButton', 'UI/buttonscene.png');
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
        this.load.setPath("../Principal/assets/JSON/");
        this.load.json('skillsData', 'skills.json'); //Compendio de habilidades
        this.load.json('enemiesData', 'enemies.json'); // Compendio de enemigos
        this.load.json('levelsData', 'levels.json'); //Compendio de niveles con la lista de los indices de enemigos
    }
    create()
    {
        this.scene.start('MenuScene');
    }
}