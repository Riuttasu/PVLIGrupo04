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
    NotPurchased: { color: 0x95a5a6, hex: '#ff0000', label: 'Not Purchased' },   // no comprado
    Purchased:    { color: 0xf1c40f, hex: '#0ff11a', label: 'Purchased' },       // comprado pero no maxeado
    MaxedOut:     { color: 0x3498db, hex: '#9e34db', label: 'Maxed Out' }        // maxeado
};

export default class StoreScene extends Phaser.Scene {
    constructor() {
        super({ key: 'StoreScene' });
    }
    create(){
        this.TeacherPanel();
        

    }
    //metodo que crea el panel de la tienda
    //contiene: estadisticas del jugador: diseño, programacion, gestion 
    TeacherPanel(){
        //foto del profe
        // su marco
        
        // foto del profe
        
        // como esta su energia 

        // como esta sus tipos (diseño, programacion, gestion)
    }
    //metodo que crea el panel de mejoras
    //tiene los botones de las habilidades (estos tienen que ser botones)
    MejorasPanel(){
        // organizarlos
    }
    //metodo que crea el panel de descripcion de la habilidad
    // esto muestra la descripcion de la habilidad
    Description(){

    }

}