import Phaser from 'phaser'

export default class extends Phaser.TileSprite {

  constructor ({ game, x, y, asset }) {
    super(game, x, y, game.width, game.height, asset)
    this.game = game
    this.game.physics.arcade.enableBody(this)
    this.body.allowGravity = false
    this.body.immovable = true
    this.game.add.existing(this)
  }

  update () {
    this.autoScroll(-150, 0)
  }
}
