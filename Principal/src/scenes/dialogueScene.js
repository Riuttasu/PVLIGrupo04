export default class selectCharacter extends Phaser.Scene{
    constructor()
    {
        super({key:'dialogueScene'});
    }
    init(data){
        this.dialogueIndex = data.dialogueIndex || 0;
    }
    create(){
        this.dialoguesData = this.cache.json.get('dialogues');
        this.player = this.registry.get('playerData');
        this.characters = this.cache.json.get('characterData');
        //Variables
        this.dialoguesList = this.dialoguesData[this.dialogueIndex][this.player.characterID];
        this.panelIndex = -1;
        // Nombre del profesor del jugador (siempre va a la izquierda)
        const playerProf = this.characters[this.player.characterID % this.characters.length];
        this.playerProfName = playerProf.name;
        
        this.leftTargetX = 270;
        this.rightTargetX = 830;
        this.targetY = 390;
        //Estado de los personajes
        this.leftEntered = false;
        this.currentRightChar = null;
        //Sprites
        this.leftSprite = this.add.image(-250, this.targetY, this.playerProfName).setVisible(false);
        this.rightSprite = this.add.image(1350, this.targetY, this.playerProfName).setVisible(false);
        //Panel
        this.panel = this.add.container(0,0)
        const panelGfx = this.add.graphics();
        panelGfx.lineStyle(4, 0x002c5c, 1);
        panelGfx.fillStyle(0xf8f9fa, 0.95);
        panelGfx.fillRoundedRect(30, 465, 1040, 130, 65);
        panelGfx.strokeRoundedRect(30, 465, 1040, 130, 65);

        this.panelText = this.add.text(115, 486, '', {
            font: '23px "Comic Sans MS"', 
            color: '#2c3e50',
            lineSpacing: 6,
            wordWrap: { width: 870 }
        }).setOrigin(0,0);
        //Panel con el nombre de quien habla
        const nameBoxGfx = this.add.graphics();
        nameBoxGfx.fillStyle(0x7acbf5, 1); 
        nameBoxGfx.lineStyle(3, 0x002c5c, 1);
        nameBoxGfx.fillRoundedRect(45, 435, 260, 38, 19);
        nameBoxGfx.strokeRoundedRect(45, 435, 260, 38, 19);
        this.panelNameText = this.add.text(175, 454, '', {
            font: 'bold 24px Arial',
            color: '#0b2545'
        }).setOrigin(0.5, 0.5);
        this.arrowSprite = this.add.text(1000, 568, '»', {
            font: 'bold 28px Arial',
            color: '#5dade2'
        }).setOrigin(0.5);
        this.tweens.add({
            targets: this.arrowSprite,
            x: 1008,
            duration: 450,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        this.panel.add([panelGfx, nameBoxGfx, this.panelNameText, this.panelText, this.arrowSprite]);
        //Inputs
        this.input.keyboard.on('keydown-Z', () => this.pass());
        this.input.keyboard.on('keydown-ENTER', () => this.pass());
        this.input.keyboard.on('keydown-ESC', ()=>{this.scene.start('MenuScene')})

        this.pass();
    }
    /** */
    pass(){
        this.panelIndex++;
        //Si se acabaron los dialogos se pasa de escena
        if(this.panelIndex >= this.dialoguesList.length){this.scene.start('MenuScene'); return;}
        //Modificar texto
        this.panelText.setText(this.dialoguesList[this.panelIndex].text)
        this.panelNameText.setText(this.dialoguesList[this.panelIndex].character)
        this.updateCharacterSprites(this.dialoguesList[this.panelIndex].character);
    }
    /**Llama al resto de métodos para mover todos los sprites a su nuevo estado 
     * @param {*} speaker es el que está hablando en ese estado
    */
    updateCharacterSprites(speaker) {
        const isPlayerSpeaking = (speaker === this.playerProfName);
        //Si es la primera vez que aparece el profe del jugador
        if (isPlayerSpeaking && !this.leftEntered) {
            this.leftEntered = true;
            this.leftSprite.setPosition(-250, this.targetY);
            this.leftSprite.setVisible(true);

            this.tweens.add({
                targets: this.leftSprite,
                x: this.leftTargetX,
                duration: 350,
                ease: 'Back.easeOut'
            });
        }
        //Si hay que poner al personaje nuevo porque es la primera vez que sale o antes había otro
        if (!isPlayerSpeaking && this.currentRightChar !== speaker) {
            const oldProf = this.currentRightChar;
            this.currentRightChar = speaker;

            if (oldProf !== null) {
                // Si ya había alguien a la derecha, primero lo sacamos y luego metemos al nuevo
                this.tweens.killTweensOf(this.rightSprite);
                this.tweens.add({
                    targets: this.rightSprite,
                    x: 1350,
                    duration: 220,
                    ease: 'Power2',
                    onComplete: () => {
                        this.enterRightCharacter(speaker);
                    }
                });
            } else {
                // Si no había nadie aún, entra directamente
                this.enterRightCharacter(speaker);
            }
        }
        //Si el jugador ha entrado al menos una vez
        if (this.leftEntered) {
            this.applySpeakerFocus(this.leftSprite, isPlayerSpeaking);
        }
        //Si el otro slot tiene un personaje
        if (this.currentRightChar !== null) {
            this.applySpeakerFocus(this.rightSprite, !isPlayerSpeaking);
        }
    }
    /**Mete al sprite correspondiente por la derecha */
    enterRightCharacter(characterName) {
        console.log(characterName)
        this.rightSprite.setTexture(characterName);
        this.rightSprite.setPosition(1350, this.targetY);
        this.rightSprite.setVisible(true);

        this.tweens.add({
            targets: this.rightSprite,
            x: this.rightTargetX,
            duration: 350,
            ease: 'Back.easeOut'
        });
    }

    /** Actualiza qué sprite está sombreado y cuál no
     * @param {*} sprite al que quieres modificar
    */
    applySpeakerFocus(sprite, isSpeaking) {
        this.tweens.add({
            targets: sprite,
            scale: isSpeaking ? 1 : 0.92,
            alpha: isSpeaking ? 1 : 0.65,
            duration: 220,
            ease: 'Power2'
        });
    }
}