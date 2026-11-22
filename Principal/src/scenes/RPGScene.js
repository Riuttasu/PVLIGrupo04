import Skill from '../gameObjects/RPG/Skill.js';
import Enemy from '../gameObjects/RPG/Enemy.js';
const TYPE_STYLES = {
    Programming: { color: 0xe7d63c, hex: '#e7d63c', shape: 'circle', label: 'Prog.' },
    Design:      { color: 0xe74c3c, hex: '#e74c3c', shape: 'triangle', label: 'Desi.' },
    Management:  { color: 0x2ecc71, hex: '#2ecc71', shape: 'square', label: 'Mang.' }
};
export default class RPGScene extends Phaser.Scene {
    constructor() {
        super({ key: 'RPGScene' });
        }

    init(data) {
        // Renombra el nivel que se quiera jugar aqui porque sino abajo es un cacao
        this.levelKey = data.levelKey || 'level1';
        this.playerData = this.registry.get('playerData');
    }

    create() {
        this.isGameOver = false;
        //Fondo moradito
        this.cameras.main.setBackgroundColor('#00120f');
        // Guardamos en variables los jsons
        //console.log("Player Data:", this.playerData); 
        const skills = this.cache.json.get('skillsData').map(data => new Skill(data));
        this.skillsList = []; 
        //Asignamos a la lista de habilidades de la batalla las habilidades que tiene el jugador en su json
        for (let i = 0; i < this.playerData.playerSkillsID.length; i++) {
            this.skillsList.push(skills[this.playerData.playerSkillsID[i]]);
        }
        //console.log("Player Skills:", this.skillsList);
        this.enemyDatabase = this.cache.json.get('enemiesData'); 
        //console.log("Enemy Database:", this.enemyDatabase);
        const levelsData = this.cache.json.get('levelsData'); 
        //console.log("Levels Data:", levelsData);   
        this.enemyQueue = [...levelsData[this.playerData.level - 1]]; //LLeva los indices de los enemigos del nivel del jugador
        
        // Estado del combate
        this.maxEnergy = this.playerData.maxHealth;
        this.currentEnergy = this.maxEnergy;
        this.statGoal = 100; // Objetivo temporal de progreso por estadística en el desafío
        this.statProgress = { Programming: 0, Design: 0, Management: 0 };
        // Slots de enemigos
        this.activeSlots = [null, null, null];
        this.slotCoordinates = [
            { x: 125, y: 230 },
            { x: 330, y: 230 },
            { x: 535, y: 230 }
        ];

        // Habilidad seleccionada
        this.selectedSkillIndex = 0;

        // Variables para la flechita de los tarjets 
        this.isSelectingTarget = false;
        this.selectedTargetSlot = 0;

        // Llamadas a funcion para setear la escena
        this.setupHealthBar();
        this.setupEnemySlots();
        this.setupTargetPointer();
        this.setupSkillCarouselUI();
        this.setupControls();

        // Poner los enemigos, la vida y las habilidades inicilmente
        this.fillEmptySlots();
        this.updateHealthBar();
        this.updateCarouselDisplay();
    }
    setupHealthBar() {
        // Barra de energia
        this.energyGraphics = this.add.graphics();
        this.energyText = this.add.text(160, 52, '', {
            font: 'bold 16px Arial',
            color: '#2c3e50'
        }).setOrigin(0.5);
        // Las 3 barras de progreso
        this.statBars = {};
        const types = ['Programming', 'Design', 'Management'];// Cada vuelta usa la key de TYPE_STYLES para crear la barra de progreso de cada tipo 
        types.forEach((type, idx) => {
            const x = 335 + idx * 85; // 335 es la posicion de la primera barra y 85 es la distancia entre cada barra
            const y = 18;
            const style = TYPE_STYLES[type]; // Obtenemos el estilo de la barra de progreso del tipo actual

            const bg = this.add.rectangle(x, y, 66, 72, 0xffffff).setOrigin(0, 0); // Don Barra
            bg.setStrokeStyle(3, style.color); // Borde de la barra de progreso

            // El coso que va subiendo haciendo como que se rellena
            const fill = this.add.rectangle(x + 3, y + 72 - 3, 60, 0, style.color, 0.45).setOrigin(0, 1);
            // Texto que te dice cuanto necesitas para completar la barra de progreso. Un poco cutre de momento pero bueno
            const goalText = this.add.text(x + 33, y + 14, `—${this.statGoal}`, {
                font: 'bold 12px Arial', //Molaría una tipografía igual que se tache por detrás y así es como una barra más grande, de momento el Arial está majete
                color: style.hex
            }).setOrigin(0.5);
            //Lo mismo pero con lo que lleva
            const valText = this.add.text(x + 33, y + 42, '0', {
                font: 'bold 18px Arial',
                color: style.hex
            }).setOrigin(0.5);

            this.statBars[type] = { fill, valText }; // nos llevamos los que vamos a necesitar actualizar
        });
    }
    //Me he arrepentido un montón de poner números mágicos, Rubén tenía razón, prometo arreglarlos en algún momento
    //Pintar la barra de energia y las barras de progreso
    updateHealthBar() {
        // Borramos la energía
        const g = this.energyGraphics;
        g.clear(); 
        // Preparamos una nueva
        const bx = 30, by = 24, bw = 260, bh = 56; //posiciones y tamaño de la barra
        const pct = Phaser.Math.Clamp(this.currentEnergy / this.maxEnergy, 0, 1); // nos aseguramos que la energía no se desborde

        // Fondo blanco Relleno naranja
        g.fillStyle(0xffffff, 1);
        g.fillRect(bx, by, bw, bh);
        // Relleno naranja
        g.fillStyle(0xf39c12, 0.85);
        g.fillRect(bx + 3, by + 3, (bw - 6) * pct, bh - 6);
        // Borde de la batería
        g.lineStyle(3, 0xe67e22, 1);
        g.strokeRect(bx, by, bw, bh);

        // Lineas diagonales como en el GDD a lo celdas de batería
        g.lineStyle(2, 0xe67e22, 0.5);
        for (let sx = bx + 15; sx < bx + bw - 10; sx += 18) {
            g.lineBetween(sx, by + bh - 4, sx + 10, by + 4);
        }
        // La punta, la guinda :D
        g.strokeRect(bx + bw, by + 15, 12, 26);

        // Actualizamos el texto de energía
        this.energyText.setText(`Energía: ${this.currentEnergy}/${this.maxEnergy}`);

        /*Actuailizar las 3 barras de progreso con los nuevos valores de statProgress y statGoal. 
         * Se calcula el progreso y se ajusta la altura del relleno de la barra y el texto que muestra el valor actual*/
            Object.keys(this.statBars).forEach(type => {
            const bar = this.statBars[type];
            const val = this.statProgress[type];
            const progress = Phaser.Math.Clamp(val / this.statGoal, 0, 1);
            bar.fill.height = 66 * progress;
            bar.valText.setText(`${Math.round(val)}`);
        });
    }

