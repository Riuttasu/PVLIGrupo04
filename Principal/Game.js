import ManagementGame from "../ManagementGame/ManagementGame.js";
import DesignGame from "../MinijuegoDesign/designGame.js";
import MenuScene from "./MenuScene.js";
import Load from "./Load.js";
import DesignLoseScene from "../MinijuegoDesign/designLoseScene.js";

let config = {
     parent: 'Juego',
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    // scale: {
    //     mode: Phaser.Scale.FIT,  
    //     autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
    // },
    pixelArt: false,
    backgroundColor: '#ff69b4',

    scene: [Load,MenuScene,ManagementGame,DesignGame,DesignLoseScene],
    
    physics: {
        default: 'arcade', // elegir motor
        arcade: { // propiedades del motor
            gravity: { y: 300 },
            debug: false // true para ver info
        }
    },
};

new Phaser.Game(config);
