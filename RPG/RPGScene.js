import Skill from '../RPG/Skill.js';
import Enemy from '../RPG/Enemy.js';

export default class RPGScene extends Phaser.Scene {
    constructor() {
        super({ key: 'RPGScene' });
    }

    init(data) {
        // Renombra el nivel que se quiera jugar aqui porque sino abajo es un cacao
        this.levelKey = data.levelKey || 'level1';
    }

    preload() {
        // cargamos los json
        this.load.json('skillsData', 'RPG/skills.json'); //Compendio de habilidades
        this.load.json('enemiesData', 'RPG/enemies.json'); // Compendio de enemigos
        this.load.json('levelsData', 'RPG/levels.json'); //Compendio de niveles con la lista de los indices de enemigos
    }

    create() {
        this.isGameOver = false;
        //Fondo moradito
        this.cameras.main.setBackgroundColor('#451b92');
        // Guardamos en variables los jsons
        this.skillsList = this.cache.json.get('skillsData').map(data => new Skill(data));
        this.enemyDatabase = this.cache.json.get('enemiesData');
        const levelsData = this.cache.json.get('levelsData');
        this.enemyQueue = [...levelsData[this.levelKey].enemyQueue];

        // Slots de enemigos
        this.activeSlots = [null, null, null];
        this.slotCoordinates = [
            { x: 200, y: 150 },
            { x: 400, y: 150 },
            { x: 600, y: 150 }
        ];

        // Habilidad seleccionada
        this.selectedSkillIndex = 0;

        // Variables para la flechita de los tarjets 
        this.isSelectingTarget = false;
        this.selectedTargetSlot = 0;

        // Llamadas a funcion para setear la escena
        this.setupEnemySlots();
        this.setupTargetPointer();
        this.setupSkillCarouselUI();
        this.setupControls();

        // Poner los enemigos y las habilidades inicilmente
        this.fillEmptySlots();
        this.updateCarouselDisplay();
    }

    setupEnemySlots() {
        this.slotContainers = [];
        //Por cada slotCoordinates se le pone en el container la posicion
        this.slotCoordinates.forEach((pos, i) => {
            const container = this.add.container(pos.x, pos.y);

            // Hacemos el fondo bonito
            const rect = this.add.rectangle(0, 0, 160, 140, 0x34495e).setStrokeStyle(2, 0xecf0f1);
            const enemySprite = this.add.image(0, -10, '');
            const nameText = this.add.text(0, -40, `Slot ${i + 1}`, { font: '14px Arial', color: '#ffffff' }).setOrigin(0.5);
            const typeText = this.add.text(0, -10, '', { font: '12px Arial', color: '#bdc3c7' }).setOrigin(0.5);
            const hpText = this.add.text(0, 20, '', { font: '12px Arial', color: '#2ecc71' }).setOrigin(0.5);

            container.add([rect, enemySprite, nameText, typeText, hpText]);
            this.slotContainers.push({ container, enemySprite, rect, nameText, typeText, hpText });
        });
    }

    setupTargetPointer() {
        // Se coloca en el primer slot la flecha y se oculta
        this.targetPointer = this.add.triangle(0, 40, 0, 0, 20, 0, 10, 20, 0xff0000);
        this.targetPointer.setVisible(false);
    }

    setupSkillCarouselUI() {

        // Creamos el bloque de texto para el de arriba
        this.prevSkillText = this.add.text(0, -70, '', { font: '16px Arial', color: '#7f8c8d' }).setOrigin(0.5);

        // Creamos el bloque de texto para el seleccionado
        this.mainSkillBox = this.add.rectangle(0, 0, 300, 60, 0x2980b9).setStrokeStyle(3, 0xf1c40f);
        this.mainSkillText = this.add.text(0, -8, '', { font: 'bold 20px Arial', color: '#ffffff' }).setOrigin(0.5);
        this.mainSkillSubText = this.add.text(0, 16, '', { font: '12px Arial', color: '#ecf0f1' }).setOrigin(0.5);

        // Creamos el bloque de texto para el de abajo
        this.nextSkillText = this.add.text(0, 70, '', { font: '16px Arial', color: '#7f8c8d' }).setOrigin(0.5);

        // Creamos el carrusel
        this.carruselContainer = this.add.container(400, 450);
        this.carruselContainer.add([
            this.prevSkillText,
            this.mainSkillBox,
            this.mainSkillText,
            this.mainSkillSubText,
            this.nextSkillText
        ]);
    }

    setupControls() {

        this.input.keyboard.on('keydown-UP', () => this.handleUp());
        this.input.keyboard.on('keydown-DOWN', () => this.handleDown());
        this.input.keyboard.on('keydown-LEFT', () => this.handleLeft());
        this.input.keyboard.on('keydown-RIGHT', () => this.handleRight());
        this.input.keyboard.on('keydown-W', () => this.handleUp());
        this.input.keyboard.on('keydown-S', () => this.handleDown());
        this.input.keyboard.on('keydown-A', () => this.handleLeft());
        this.input.keyboard.on('keydown-D', () => this.handleRight());

        this.input.keyboard.on('keydown-Z', () => this.handleConfirm());
        this.input.keyboard.on('keydown-ENTER', () => this.handleConfirm());
    }

    fillEmptySlots() {
        for (let i = 0; i < 3; i++) {
            if (this.activeSlots[i] === null && this.enemyQueue.length > 0) {
                const enemyIndex = this.enemyQueue.shift();
                const enemy = this.enemyDatabase[enemyIndex];
                this.activeSlots[i] = new Enemy(enemy);
            }
        }
        this.refreshSlotsDisplay();
    }

