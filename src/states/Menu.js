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
    this.game.add.sprite(this.game.width / 2 - 90, 200, 'ready')
    this.startButton = this.game.add.button(this.game.width / 2, 300, 'startButton', this.startClick, this)
    this.startButton.anchor.setTo(0.5, 0.5)
    this.titleGame = this.add.text(this.game.world.centerX, this.game.height - 30, `FARM OF FREIXA`)
    this.titleGame.font = 'Nunito'
    this.titleGame.fontSize = 20
    this.titleGame.fill = '#FFFFFF'
    this.titleGame.anchor.setTo(0.5)
  }

  startClick () {
    this.state.start('Game')
  }
}
