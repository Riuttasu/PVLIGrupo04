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
     let boton2 = this.add.image(400,200,'SceneButton')
     boton2.setInteractive();

     boton.on('pointerdown', ()=>{this.scene.start('ManagementGame')}) // usamos flechi inportante ehhhh
     boton2.on('pointerdown', ()=>{this.scene.start('DesignGame')}) // esta para que se carge otra escena de dieseño 
   }
   update()
   {

   }
}
