import ManagementGame from "../ManagementGame/ManagementGame.js";
import MenuScene from "./MenuScene.js";
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#ff69b4',
    scene: [MenuScene,ManagementGame],
   
};

var juego = new Phaser.Game(config);


