import Ball from './Ball.js';

export default class InfoBar extends Phaser.GameObjects.Container {
constructor(scene)
{
  super(scene, 0,0); 
  scene.add.existing(this); 
  this.Score = 0; 
 this.nextcolor; 
   this.NextBall = scene.add.sprite(50, 450, 'Ball');
   this.NextBall.setScale(0.15); 
   this.ScoreText = scene.add.text(50, 10, 'Puntos: 0');
   this.ScoreText.setColor('#000000');

   this.add([this.NextBall, this.ScoreText]); 
}


UpdateColor(color)
{
    let col = [0xff0000, 0x00ff00, 0x0000ff] ; 
    
    this.nextcolor= col[color];  

}

addScore(points)
{
    this.Score += points; 
   
}

update()
{
    this.NextBall.setTint(this.nextcolor); 
    this.ScoreText.setText('Puntos: ' + this.Score); 
}
}