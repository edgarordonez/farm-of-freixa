/* globals __DEV__ */
import Phaser from 'phaser'
import Cow from './Cow'

export default class extends Phaser.Group {

  constructor ({ game, parent, name }) {
    super(game, parent, name)
    this.count = 1
    this.game = game
    this.cow = new Cow({
      game: this.game,
      x: 0,
      y: 0,
      asset: 'cow'
    })
    this.hasScored = false
    this.add(this.cow)
    this.velocity = -350
    this.game.time.events.loop(Phaser.Timer.SECOND * 6, this.updateVelocity, this)
  }

  update () {
    this.checkWorldBounds()
    if (__DEV__) {
      this.game.debug.body(this.cow)
    }
  }

  updateVelocity () {
    if (this.velocity > -700) {
      this.velocity = this.velocity * 1.2
    }
  }

  checkWorldBounds () {
    if (!this.cow.inWorld) {
      this.exists = false
    }
  }

  reset (x, y) {
    this.cow.reset(0, 0)
    this.x = x
    this.y = y
    let position = this.game.rnd.integerInRange(this.velocity - 30, this.velocity + 40)
    this.setAll('body.velocity.x', position)
    this.hasScored = false
    this.exists = true
  }

}
