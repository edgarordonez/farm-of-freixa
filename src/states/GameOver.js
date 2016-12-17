import Phaser from 'phaser'
import Background from '../sprites/Background'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    // Sprites
    this.background = new Background({
      game: this.game,
      x: 0,
      y: 0,
      asset: 'background'
    })

    this.game.add.existing(this.background)
    this.game.add.sprite(this.game.width / 2 - 90, 200, 'game-over')
    this.startButton = this.game.add.button(this.game.width / 2, 300, 'startButton', this.startClick, this)
    this.startButton.anchor.setTo(0.5, 0.5)
  }

  startClick () {
    this.state.start('Game')
  }
}
