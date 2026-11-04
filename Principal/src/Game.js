
import ManagementGame from "./scenes/ManagementGame.js";
import MenuScene from "./scenes/MenuScene.js";
import DesignGame from "./scenes/designGame.js";
import Load from "./scenes/Load.js";
import programmingMinigame from "./scenes/progMinigame.js";
import minigameEndScene from "./scenes/minigameEndScene.js";
import RPGScene from "./scenes/RPGScene.js";
let config = {
    parent: 'Juego',
    type: Phaser.AUTO,

    width: 1100,
    height: 620,
    scale: {
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
    },
    pixelArt: false,
    backgroundColor: '#ff69b4',
    scene: [Load,MenuScene,ManagementGame,programmingMinigame,minigameEndScene, RPGScene, DesignGame],
    physics: {
        default: 'arcade', // elegir motor
        arcade: { // propiedades del motor
            gravity: { y: 300 },
            debug: true // true para ver info
        }
    },
};

new Phaser.Game(config);