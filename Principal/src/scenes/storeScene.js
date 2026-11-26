import Skill from '../gameObjects/RPG/Skill.js';

/**Esto va a ser la escena de la tienda / mejoras
 * y tendra los siguientes elementos:
 * - las estadisticas del jugador (aura, energia, cuanto tiene de cada tipo (gestion, programacion, diseño))
 * - los botones de cada habilidad que además se distinguiran por:
 *   no comprado, comprado pero se puede mejorar y ya mejorado al maximo.
 * Estos botones se van a diferenciar por cuantos enemigo ataca en una ronda (1, 2 o 3)
 * 
 * Ademas, al hacer click en el boton de la habilidad se va a mostrar un panel con la descripcion de la habilidad, 
 * y al hacer click de nuevo consigues la habilidad si tienes suficiente dinero, 
 * o se te dice que no tienes suficiente dinero.
 */
const TYPE_STYLES = {
    Programming: { color: 0xe7d63c, hex: '#e7d63c', shape: 'circle', label: 'Prog.' },
    Design:      { color: 0xe74c3c, hex: '#e74c3c', shape: 'triangle', label: 'Desi.' },
    Management:  { color: 0x2ecc71, hex: '#2ecc71', shape: 'square', label: 'Mang.' }
};
const HABILITY_STATUSES = {
    NotPurchased: { color: 0xff0000, hex: '#ff0000', label: 'Not Purchased' },   // no comprado
    Purchased:    { color: 0x0ff138, hex: '#0ff138', label: 'Purchased' },       // comprado pero no maxeado
    MaxedOut:     { color: 0x8234db, hex: '#8234db', label: 'Maxed Out' }        // maxeado
};

export default class StoreScene extends Phaser.Scene {
    constructor() {
        super({ key: 'StoreScene' });
    }
    init() {
        this.playerData = this.registry.get('playerData');
    }
    create(){
        // varialbles
        //jugador actual (esto esta en el json de characterData)
        const characters = this.cache.json.get('characterData');
        this.currentProf = characters[this.playerData.characterID ];

        //la energia de cada tipo:
        this.managementPoints =this.playerData.managementPoints;
        this.designPoints = this.playerData.designPoints;
        this.programmingPoints = this.playerData.programmingPoints;

        //habilidades existentes en el JSON
        const skills = this.cache.json.get('skillsData').map(data => new Skill(data));
        //lista de habilidades que tiene el jugador
        this.skillsList = []; 
        //Asignamos a la lista de habilidades de la batalla las habilidades que tiene el jugador en su json
        for (let i = 0; i < skills.length; i++) {
            this.skillsList.push(skills[i]);
        }

        //energia que tiene actualmente el jugador
        this.currentEnergy = this.playerData.maxHealth;

        //metodos
        this.Marcos();
        this.TeacherPanel();
        this.MejorasPanel();
        this.Description();

    }
    //metodo que crea el panel de la tienda
    //contiene: estadisticas del jugador: diseño, programacion, gestion 
    TeacherPanel(){
        //foto de profesor, nombre del profesor, y estilo del profesor (color)
        this.profPhotoContainer = this.add.container(100, 100);
        const profCard = this.add.rectangle(0, 0, 140, 170, 0xdfe6e9);
        profCard.setStrokeStyle(5, TYPE_STYLES[this.currentProf.style].color);

        const profSprite = this.add.image(0, -15, this.currentProf.sprite).setDisplaySize(110, 130);
        const profName = this.add.text(0, 70, `Prof. ${this.currentProf.name}`, {
            font: 'bold 18px Arial',        
            color: '#2c3e50'
        }).setOrigin(0.5);
        this.profPhotoContainer.add([profCard, profSprite, profName]);

        // Los puntos que tiene de cada tipo
        this.profStadisticsContainer = this.add.container(250, 50)
        this.managementText = this.add.text(0, 0, `${this.managementPoints}`, {
            font: 'bold 18px Arial',        
            color: TYPE_STYLES['Management'].hex
        }).setOrigin(0.5);

        this.designText = this.add.text(0, 50, `${this.designPoints}`, {
            font: 'bold 18px Arial',        
            color: TYPE_STYLES['Design'].hex
        }).setOrigin(0.5);

        this.programmingText = this.add.text(0, 100, `${this.programmingPoints}`, {
            font: 'bold 18px Arial',        
            color: TYPE_STYLES['Programming'].hex
        }).setOrigin(0.5);
        this.profStadisticsContainer.add([this.managementText, this.designText, this.programmingText]);

        //barra de energy
        //no se como ponerlo TnT
    }
    //metodo que crea el panel de mejoras
    //tiene los botones de las habilidades (estos tienen que ser botones)
    MejorasPanel(){
        //los botones que apareceran para las habilidades
        let x = 0;
        let y = 0;
        for (let i = 0; i < this.skillsList.length;++i){
            let skill = this.add.rectangle(x, y, 200, 50, 0x000000);
            //skill.setInteractive();
            this.skillsList.push(skill);
        }

    }
    //metodo que crea el panel de descripcion de la habilidad
    // esto muestra la descripcion de la habilidad
    Description(){
        
    }

    //los marcos que se ven en el fondo de la tienda
    Marcos(){
        this.marcoInfoProfe = this.add.rectangle(0, 0, 310, 210, 0x00120f).setOrigin(0).setStrokeStyle(5, 0xFFFFFF);
        this.marcoInfoEnergia = this.add.rectangle(310, 0, 430, 210, 0x00120f).setOrigin(0).setStrokeStyle(5, 0xFFFFFF);
        this.marcoMejoras = this.add.rectangle(0, 210, 740, 410, 0x00120f).setOrigin(0).setStrokeStyle(5, 0xFFFFFF);
        this.marcoDescription = this.add.rectangle(740, 0, 360, 620, 0x00120f).setOrigin(0).setStrokeStyle(5, 0xFFFFFF);
    }

}