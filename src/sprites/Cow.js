import Phaser from 'phaser'

export default class extends Phaser.Sprite {

  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)
    this.game = game


    this.game.physics.arcade.enableBody(this)
    this.body.setSize(this.width * 0.04, (this.height - 200) * 0.04, -20, 200)
    this.anchor.setTo(0.5, 0.5)
    this.scale.setTo(0.04, 0.04)
    this.body.allowGravity = false
    this.body.immovable = true
  }
}
