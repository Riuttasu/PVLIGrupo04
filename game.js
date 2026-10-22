import MinijuegoProgra from "./Lune/minijuegoprogramacion.js";

/**
 * Inicio del juego en Phaser. Creamos el archivo de configuración del juego y creamos
 * la clase Game de Phaser, encargada de crear e iniciar el juego.
 */
let config = {
    parent: 'Juego',
    type: Phaser.AUTO,
    width:  1000,
    height: 500,
    scale: {
        mode: Phaser.Scale.FIT,  
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
    },
    pixelArt: false,
    scene: [MinijuegoProgra],
};

new Phaser.Game(config);