    setupEnemySlots() {
        this.slotContainers = [];
        const cardW = 185, cardH = 215; // He aprendido a poner numeros magicos, aprendí a pensar
        //Por cada slotCoordinates se le pone en el container la posicion
        this.slotCoordinates.forEach((pos, i) => {
            const container = this.add.container(pos.x, pos.y);

            // Fondo blanco de la tarea, el relleno de la barra de progreso, el borde de la tarjeta, el icono del tipo
            const cardBg = this.add.graphics(); 
            const liquidFill = this.add.rectangle(0, cardH / 2 - 4, cardW - 8, 0, 0xe74c3c, 0.35).setOrigin(0.5, 1);
            const cardBorder = this.add.graphics();
            const typeIcon = this.add.graphics();
            // Agrregamos el nivel tambien
            const levelBadge = this.add.text(-cardW / 2 + 16, -cardH / 2 + 14, `${this.playerData.level}`, {
                font: 'bold 16px Arial',
                color: '#2c3e50'
            }).setOrigin(0, 0);
            // Nombre del enemigo
            const nameText = this.add.text(0, -64, `Tarea ${i + 1}`, {
                font: 'bold 16px Arial',
                color: '#2c3e50'
            }).setOrigin(0.5);
            // Sprite del enemigo y su vida
            const enemySprite = this.add.image(0, 4, 'enemyFace1').setDisplaySize(86, 86);
            const hpText = this.add.text(0, 74, '0/100', {
                font: 'bold 20px Arial',
                color: '#2c3e50'
            }).setOrigin(0.5);

            container.add([cardBg, liquidFill, cardBorder, typeIcon, levelBadge, nameText, enemySprite, hpText]);
            this.slotContainers.push({
                container, cardBg, liquidFill, cardBorder, typeIcon, nameText, enemySprite, hpText, cardW, cardH
            });
        });
    }
    
