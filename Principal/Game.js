import ManagementGame from "../ManagementGame/ManagementGame.js";
import MenuScene from "./MenuScene.js";
import Load from "./Load.js";
let config = {
     parent: 'Juego',
    type: Phaser.AUTO,
    width:  1000,
    height: 500,
    scale: {
        mode: Phaser.Scale.FIT,  
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
    },
    pixelArt: false,
    backgroundColor: '#ff69b4',
    scene: [Load,MenuScene,ManagementGame],
    physics: {
        default: 'arcade', // elegir motor
        arcade: { // propiedades del motor
            gravity: { y: 300 },
            debug: true // true para ver info
        }
    },
};

new Phaser.Game(config);
