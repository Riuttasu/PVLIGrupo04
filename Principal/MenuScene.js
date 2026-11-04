
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
    //crear botones para cambiar de escena
    let BotonManagement = this.add.image(100,100,'SceneButton')
     BotonManagement.setScale(0.2);
      BotonManagement.setTint(0xff0000);
     BotonManagement.setInteractive();
     let BotonDesign = this.add.image(100,200,'SceneButton')
     BotonDesign.setScale(0.2);
      BotonDesign.setTint(0xff0000);
     BotonDesign.setInteractive();
     let Boton2 = this.add.image(100,300,'SceneButton')
     Boton2.setScale(0.2);
      Boton2.setTint(0xff0000);
     Boton2.setInteractive();
     let Boton3 = this.add.image(100,400,'SceneButton')
     Boton3.setScale(0.2);
      Boton3.setTint(0xff0000);
     Boton3.setInteractive();

<<<<<<< HEAD
      BotonManagement.on('pointerdown', ()=>{this.scene.start('ManagementGame')}) // usamos flechi inportante ehhhh
      BotonDesign.on('pointerdown', ()=>{this.scene.start('DesignGame')}) // usamos flechi inportante ehhhh
      Boton2.on('pointerdown', ()=>{this.scene.start('ManagementGame')}) // usamos flechi inportante ehhhh
      Boton3.on('pointerdown', ()=>{this.scene.start('ManagementGame')}) // usamos flechi inportante ehhhh
=======
     BotonManagement.on('pointerdown', ()=>{this.scene.start('ManagementGame')}) // usamos flechi inportante ehhhh
      Boton1.on('pointerdown', ()=>{this.scene.start('programmingMinigame')}) // usamos flechi inportante ehhhh
       Boton2.on('pointerdown', ()=>{this.scene.start('ManagementGame')}) // usamos flechi inportante ehhhh
        Boton3.on('pointerdown', ()=>{this.scene.start('RPGScene')}) // usamos flechi inportante ehhhh
>>>>>>> 4f367997c18f2cac099ddeb11d2516bbcb28a169
   }
   update()
   {

   }
}
