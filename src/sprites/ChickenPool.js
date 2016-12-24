import Phaser from 'phaser'
import Chicken from './Chicken'

export default class extends Phaser.Group {

  constructor ({ game, parent, name }) {
    super(game, parent, name)
    this.game = game
    this.chicken = new Chicken({
      game: this.game,
      x: 0,
      y: 0,
      asset: 'chicken'
    })
    this.hasScored = false
    this.add(this.chicken)
    this.velocity = -300
    this.game.time.events.loop(Phaser.Timer.SECOND * 6, this.updateVelocity, this)
  }

  update () {
    this.checkWorldBounds()
  }

  updateVelocity () {
    if (this.velocity > -1500) {
      this.velocity = this.velocity * 1.2
    }
  }

  checkWorldBounds () {
    if (!this.chicken.inWorld) {
      this.exists = false
    }
  }

  reset (x, y) {
    this.chicken.reset(0, 0)
    this.x = x
    this.y = y
    let position = this.game.rnd.integerInRange(this.velocity - (this.velocity * 0.1), this.velocity + (this.velocity * 0.1))
    this.setAll('body.velocity.x', position)
    this.hasScored = false
    this.exists = true
  }
}
