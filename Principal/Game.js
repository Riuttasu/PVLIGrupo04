import ManagementGame from "./ManagementGame/ManagementGame.js";
import MenuScene from "./MenuScene.js";
import Load from "./Load.js";
import programmingMinigame from "./Programming/progMinigame.js";
import minigameEndScene from "./minigameEndScene.js";
import RPGScene from "../RPG/RPGScene.js";
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
    scene: [Load,MenuScene,ManagementGame,programmingMinigame,minigameEndScene, RPGScene],
    physics: {
        default: 'arcade', // elegir motor
        arcade: { // propiedades del motor
            gravity: { y: 300 },
            debug: true // true para ver info
        }
    },
};

new Phaser.Game(config);