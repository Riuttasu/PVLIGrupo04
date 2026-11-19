
import ManagementGame from "./scenes/ManagementGame.js";
import MenuScene from "./scenes/MenuScene.js";
import DesignGame from "./scenes/designGame.js";
import Load from "./scenes/Load.js";
import programmingMinigame from "./scenes/progMinigame.js";
import minigameEndScene from "./scenes/minigameEndScene.js";
import RPGScene from "./scenes/RPGScene.js";
<<<<<<< HEAD
import MenuChooseMiniGame from "./scenes/MenuChooseMiniGame.js";
import StartMenu from "./scenes/startMenu.js";
=======
>>>>>>> parent of 4d61d67 (Merge remote-tracking branch 'origin/RamaXinying' into MiRama2(Miguel))
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
<<<<<<< HEAD
    scene: [Load,MenuScene,ManagementGame,programmingMinigame,
            minigameEndScene, RPGScene, DesignGame, MenuChooseMiniGame, StartMenu],
=======
    scene: [Load,MenuScene,ManagementGame,programmingMinigame,minigameEndScene, RPGScene, DesignGame],
>>>>>>> parent of 4d61d67 (Merge remote-tracking branch 'origin/RamaXinying' into MiRama2(Miguel))
    physics: {
        default: 'arcade', // elegir motor
        arcade: { // propiedades del motor
            gravity: { y: 300 },
            debug: true // true para ver info
        }
    },
};

new Phaser.Game(config);