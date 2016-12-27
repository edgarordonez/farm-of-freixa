/* globals __DEV__ */
import Phaser from 'phaser'
import Cow from './Cow'
import Chicken from './Chicken'

export default class extends Phaser.Group {

  constructor ({ game, parent, name, asset, velocity }) {
    super(game, parent, name)
    this.game = game
    let Type = (asset === 'cow') ? Cow : Chicken
    this.sprite = new Type({
      game: this.game,
      x: 0,
      y: 0,
      asset: asset
    })
    this.hasScored = false
    this.add(this.sprite)
    this.velocity = velocity // COW = -500 CHICKEN = -300
    this.game.time.events.loop(Phaser.Timer.SECOND * 6, this.updateVelocity, this)
  }

  update () {
    this.checkWorldBounds()
    if (__DEV__) {
      this.game.debug.body(this.sprite)
    }
  }

  updateVelocity () {
    if (this.velocity > -1500) {
      this.velocity = this.velocity * 1.2
    }
  }

  checkWorldBounds () {
    if (!this.sprite.inWorld) {
      this.exists = false
    }
  }

  reset (x, y) {
    this.sprite.reset(0, 0)
    this.x = x
    this.y = y
    let position = this.game.rnd.integerInRange(this.velocity - (this.velocity * 0.1), this.velocity + (this.velocity * 0.1))
    this.setAll('body.velocity.x', position)
    this.hasScored = false
    this.exists = true
  }
}
