import ManagementGame from "../ManagementGame/ManagementGame.js";
import MenuScene from "./MenuScene.js";
import Load from "./Load.js";
import ProgrammingGame from "../Lune/ProgrammingGame.js";
let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#ff69b4',
    scene: [Load,MenuScene,ManagementGame,ProgrammingGame],
    physics: {default: 'arcade'},
};

new Phaser.Game(config);