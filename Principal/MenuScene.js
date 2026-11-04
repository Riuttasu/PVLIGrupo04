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
     let BotonManagement = this.add.image(100,100,'SceneButton')
     BotonManagement.setScale(0.2);
      BotonManagement.setTint(0x008000);
     BotonManagement.setInteractive();
     let Boton1 = this.add.image(100,200,'SceneButton')
     Boton1.setScale(0.2);
      Boton1.setTint(0xFFFF00);
     Boton1.setInteractive();
     let Boton2 = this.add.image(100,300,'SceneButton')
     Boton2.setScale(0.2);
      Boton2.setTint(0xFFC0CB);
     Boton2.setInteractive();
     let Boton3 = this.add.image(100,400,'SceneButton')
     Boton3.setScale(0.2);
      Boton3.setTint(0xff0000);
     Boton3.setInteractive();

     BotonManagement.on('pointerdown', ()=>{this.scene.start('ManagementGame')}) // usamos flechi inportante ehhhh
      Boton1.on('pointerdown', ()=>{this.scene.start('programmingMinigame')}) // usamos flechi inportante ehhhh
       Boton2.on('pointerdown', ()=>{this.scene.start('ManagementGame')}) // usamos flechi inportante ehhhh
        Boton3.on('pointerdown', ()=>{this.scene.start('RPGScene')}) // usamos flechi inportante ehhhh
   }
   update()
   {

   }
}
