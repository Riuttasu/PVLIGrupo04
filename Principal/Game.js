import ManagementGame from "../ManagementGame/ManagementGame.js";
import MenuScene from "./MenuScene.js";
import Load from "./Load.js";
import RPGScene from "../RPG/RPGScene.js";
let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#ff69b4',
    scene: [Load,MenuScene,ManagementGame,RPGScene], // agregamos la escena al juego
    physics: {
        default: 'arcade', // elegir motor
        arcade: { // propiedades del motor
            gravity: { y: 300 },
            debug: false // true para ver info
        }
    },
};

new Phaser.Game(config);
