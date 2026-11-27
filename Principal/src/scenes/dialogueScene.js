export default class selectCharacter extends Phaser.Scene{
    constructor()
    {
        super({key:'dialogueScene'});
    }
    init(data){
        this.dialogueIndex = data.dialogueIndex || 0;
    }
    create(){
        //Variables
        this.dialoguesData = this.cache.json.get('dialogues');
        this.player = this.cache.json.get('playerData');
        this.dialoguesList = this.dialoguesData[dialogueIndex][this.player.characterID];
        //Panel
        this.panel = this.add.container(0,0)
        const panelGfx = this.add.graphics();
        panelGfx.fillStyle(0xffffff, 1);
        panelGfx.fillRoundedRect(30, 360, 1000, 240, 24);
        panelGfx.lineStyle(3, 0x2c3e50, 1);
        panelGfx.strokeRoundedRect(30, 360, 1000, 240, 24);
        //Inputs
        this.input.keyboard.on('keydown-Z', () => this.pass());
        this.input.keyboard.on('keydown-ENTER', () => this.pass());
    }
    pass(){

    }
}