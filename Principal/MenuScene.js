export default class MenuScene extends Phaser.Scene{
  constructor()
  {
      super({key:'MenuScene'});
  }
    preload()
   {

   } 
   init()
   {

   }
   create()
   {
     let boton = this.add.image(200,200,'SceneButton')
     boton.setInteractive();

     boton.on('pointerdown', ()=>{this.scene.start('RPGScene')}) // usamos flechi inportante ehhhh
   }
   update()
   {

   }
}