    refreshSlotsDisplay() {
        for (let i = 0; i < 3; i++) {
            const enemy = this.activeSlots[i];
            const slot = this.slotContainers[i];
            //console.log(enemy)
            //console.log(slot)
            if (enemy) {
                const style = TYPE_STYLES[enemy.type];
                const progress = Phaser.Math.Clamp(enemy.currentHp / enemy.maxHp, 0, 1); // Porcentaje de vida del enemigo
                // Redibujar tarjeta redondeada con el color del tipo
                slot.cardBg.clear();
                slot.cardBg.fillStyle(0xffffff, 1);
                slot.cardBg.fillRoundedRect(-slot.cardW / 2, -slot.cardH / 2, slot.cardW, slot.cardH, 16);
                // Lo mismo con el borde, lo redibujamos
                slot.cardBorder.clear();
                slot.cardBorder.lineStyle(4, style.color, 1);
                slot.cardBorder.strokeRoundedRect(-slot.cardW / 2, -slot.cardH / 2, slot.cardW, slot.cardH, 16);

                // Relleno líquido con el color y altura proporcional a la vida del enemigo
                slot.liquidFill.setFillStyle(style.color, 0.35);
                slot.liquidFill.height = (slot.cardH - 12) * -progress;

                // Símbolo geométrico en esquina superior derecha
                this.drawTypeSymbol(slot.typeIcon, style, slot.cardW / 2 - 22, -slot.cardH / 2 + 22, 10);

                slot.enemySprite.setTexture(enemy.sprite);
                slot.nameText.setText(enemy.name);
                slot.hpText.setText(`HP: ${enemy.currentHp}/${enemy.maxHp}`);
                slot.container.setVisible(true);
            } else {
                slot.container.setVisible(false);
            }
        }
    }
    // Dibuja círculo, triángulo o cuadrado según la estadística
    drawTypeSymbol(graphics, style, x, y, radius) {
        graphics.clear();
        graphics.lineStyle(3, style.color, 1);
        //Con un switchi se dibuja la forma correcta
        if (style.shape === 'circle') {
            graphics.strokeCircle(x, y, radius);
        } else if (style.shape === 'triangle') {
            graphics.strokeTriangle(x, y - radius, x - radius, y + radius, x + radius, y + radius);
        } else {
            graphics.strokeRect(x - radius, y - radius, radius * 2, radius * 2);
        }
    }

    setupTargetPointer() {
        // Se coloca en el primer slot la flecha y se oculta
        this.targetPointer = this.add.triangle(0, 0, 0, 0, 24, 0, 12, 18, 0xff0000);
        this.targetPointer.setVisible(false);
    }

