/* globals __DEV__ */
import Phaser from 'phaser'
import Cow from './Cow'

export default class extends Phaser.Group {

  constructor ({ game, parent, name }) {
    super(game, parent, name)
    this.game = game
    this.cow = new Cow({
      game: this.game,
      x: 0,
      y: 0,
      asset: 'cow'
    })
    this.add(this.cow)

    this.hasScored = false
    this.setAll('body.velocity.x', -300)
  }

  update () {
    this.checkWorldBounds()
    if (__DEV__) {
      this.game.debug.spriteBounds(this.cow)
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
    this.setAll('body.velocity.x', -300)
    this.hasScored = false
    this.exists = true
  }
}
