import ManagementGame from "../ManagementGame/ManagementGame.js";
import DesignGame from "../MinijuegoDesign/designGame.js";
import MenuScene from "./MenuScene.js";
import Load from "./Load.js";
import DesignLoseScene from "../MinijuegoDesign/designLoseScene.js";

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
<<<<<<< HEAD
    scene: [Load,MenuScene,ManagementGame,DesignGame,DesignLoseScene],
    
=======
    scene: [Load,MenuScene,ManagementGame],
>>>>>>> 6586cec6b32e048d5b10bb32b638d482e920bbb7
    physics: {
        default: 'arcade', // elegir motor
        arcade: { // propiedades del motor
            gravity: { y: 300 },
<<<<<<< HEAD
            debug: true // true para ver info
=======
            debug: false // true para ver info
>>>>>>> 6586cec6b32e048d5b10bb32b638d482e920bbb7
        }
    },
};

new Phaser.Game(config);