    setupSkillCarouselUI() {
        // Marco grande redondeado del panel de control
        const panelGfx = this.add.graphics();
        panelGfx.fillStyle(0xffffff, 1);
        panelGfx.fillRoundedRect(30, 360, 600, 240, 24);
        panelGfx.lineStyle(3, 0x2c3e50, 1);
        panelGfx.strokeRoundedRect(30, 360, 600, 240, 24);

        //Subbloque izquierdo con carrusel de habilidades
        // Creamos el bloque de texto para el de arriba
        this.prevSkillBox = this.add.rectangle(0, -68, 250, 42, 0xf8f9fa).setStrokeStyle(2, 0x95a5a6);
        this.prevSkillText = this.add.text(-110, -68, '', { font: '15px Arial', color: '#7f8c8d' }).setOrigin(0, 0.5);
        this.prevSkillIcon = this.add.graphics();

        // Creamos el bloque de texto para el seleccionado
        this.mainSkillBox = this.add.rectangle(0, 0, 270, 58, 0xecf5ff).setStrokeStyle(3, 0x2c3e50);
        this.mainSkillText = this.add.text(-120, 0, '', { font: 'bold 20px Arial', color: '#2c3e50' }).setOrigin(0, 0.5);
        this.mainSkillIcon = this.add.graphics();

        // Creamos el bloque de texto para el de abajo
        this.nextSkillBox = this.add.rectangle(0, 68, 250, 42, 0xf8f9fa).setStrokeStyle(2, 0x95a5a6);
        this.nextSkillText = this.add.text(-110, 68, '', { font: '15px Arial', color: '#7f8c8d' }).setOrigin(0, 0.5);
        this.nextSkillIcon = this.add.graphics();

        // Creamos el carrusel
        this.carruselContainer = this.add.container(185, 480);
        this.carruselContainer.add([
            this.prevSkillBox, this.prevSkillText, this.prevSkillIcon,
            this.mainSkillBox, this.mainSkillText, this.mainSkillIcon,
            this.nextSkillBox, this.nextSkillText, this.nextSkillIcon
        ]);

        //Subbloque derecho con la descripción de la habilidad
        this.descContainer = this.add.container(475, 480);
        //Bloque de descripcion
        const descGfx = this.add.graphics();
        descGfx.fillStyle(0xffffff, 1);
        descGfx.fillRoundedRect(-125, -98, 250, 196, 16);
        descGfx.lineStyle(5, 0x2c3e50, 1);
        descGfx.strokeRoundedRect(-125, -98, 250, 196, 16);

        this.targetBarsGfx = this.add.graphics();
        this.descTypeIcon = this.add.graphics();
        // Texto de coste de energía(por defecto en 0), título y descripción
        this.energyCostText = this.add.text(-68, -74, '0', {
            font: 'bold 18px Arial',
            color: '#e67e22'
        }).setOrigin(0, 0.5);
        this.descTitleText = this.add.text(0, -36, 'Descripción', {
            font: 'bold 18px Arial',
            color: '#2c3e50'
        }).setOrigin(0.5);
        this.descBodyText = this.add.text(0, 22, '', {
            font: '14px Arial',
            color: '#34495e',
            align: 'center',
            wordWrap: { width: 220 } // Ajusta el ancho del texto para que se ajuste al panel
        }).setOrigin(0.5);

        this.descContainer.add([
            descGfx, this.targetBarsGfx, this.descTypeIcon,
            this.energyCostText, this.descTitleText, this.descBodyText
        ]);
    }
    updateCarouselDisplay() {

        const len = this.skillsList.length; // Número de habilidades disponibles
        // Se añaden los indices de la habilidad actual, la anterior y la siguiente
        const prevSkill = this.skillsList[(this.selectedSkillIndex - 1 + len) % len];
        const currSkill = this.skillsList[this.selectedSkillIndex];
        const nextSkill = this.skillsList[(this.selectedSkillIndex + 1) % len];
        //Los mismo con los estilos
        const prevStyle = TYPE_STYLES[prevSkill.type];
        const currStyle = TYPE_STYLES[currSkill.type];
        const nextStyle = TYPE_STYLES[nextSkill.type];

        // Carrusel
        //Actualizamos los textos y dibujamos los simbolos de tipo de habilidad en el carrusel
        this.prevSkillText.setText(prevSkill.name);
        this.drawTypeSymbol(this.prevSkillIcon, prevStyle, 108, -68, 7);

        this.mainSkillText.setText(currSkill.name);
        this.mainSkillBox.setStrokeStyle(3, currStyle.color);
        this.drawTypeSymbol(this.mainSkillIcon, currStyle, 115, 0, 10);

        this.nextSkillText.setText(nextSkill.name);
        this.drawTypeSymbol(this.nextSkillIcon, nextStyle, 108, 68, 7);

        // Descripción
        // Actualizamos el texto de coste de energía, título y descripción de la habilidad seleccionada
        this.energyCostText.setText(`-${currSkill.energyCost}`);
        this.descTitleText.setText(`Descripción (Prog: +${currSkill.damage})`);
        this.descBodyText.setText(currSkill.description);
        this.drawTypeSymbol(this.descTypeIcon, currStyle, 98, -74, 10);

        // Dibujar las 3 barritas de objetivo (1 llena = single, 3 llenas = all). Más adelantes habrá que hacer en caso de 2 cuando se incorporen las habilidades
        const tg = this.targetBarsGfx;
        tg.clear();
        const activeBars = currSkill.targetType === 'all' ? 3 : 1; // Ya se hará un switch para 2 cuando se incorporen más habilidades, así se ve más simple de momento
        for (let b = 0; b < 3; b++) {
            //posiciones 
            const bx = -108 + b * 12;
            const by = -86;
            if (b < activeBars) { // De momento solo hay 1, pero más adelante tendría que ir comprobando por posiciones más bien
                tg.fillStyle(0x5d6d7e, 1);
                tg.fillRect(bx, by, 8, 24);
            } else {
                tg.lineStyle(2, 0x5d6d7e, 1);
                tg.strokeRect(bx, by, 8, 24);
            }
        }
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