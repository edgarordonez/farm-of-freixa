import Phaser from 'phaser'

export default class extends Phaser.TileSprite {

  constructor ({ game, x, y, asset }) {
    super(game, x, y, game.width, game.height, asset)
    this.game = game
    this.game.add.existing(this)
  }

  update () {
    this.autoScroll(-100, 0)
  }

}
