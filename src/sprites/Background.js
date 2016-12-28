import Phaser from 'phaser'

export default class extends Phaser.TileSprite {
  constructor ({ game, x, y, asset, velocity }) {
    super(game, x, y, game.width, game.height, asset)
    this.game = game
    this.velocity = -velocity
    this.game.time.events.loop(Phaser.Timer.SECOND * 6, this.updateVelocity, this)
    this.game.add.existing(this)
  }

  update () {
    this.autoScroll(this.velocity, 0)
  }

  updateVelocity () {
    if (this.velocity > -700) {
      this.velocity = this.velocity * 1.2
    }
  }
}
