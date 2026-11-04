import ManagementGame from "../ManagementGame/ManagementGame.js";
import MenuScene from "./MenuScene.js";
import Load from "./Load.js";
import programmingMinigame from "./Programming/programmingMinigame.js";
import programmingMinigameEnd from "./minigameEndScene.js";
let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#ff69b4',
    scene: [Load,MenuScene,ManagementGame,programmingMinigame,programmingMinigameEnd],
    physics: {default: 'arcade', arcade: {debug:true}},
};

new Phaser.Game(config);