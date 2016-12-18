import Phaser from 'phaser'

export default class extends Phaser.TileSprite {

  constructor ({ game, x, y, asset }) {
    super(game, x, y, game.width, game.height, asset)
    this.game = game
    this.game.add.existing(this)

    this.game.physics.arcade.enableBody(this)
    this.body.allowGravity = false
    this.body.immovable = true
  }

  update () {
    this.autoScroll(-150, 0)
  }

}
