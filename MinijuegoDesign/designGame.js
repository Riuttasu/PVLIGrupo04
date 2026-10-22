export default class DesignGame extends Phaser.Scene{
    constructor()
    {
         super({key:'DesignGame'});
    }
    init(){

    }
    preload() {}
        
    create() {
        let player = new Player(this, 100, 300);
        let obstacle = new Obstacle(this, 600, 200);
    }
    update(){}
}