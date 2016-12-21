import Phaser from 'phaser'

export default class extends Phaser.Sprite {

  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)
    this.game = game

    this.anchor.setTo(0.5, 0.5)
    this.scale.setTo(0.15, 0.15)

    this.game.physics.arcade.enableBody(this)
    this.body.allowGravity = false
    this.body.immovable = true
  }
}
