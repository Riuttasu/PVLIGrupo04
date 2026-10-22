import ManagementGame from "../ManagementGame/ManagementGame.js";
import DesignGame from "../MinijuegoDesign/designGame.js";
import MenuScene from "./MenuScene.js";
import Load from "./Load.js";
let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#ff69b4',
    scene: [Load,MenuScene,ManagementGame,DesignGame],
   
};

new Phaser.Game(config);