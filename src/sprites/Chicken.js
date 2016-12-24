import Phaser from 'phaser'
import { safeZone } from '../utils'

export default class extends Phaser.Sprite {

  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)
    this.game = game

    this.game.physics.arcade.enableBody(this)

    this.safeZone = safeZone(this)
    this.height = this.safeZone.height * 0.11 // 11% of safeZone
    this.scale.x = this.scale.y // scale width same as height
    this.body.setSize(this.width - 20, (this.height - 15), -10, 50)
    this.anchor.setTo(0.5, 0.5)

    this.body.allowGravity = false
    this.body.immovable = true
  }
}
