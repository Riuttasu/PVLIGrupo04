<<<<<<< HEAD
import ManagementGame from "../ManagementGame/ManagementGame.js";
import DesignGame from "../MinijuegoDesign/designGame.js";
import MenuScene from "./MenuScene.js";
import Load from "./Load.js";
import DesignLoseScene from "../MinijuegoDesign/designLoseScene.js";

=======
import ManagementGame from "./ManagementGame/ManagementGame.js";
import MenuScene from "./MenuScene.js";
import Load from "./Load.js";
import programmingMinigame from "./Programming/progMinigame.js";
import minigameEndScene from "./minigameEndScene.js";
import RPGScene from "../RPG/RPGScene.js";
>>>>>>> 4f367997c18f2cac099ddeb11d2516bbcb28a169
let config = {
    parent: 'Juego',
    type: Phaser.AUTO,
<<<<<<< HEAD
    width: 800,
    height: 600,
    // scale: {
    //     mode: Phaser.Scale.FIT,  
    //     autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
    // },
    pixelArt: false,
    backgroundColor: '#ff69b4',

    scene: [Load,MenuScene,ManagementGame,DesignGame,DesignLoseScene],
    
=======
    width: 1100,
    height: 620,
    scale: {
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
    },
    pixelArt: false,
    backgroundColor: '#ff69b4',
    scene: [Load,MenuScene,ManagementGame,programmingMinigame,minigameEndScene, RPGScene],
>>>>>>> 4f367997c18f2cac099ddeb11d2516bbcb28a169
    physics: {
        default: 'arcade', // elegir motor
        arcade: { // propiedades del motor
            gravity: { y: 300 },
            debug: true // true para ver info
        }
    },
};

new Phaser.Game(config);