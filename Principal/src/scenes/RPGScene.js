//Me he arrepentido un montón de poner números mágicos, Rubén tenía razón, prometo arreglarlos en algún momento
import Skill from '../gameObjects/RPG/Skill.js';
import Enemy from '../gameObjects/RPG/Enemy.js';
/**
 * Objeto que guarda los estilos llamados Programming, Design y Management para la interfaz
 * El estilo contiene color(0x000000), hex(#000000), shape('circle'), label('Prog.')
 */
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
        //Guardamos el playerData del registro 
        this.playerData = this.registry.get('playerData');
        //this.playerData.characterID = 0; //Debug para elegir el profe 
        //this.playerData.maxHealth = 1000;
        this.cooldown = 0;
        this.turns = 1;
        this.isEnemyTurn = false;
    }

    create() {
        this.isGameOver = false; //Flag que determina el fin del juego
        //Fondo moradito, ya no es moradito, ahora es emo
        this.cameras.main.setBackgroundColor('#00120f');

        //Guardamos en variables los jsons
        this.messagesList = this.cache.json.get('chat');
        const skills = this.cache.json.get('skillsData').map(data => new Skill(data));
        this.skillsList = []; 
        //Asignamos a la lista de habilidades de la batalla las habilidades que tiene el jugador en su json
        for (let i = 0; i < this.playerData.playerSkillsID.length; i++) {
            this.skillsList.push(skills[this.playerData.playerSkillsID[i]]);
        }
        this.enemyDatabase = this.cache.json.get('enemiesData'); 
        const levelsData = this.cache.json.get('levelsData'); 
        this.enemyQueue = [...levelsData[this.playerData.level - 1]]; //LLeva los indices de los enemigos del nivel del jugador
        //El character lo necestimos para el sprite y el nombre del profe
        const characters = this.cache.json.get('characterData');
        this.currentProf = characters[this.playerData.characterID % 3];

        // Estado del combate
        this.maxEnergy = this.playerData.maxHealth; //Energía máxima
        this.currentEnergy = this.maxEnergy; // Energía actual
        this.displayedEnergy = this.currentEnergy; // Para la animación de la barra
        //##### Cuando los niveles estén diseñados en el levels habrá que asignarlo según la variable del levels #####
        this.statGoal = 1000; // Objetivo temporal de progreso por estadística en el desafío
        this.statProgress = { Programming: 0, Design: 0, Management: 0 }; //Progreso de las barras de objetivos

        // Slots de enemigos
        this.activeSlots = [null, null, null]; 
        // {damage, type} para las bombas
        this.slotBomb = [null, null, null];
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
        this.setupHealthBar(); //Barra de vida sin datos
        this.setupEnemySlots(); //Posiciones y rectágulos de enemigos pero sin seleccionarlos todavía
        this.setupTargetPointer(); //Creamos sin ponerlo todavía la flecha para seleccionar enemigos
        this.setupSkillCarouselUI(); //Crea todo el sistema para seleccionar habilidades incluido descripciones
        this.setupCharacterPanel(); //Crea el bocadillo, la imagen del profe y el chat
        this.setupControls(); //Crea todos los eventos de input de teclas


        // Poner los enemigos, la vida y las habilidades inicilmente
        this.fillEmptySlots(); //Coloca los primeros 3 enemigos
        this.updateHealthBar(); //Coloca los datos en la barra de vida
        this.updateCarouselDisplay(); //Coloca las habilidades correspondientes a la seleccionada por defecto
        this.updateTurnVisuals(true)
    }
    /** Crea los objetos necesarios para la barra de energía y las tres barras de objetivos. Todo depende del  */
    setupHealthBar() {
        // Barra de energia
        this.energyGraphics = this.add.graphics(); //Objeto vacío donde describiremos la forma de la barra
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
    /**Como la barra de vida está pintada con el graphics para que sea más fácil que tengas las lineas y tal
     * se llama a este método tanto con la última versión como con la actualizada para poder hacer el tween
     * He probado con máscaras, separando por piezas con rectágulos, experimentando con el tween y esto es lo que mejor queda, espero no cargarme el rendimiento
     */
    drawOnlyHealthBar(){
        // Borramos la energía
        const g = this.energyGraphics;
        g.clear(); 
        // Preparamos una nueva
        const bx = 30, by = 24, bw = 260, bh = 56; //posiciones y tamaño de la barra
        const pct = Phaser.Math.Clamp(this.displayedEnergy / this.maxEnergy, 0, 1); // nos aseguramos que la energía no se desborde

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
        g.lineStyle(3, 0xe67e22, 1)
        g.strokeRect(bx + bw, by + 15, 12, 26);

        // Actualizamos el texto de energía
        this.energyText.setText(`Energía: ${this.currentEnergy}/${this.maxEnergy}`);
    }
    /** Pinta la barra de energia y las barras de progreso con los datos concretos*/
    updateHealthBar() {
        //Animacion de barra
        this.tweens.killTweensOf(this.aniHealtBar);
        //(Info de un blog de por ahí) Es un tween que se hace el método del onUpdate tanto con la versión inicial como la actualizada
        this.aniHealtBar = this.tweens.add({
            targets: this, 
            displayedEnergy: this.currentEnergy,
            duration: 400,
            ease: 'Power2',
            onUpdate: () => this.drawOnlyHealthBar()
        });
        /*Actualizar las 3 barras de progreso con los nuevos valores de statProgress y statGoal. 
         * Se calcula el progreso y se ajusta la altura del relleno de la barra y el texto que muestra el valor actual*/
            Object.keys(this.statBars).forEach(type => {
            const bar = this.statBars[type];
            const val = this.statProgress[type];
            const progress = Phaser.Math.Clamp(val / this.statGoal, 0, 1);
            this.tweens.killTweensOf(bar.fill);
            this.tweens.add({
                targets: bar.fill,
                height: 66 * -progress,
                duration: 400,
                ease: 'Power2'
        });
        bar.valText.setText(`${Math.round(val)}`);
        });
    }
    /** Crea los objetos de los enemigos pero sin asignar las variables */
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
    /** Actualiza el aspecto de los slots de enemigos con los objetos asignados*/
    refreshSlotsDisplay() {
        for (let i = 0; i < 3; i++) {
            const enemy = this.activeSlots[i];
            const slot = this.slotContainers[i];
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
                //slot.liquidFill.height = (slot.cardH - 12) * -progress;
                // Animación del líquido
                this.tweens.killTweensOf(slot.liquidFill);
                if (enemy.currentHp === 0) { //Si acaba de aparecer que no se vuelva loco con al animación tampoco
                    slot.liquidFill.height = 0;
                } else {
                    this.tweens.add({
                        targets: slot.liquidFill,
                        height: (slot.cardH - 12) * -progress,
                        duration: 400,
                        ease: 'Power2'
                    });
                }

                // Símbolo geométrico en esquina superior derecha
                this.drawTypeSymbol(slot.typeIcon, style, slot.cardW / 2 - 22, -slot.cardH / 2 + 22, 10);

                slot.enemySprite.setTexture(enemy.sprite);
                slot.nameText.setText(enemy.name);
                slot.hpText.setText(`HP: ${enemy.currentHp}/${enemy.maxHp}`);
                slot.container.setVisible(true);
                // Se le añade un tinte si está congelado
                if (enemy.freeze > 0) {
                    slot.enemySprite.setTint(0x70d6ff).setAlpha(0.55); // Molaría que fuera un sprite porque casi no se ve
                } 
                else {
                    slot.enemySprite.clearTint().setAlpha(1); //Se devuelve a la normalidad
                }
                if (this.slotBomb[i] !== null) {
                    const bombStyle = TYPE_STYLES[this.slotBomb[i].type];
                    // Dibujamos un segundo borde interior discontinuo o brillante para indicar el efecto
                    slot.cardBorder.lineStyle(3, bombStyle.color, 0.6);
                    slot.cardBorder.strokeRoundedRect(-slot.cardW / 2 + 6, -slot.cardH / 2 + 6, slot.cardW - 12, slot.cardH - 12, 12);
                }
            } else {
                slot.container.setVisible(false);
            }
        }
    }
    /** Dibuja círculo, triángulo o cuadrado según la estadística
     * Graphics es el objeto al que se le aplica, el style es lo que determina si es programming, design o management, 
     * x e y son las posiciones y radius el tamaño  */
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
    /** Se coloca la flecha en el primer slot y se esconde acechando */
    setupTargetPointer() {
        // Se coloca en el primer slot la flecha y se oculta
        this.targetPointer = this.add.triangle(0, 0, 0, 0, 24, 0, 12, 18, 0xff0000);
        this.targetPointer.setVisible(false);
    }
    /** Crea vacíos todos los elementos relacionados con las habilidades: 
     * El carrusel de habilidades, la descripción y todos los elementos en su interior */
    setupSkillCarouselUI() {
        // Marco grande redondeado del panel de control
        this.skillsPanelContainer = this.add.container(0, 0); //Lo metemos en el container para oscurecerlo y aclararlo luego
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
        this.skillsPanelContainer.add(panelGfx);
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
        this.skillsPanelContainer.add([this.carruselContainer, this.descContainer]);
    }
    updateTurnVisuals(isPlayerTurn) {
        const playerAlpha = isPlayerTurn ? 1 : 0.45;
        const enemyAlpha = isPlayerTurn ? 0.55 : 1;

        // Resaltar u oscurecer panel de habilidades y del profesor
        this.tweens.add({
            targets: [this.skillsPanelContainer, this.profContainer],
            alpha: playerAlpha,
            duration: 300,
            ease: 'Power2'
        });

        // Resaltar u oscurecer las tarjetas de los enemigos
        this.slotContainers.forEach(slot => {
            this.tweens.add({
                targets: slot.container,
                alpha: enemyAlpha,
                duration: 300,
                ease: 'Power2'
            });
        });
    }
    /** Asigna los datos actuales en el carrusel y la descripción actualizando su aspecto */
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
        this.descBodyText.setText(currSkill.descriptionshort);
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
    /** Crea el bocadillo de diálogo, el chat y el espacio del avatar del profesor */
    setupCharacterPanel() {
        // Bocadillo de diálogo del profesor
        const bubbleGfx = this.add.graphics();
        bubbleGfx.fillStyle(0xffffff, 1);
        bubbleGfx.fillRoundedRect(655, 35, 240, 175, 45);
        bubbleGfx.lineStyle(4, 0x2c3e50, 1);
        bubbleGfx.strokeRoundedRect(655, 35, 240, 175, 45);
        // Pico del bocadillo apuntando hacia el profesor
        bubbleGfx.fillStyle(0xffffff, 1);
        bubbleGfx.fillTriangle(795, 208, 825, 208, 835, 242);
        bubbleGfx.lineBetween(795, 210, 835, 242);
        bubbleGfx.lineBetween(825, 210, 835, 242);
        //Texto inicial del bocadillo, se puede cambiar con la función pushChat(msg)
        this.speechText = this.add.text(775, 122, `¡Vamos ${this.currentProf.name}!\nPuedes con esto`, {
            font: 'bold 14px Arial',
            color: '#2c3e50',
            align: 'center',
            wordWrap: { width: 200 }
        }).setOrigin(0.5);

        // Ventana de chat
        const chatX = 910, chatY = 20, chatW = 170, chatH = 290; //Dimensiones del panel de chat
        const chatBg = this.add.rectangle(chatX, chatY, chatW, chatH, 0x18181b).setOrigin(0, 0);
        chatBg.setStrokeStyle(2, 0x9146ff);

        this.add.text(chatX + chatW / 2, chatY + 16, 'CHAT - JAM FDI', {
            font: 'bold 12px Arial',
            color: '#bf94ff'
        }).setOrigin(0.5);

        // area interior donde irán los mensajes (debajo del título y con esquinas que sino te da la clausfobia esa)
        const areaX = chatX + 8, areaY = chatY + 34, areaW = chatW - 16, areaH = chatH - 42;

        // container del chat posicionado en la esquina superior izquierda del area de mensajes
        this.chatContainer = this.add.container(areaX, areaY); 
        this.chatAreaW = areaW; this.chatAreaH = areaH;

        // La mascarilla que se nos escapan los bichos(Es el mask)
        const maskRect = this.add.rectangle(areaX, areaY, areaW, areaH, 0xffffff).setOrigin(0, 0).setVisible(false);
        this.chatContainer.enableFilters(); //Por defecto da error
        this.chatContainer.filters.external.addMask(maskRect);

        //No me ha quedado tan claro lo de las pools, tecnicamente esto es una pool pero no sé si es como quiere que tony operemos
        //Compila, eso sí
        this.chatPool = [];
        for (let i = 0; i < this.messagesList.mess.length; i++) {
            const txt = this.add.text(0, areaH, '', {
                font: '11px Arial',
                color: '#efeff1',
                wordWrap: { width: areaW }
            }).setOrigin(0, 1)
            txt.setVisible(false); 
            this.chatContainer.add(txt);
            this.chatPool.push(txt);
        }

        this.chatPoolIndex = 0; //Va contando cuantos se han creado
        this.activeChatTexts = []; //Va desde abajo siendo el 0 hasta arriba siendo el último
        this.availableMsgIndices = []; //Estos son los que queda por poner que se rellenan al terminarse
        this.nextChatDelay = Phaser.Math.Between(400, 1200);

        // Profe en la esquina
        this.profContainer = this.add.container(865, 455);
        const profCard = this.add.rectangle(0, 0, 230, 250, 0xdfe6e9);
        profCard.setStrokeStyle(5, TYPE_STYLES[this.currentProf.style].color);

        const profSprite = this.add.image(0, -15, this.currentProf.sprite).setDisplaySize(160, 200);
        const profName = this.add.text(0, 100, `Prof. ${this.currentProf.name}`, {
            font: 'bold 18px Arial',        
            color: '#2c3e50'
        }).setOrigin(0.5);

        this.profContainer.add([profCard, profSprite, profName]);
    }
    /** Añade al chat el msg. En name y el color es para el chat automático*/
    pushChat(msg, name = "MASTER", color = '#ffffffff') {
        // Pilla un objeto de los que quedan en la pool
        const textObj = this.chatPool[this.chatPoolIndex];
        this.chatPoolIndex = (this.chatPoolIndex + 1) % this.chatPool.length;

        // Recojo el índice para ver si está activo el texto o no
        const textObjIndex = this.activeChatTexts.indexOf(textObj); 
        if (textObjIndex !== -1) this.activeChatTexts.splice(textObjIndex, 1);

        // Paramos los tweens que pueda haber por si acaso
        this.tweens.killTweensOf(textObj);
        //Metemos el texto, color y posición inicial (fuera por la derecha, abajo del todo para la animación)
        textObj.setText(name + ": " + msg);
        textObj.setColor(color);
        textObj.setVisible(true);
        textObj.x = this.chatAreaW + 15; // Lo ponemos a la derecha del panel
        textObj.y = this.chatAreaH;
        //Esta maravilla de unshift mete el textObj por el principio del array en vez de por el final
        this.activeChatTexts.unshift(textObj);

        // Animación del texto nuevo
        this.tweens.add({
            targets: textObj,
            x: 0,
            duration: 250,
            ease: 'Power2'
        });

        // A mover todos los demás
        const padding = 6; // Interlineado
        let currentBottomY = this.chatAreaH; // posicion del boton que tiene que mover
        //Le metemos a todos los demás un Tween
        for (let i = 0; i < this.activeChatTexts.length; i++) {
            const it = this.activeChatTexts[i];
            if (i > 0) { // A partir de la posicion 1 que es el que antes era el de más abajo
                this.tweens.killTweensOf(it);
                this.tweens.add({
                    targets: it,
                    x: 0, // Lo pongo por miedo a los tweens, creo que es por la peli del resplandor, le pille bastante mal rollo a los gemelos desde entonces 
                    y: currentBottomY,
                    duration: 200,
                    ease: 'Power2' // He probado con unas cuantas y esta divertido ver como cambia, esta me mola pero invito a pasar un buen rato provando
                });
            }
            // Al 0 hay que pasar por el para saber cuanto tiene que subir el segundo
            currentBottomY -= (it.height + padding); // Se calcula la posición del siguiente mediante la altura de este y el interlineado
        }
    }
    update(t, delta){
        if (this.isGameOver) return; // Al ganar se le va la flapa

        this.cooldown += delta;
        if (this.cooldown >= this.nextChatDelay) {
            // Si se han gastado todos los mensajes del JSON, rellenamos y gambleamos
            if (this.availableMsgIndices.length === 0) {
                this.availableMsgIndices = this.messagesList.mess.map((_, index) => index);
                Phaser.Utils.Array.Shuffle(this.availableMsgIndices);
            }
            // Cocinamos un mensaje aleatorio
            const messIdx = this.availableMsgIndices.pop();
            const nameIdx = Phaser.Math.Between(0, this.messagesList.names.length - 1);
            const colIdx = Phaser.Math.Between(0, this.messagesList.colors.length - 1);

            this.pushChat(this.messagesList.mess[messIdx], this.messagesList.names[nameIdx], this.messagesList.colors[colIdx]);
            this.cooldown = 0;
            this.nextChatDelay = Phaser.Math.Between(400, 1200);
        }
    }
    /** Crea todos los eventos relacionados con el input */
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
        this.input.keyboard.on('keydown-ESC', () => this.cancelTargetSelection());
    }
    /** Si pulsa ESC y está seleccionando el enemigo al que atacar, deja de hacerlo */
    cancelTargetSelection() {
        if (this.isSelectingTarget) {
            this.isSelectingTarget = false;
            this.targetPointer.setVisible(false);
            this.speechText.setText('Selección cancelada.');
        }
    }
    /** Asigna los siguientes enemigos en los slots vacíos y llama a refreshSlotsDisplay para actualizar el aspecto */
    fillEmptySlots() {
        for (let i = 0; i < 3; i++) {
            if (this.activeSlots[i] === null && this.enemyQueue.length > 0) {
                const enemyIndex = this.enemyQueue.shift();
                this.activeSlots[i] = new Enemy(this.enemyDatabase[enemyIndex]);
            }
        }
        this.refreshSlotsDisplay();
    }
    /**Si no esta atacando cambia la habilidad actual por la de arriba*/
    handleUp() {
        if (this.isGameOver || this.isEnemyTurn || this.isSelectingTarget) return;

        this.selectedSkillIndex = (this.selectedSkillIndex - 1 + this.skillsList.length) % this.skillsList.length;
        this.updateCarouselDisplay();
    }
    /**Si no esta atacando cambia la habilidad actual por la de abajo*/
    handleDown() {
        if (this.isGameOver || this.isEnemyTurn || this.isSelectingTarget) return;

        this.selectedSkillIndex = (this.selectedSkillIndex + 1) % this.skillsList.length;
        this.updateCarouselDisplay();
    }
    /**Si está atacando mueve la flecha a la izquierda*/
    handleLeft() {
        if (this.isGameOver || this.isEnemyTurn || !this.isSelectingTarget) return;

        this.moveTargetSelection(-1);
    }
    /**Si está atacando mueve la flecha a la derecha*/
    handleRight() {
        if (this.isGameOver || this.isEnemyTurn || !this.isSelectingTarget) return;

        this.moveTargetSelection(1);
    }
    /** Asigna la flecha en la dirección seleccionado y actualiza el aspecto llamando a updateTargetPointerPosition */
    moveTargetSelection(dir) {
        this.newSlot = this.selectedTargetSlot + dir;

        while (this.newSlot >= 0 && this.newSlot < 3) {
            if (this.activeSlots[this.newSlot] !== null) {
                //this.tweens.add({
                //    targets: this, 
                //    newSlot: this.selectedTargetSlot,
                //    duration: 100,
                //    ease: 'Power2',
                //    onUpdate: () => this.updateTargetPointerPosition()
                //})
                this.selectedTargetSlot = this.newSlot;
                this.updateTargetPointerPosition();
                break;
            }
            this.newSlot += dir;
        }
    }
    /** Actualiza la position de la flecha */
    updateTargetPointerPosition() {
        const targetPos = this.slotCoordinates[this.selectedTargetSlot];
        this.tweens.add({
            targets: this.targetPointer, 
            x: this.slotCoordinates[this.selectedTargetSlot].x - 12,
            y: this.slotCoordinates[this.selectedTargetSlot].y - 125,
            duration: 200,
            ease: 'Power2',
        })
        this.targetPointer.setVisible(true);
    }
    /** Si no está atacando entre en estado de ataque, si ya lo estaba ejecuta el ataque */
    handleConfirm() {
        if (this.isGameOver || this.isEnemyTurn) return;
        const currentSkill = this.skillsList[this.selectedSkillIndex];
        //Comprueba si le queda energía al jugador para usar la habilidad, si no le queda energía, no hace nada
        //if (this.currentEnergy < currentSkill.energyCost) {
        //    this.speechText.setText('PERO QUÉ HACES?????\n¡NO QUEDA ENERGÍA!');
        //    return;
        //}
        //si es para seleccionar una habilidad
        if (!this.isSelectingTarget) {
            if (currentSkill.typedamage === 'Restoration') this.executeSkill(currentSkill, 3)
            else if (currentSkill.targetType === 'single') {
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
                this.executeSkill(currentSkill, -1);
            }
        } else {
            // Confirma que la posicion en la que esta la flecha es el target correcto
            this.executeSkill(currentSkill, this.selectedTargetSlot);
            this.isSelectingTarget = false;
            this.targetPointer.setVisible(false);
        }
    }
    /**Ejecuta la habilidad skill en la posición de slot de tagetSlotIndex
     * Actualiza la energía con el coste de la habilidad
     * Actualiza la vida del objetivo
     * Pone un mensaje del ataque
     * Controla si ha puerto y si lo ha hecho añade al progreso lo que corresponde
     * Por último siempre comprueba si ha terminado el juego en esa ronda
     */
    executeSkill(skill, targetSlotIndex) {
        const targets = targetSlotIndex === -1 ? [0, 1, 2] : [targetSlotIndex];
        //this.currentEnergy = Math.max(0, this.currentEnergy - skill.energyCost); //actualizamos la energía pro si ha costado algo
        if (targetSlotIndex !== 3) this.enemy = this.activeSlots[targetSlotIndex]; //Enemy es el objetivo
        switch(skill.typedamage){
            case "basic":{
                targets.forEach(idx => this.damageSlot(idx, skill.damage, skill.type));
                this.pushChat("Basic")
            }; break;
            case "Split Attack":{
                this.pushChat("Split Attack")
                targets.forEach(idx => {
                this.damageSlot(idx, skill.damage, skill.type);
                const leftIdx = (idx + 1) % 3;
                const rightIdx = (idx + 2) % 3; //
                this.damageSlot(leftIdx, skill.damage / 2, skill.type);
                this.damageSlot(rightIdx, skill.damage / 2, skill.type);
            });
            }; break;
            case "Restoration":{
                this.currentEnergy += skill.damage;
                this.pushChat("Restoration")
            }; break;
            case "Freeze":{
                targets.forEach(idx => {
                if (this.activeSlots[idx]) this.activeSlots[idx].freeze += skill.damage;
                });
                this.pushChat("Freeze")
            }; break;
            case "Double Attack":{
                this.enemy.takeDamage(skill.damage, skill.type)
                this.pushChat("Double Attack")
                this.turns++;
            }; break;
            case "Effective":{
                targets.forEach(idx => this.damageSlot(idx, skill.damage, skill.type, 3));
                this.pushChat("Effective")
            }; break;
            case "Bomb":{
            targets.forEach(idx => {
                this.slotBomb[idx] = { damage: skill.damage, type: skill.type };
            });
            this.pushChat("BOMBA");
            }; break;
            default:console.log("QUE ES ESTO?????"); break;
        }
        // Sumar progreso a la barra superior del tipo correspondiente
        
        if (skill.typedamage !== "Restoration" && this.enemy.isComplete()) {
            
            this.activeSlots[targetSlotIndex % 3] = null;
            
            this.statProgress[this.enemy.type] = Math.min(this.statGoal, this.statProgress[this.enemy.type] + this.enemy.maxHp);
        
        }
        this.turns--;
        this.updateHealthBar();
        this.refreshSlotsDisplay();
        if (this.turns === 0)this.enemyTurn();
        // Reponer slots vacios con la pila de niveles
        else {this.fillEmptySlots();// Comprobar si no quedan enemigos en combate ni en la cola y poner nuevos
        this.checkVictory();}
    }
    
    damageSlot(slotIndex, damage, type, critMul = 2) {
        const enemy = this.activeSlots[slotIndex];
        if (!enemy) return;

        enemy.critMul = critMul;
        enemy.takeDamage(damage, type);
        enemy.critMul = 2;

        if (enemy.isComplete()) {
            this.activeSlots[slotIndex] = null;
            this.statProgress[enemy.type] = Math.min(
                this.statGoal,
                this.statProgress[enemy.type] + enemy.maxHp
            );
        }
    }

    enemyTurn(){
        this.isEnemyTurn = true;
        this.updateTurnVisuals(false); // Oscurece profe/habilidades e ilumina a los enemigos
        
        // Guardamos los enemigos con slots con enemigos
        const activeEnemies = this.activeSlots.map((enemy, index) => ({ enemy, index })).filter(item => item.enemy !== null);
        let delay = 500; // Pausa inicial de 0.5s al cambiar de turno

        activeEnemies.forEach(({ enemy, index }) => {
            this.time.delayedCall(delay, () => {
                if (this.isGameOver) return;
                const slot = this.slotContainers[index];
                if (enemy.freeze === 0) {
                    // Saltito :D
                    this.tweens.add({
                        targets: slot.container,
                        y: slot.container.y + 18,
                        duration: 120,
                        yoyo: true,
                        ease: 'Power2'
                    });
                    this.currentEnergy = Math.max(0, this.currentEnergy - 10);
                    this.updateHealthBar(); // El tween de la vida es de 400
                    this.checkVictory();    // Comprueba si nos han derrotado
                } else {
                    // Animación de hace frio o algo así
                    this.tweens.add({
                        targets: slot.container,
                        x: slot.container.x + 6,
                        duration: 60,
                        yoyo: true,
                        repeat: 2
                    });
                    enemy.freeze--;
                    this.refreshSlotsDisplay(); // Si llega a 0, le quita el tinte azulado
                }
            });

            delay += 750; // Esperamos 0.75s entre cada enemigo (da tiempo sobrado al tween de 0.4s)
        });

        // Cuando terminan todos los enemigos, devolvemos el turno al jugador
        this.time.delayedCall(delay + 200, () => {
            if (this.isGameOver) return;

            this.turns++;
            this.fillEmptySlots();
            let bombTriggered = false;
            for (let i = 0; i < 3; i++) {
                const bomb = this.slotBomb[i];
                if (bomb !== null && this.activeSlots[i] !== null) {
                    this.damageSlot(i, bomb.damage, bomb.type);
                    bombTriggered = true;
                }
            }
        
            if (bombTriggered) {
                this.refreshSlotsDisplay();
                this.updateHealthBar();
                this.fillEmptySlots(); // Por si el daño de casilla mató a alguno, que entre el siguiente
            }
            this.checkVictory();

            this.isEnemyTurn = false;
            this.updateTurnVisuals(true); // Vuelve a iluminar al profe y las habilidades
        });
    }
    checkVictory() {
        const isQueueEmpty = this.enemyQueue.length === 0;
        const isSlotsEmpty = this.activeSlots.every(slot => slot === null);

        if (isQueueEmpty && isSlotsEmpty && !this.isGameOver) {
            this.isGameOver = true;

            // Ocultamos la flecha por si acaso 
            if (this.targetPointer) this.targetPointer.setVisible(false);
            this.speechText.setText('¡Desafío superado!\n¡Menuda aura bro B)!');
            // Texto de Victoria en el centro de la zona de enemigos, en el futuro igual es una imagen 
            this.add.text(320, 230, '¡VICTORIA!', {
                font: 'bold 52px Arial',
                color: '#2ecc71',
                stroke: '#2c3e50',
                strokeThickness: 6
            }).setOrigin(0.5);

            // Tras un ratin, vuelve al menú
            this.time.delayedCall(4000, () => {
                //this.playerData.characterID++; //Debug para ver a todos los profes en combate
                this.scene.start('MenuScene');
            });
        }
        else if (this.currentEnergy <= 0 && !this.isGameOver) {
            this.isGameOver = true;
            if (this.targetPointer) this.targetPointer.setVisible(false);
            this.speechText.setText('Siento que se me va el aura del cuerpo\nNo estoy nada chill, chat...');
            //texto de derrota
            this.add.text(330, 230, 'DERROTA', {
                font: 'bold 52px Arial',
                color: '#e74c3c',
                stroke: '#2c3e50',
                strokeThickness: 6
            }).setOrigin(0.5);
            //Tras un ratín vuelve al menú
            this.time.delayedCall(3000, () => {
                this.scene.start('MenuScene', { isWin: false, backgroundScene: 'RPGScene' });
            });
        }
    }
}   