    refreshSlotsDisplay() {
        for (let i = 0; i < 3; i++) {
            const enemy = this.activeSlots[i];
            const slot = this.slotContainers[i];

            if (enemy) {
                slot.enemySprite.setTexture(enemy.sprite);
                slot.nameText.setText(enemy.name);
                slot.typeText.setText(`[${enemy.type}]`);
                slot.hpText.setText(`HP: ${enemy.currentHp}/${enemy.maxHp}`);
                slot.container.setVisible(true);
            } else {
                slot.container.setVisible(false);
            }
        }
    }

    updateCarouselDisplay() {

        const prevIndex = (this.selectedSkillIndex - 1 + this.skillsList.length) % this.skillsList.length; // se le suma el total de mas por si es la primera
        const nextIndex = (this.selectedSkillIndex + 1) % this.skillsList.length;

        const prevSkill = this.skillsList[prevIndex];
        const currentSkill = this.skillsList[this.selectedSkillIndex];
        const nextSkill = this.skillsList[nextIndex];

        this.prevSkillText.setText(`${prevSkill.name} (${prevSkill.type})`);
        this.mainSkillText.setText(currentSkill.name);
        this.mainSkillSubText.setText(`Type: ${currentSkill.type} | Dmg: ${currentSkill.damage} | Target: ${currentSkill.targetType}`);
        this.nextSkillText.setText(`${nextSkill.name} (${nextSkill.type})`);
    }
    //Si no esta atacando cambia la habilidad actual por la de arriba
    handleUp() {
        if (this.isGameOver ||this.isSelectingTarget) return;

        this.selectedSkillIndex = (this.selectedSkillIndex - 1 + this.skillsList.length) % this.skillsList.length;
        this.updateCarouselDisplay();
    }
    //Si no esta atacando cambia la habilidad actual por la de abajo
    handleDown() {
        if (this.isGameOver || this.isSelectingTarget) return;

        this.selectedSkillIndex = (this.selectedSkillIndex + 1) % this.skillsList.length;
        this.updateCarouselDisplay();
    }

    handleLeft() {
        if (this.isGameOver || !this.isSelectingTarget) return;

        this.moveTargetSelection(-1);
    }

    handleRight() {
        if (this.isGameOver || !this.isSelectingTarget) return;

        this.moveTargetSelection(1);
    }

    moveTargetSelection(dir) {
        let newSlot = this.selectedTargetSlot + dir;

        while (newSlot >= 0 && newSlot < 3) {
            if (this.activeSlots[newSlot] !== null) {
                this.selectedTargetSlot = newSlot;
                this.updateTargetPointerPosition();
                break;
            }
            newSlot += dir;
        }
    }

    updateTargetPointerPosition() {
        const targetPos = this.slotCoordinates[this.selectedTargetSlot];
        this.targetPointer.setPosition(targetPos.x - 10, targetPos.y - 90);
        this.targetPointer.setVisible(true);
    }

    handleConfirm() {
        if (this.isGameOver) return;
        const currentSkill = this.skillsList[this.selectedSkillIndex];
        //si es para seleccionar una habilidad
        if (!this.isSelectingTarget) {
            if (currentSkill.targetType === 'single') {
                this.isSelectingTarget = true;
                // Busca el primer slot que tenga un enemigo
                this.selectedTargetSlot = this.activeSlots.findIndex(e => e !== null);
                if (this.selectedTargetSlot !== -1) {
                    this.updateTargetPointerPosition();
                } else {
                    this.isSelectingTarget = false;
                }
            } else {
                // Target 'all'
                this.executeSkill(currentSkill, null);
            }
        } else {
            // Confirma que la posicion en la que esta la flecha es el target correcto
            this.executeSkill(currentSkill, this.selectedTargetSlot);
            this.isSelectingTarget = false;
            this.targetPointer.setVisible(false);
        }
    }

    executeSkill(skill, targetSlotIndex) {
        if (targetSlotIndex !== null) {
            // Ataque a un solo objetivo (single target)
            const enemy = this.activeSlots[targetSlotIndex];
            if (enemy) {
                enemy.takeDamage(skill.damage, skill.type);
                if (enemy.isComplete()) {
                    this.activeSlots[targetSlotIndex] = null;
                }
            }
        } else {
            // Ataque en a todos
            this.activeSlots.forEach((enemy, index) => {
                if (enemy) {
                    enemy.takeDamage(skill.damage, skill.type);
                    if (enemy.isComplete()) {
                        this.activeSlots[index] = null;
                    }
                }
            });
        }
        // Reponer slots vacios con la pila de niveles
        this.fillEmptySlots();// Comprobar si no quedan enemigos en combate ni en la cola
        this.checkVictory();
    }

    checkVictory() {
        const isQueueEmpty = this.enemyQueue.length === 0;
        const isSlotsEmpty = this.activeSlots.every(slot => slot === null);

        if (isQueueEmpty && isSlotsEmpty && !this.isGameOver) {
            this.isGameOver = true;

            // Ocultamos la flecha por si acaso 
            if (this.targetPointer) this.targetPointer.setVisible(false);

            // Texto de Victoria en el centro de la zona de enemigos, en el futuro igual es una imagen 
            this.add.text(400, 150, '¡VICTORIA!', {
                font: 'bold 44px Arial',
                color: '#50cc2e',
                strokeThickness: 5
            }).setOrigin(0.5);

            // Tras un ratin, vuelve al menú
            this.time.delayedCall(4000, () => {
                this.scene.start('MenuScene');
            });
        }
    }
}