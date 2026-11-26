export default class selectCharacter extends Phaser.Scene{
    constructor()
    {
        super({key:'selectCharacter'});
    }
    create()
    {
        this.rescale = 0
        this.playerData = this.registry.get('playerData');
        this.characters = this.cache.json.get('characterData');
        const TYPE_STYLES = {
            Programming: { color: 0xe7d63c, hex: '#e7d63c'},
            Design:      { color: 0xe74c3c, hex: '#e74c3c'},
            Management:  { color: 0x2ecc71, hex: '#2ecc71'}
        }
        const names = ["Toni", "Pablo", "Ruben"];
        //Creas los botones para cada profe 
        this.images = [];
        for (let i = 0; i < this.characters.length; i++){
            let button = this.add.rectangle(220 + 330*i,500,220,60, TYPE_STYLES[this.characters[i].style].color)
            button.setInteractive();
            button.setStrokeStyle(3, 0x000000, 1)
            let buttonText = this.add.text(220 + 330*i, 500, this.characters[i].name, { font: '20px Arial', color: '#000000' }).setOrigin(0.5, 0.5)
            
            //Les asignamos funciones
            button.on('pointerdown', ()=> {this.setProfesor(this.characters[i], i)})

            //Les ponemos las imágenes
            let image = this.add.image(110 + 330*i,400, names[i]).setDisplaySize(200, 350);
            image.setOrigin(0,1)
            let tween = this.tweens.add({
                targets: [ image ],
                scaleY: 0.55,
                duration: 300,
                ease: 'Sine.easeInOut',
                yoyo: true,
                repeat: -1,
                delay: 10
            });
        };
    }
    setProfesor(prof, index){
        this.playerData.characterID = index;
        this.playerData.level = 1;
        this.playerData.maxHealth = prof.iniHealth;
        this.playerData.programmingPoints = 0;
        this.playerData.designPoints = 0;
        this.playerData.managementPoints = 0;
        this.playerData.playerSkillsID = prof.skills;
        console.log(this.playerData);
        this.scene.start('MenuScene');
    }
}
 