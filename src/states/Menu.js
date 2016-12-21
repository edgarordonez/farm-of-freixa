import Phaser from 'phaser'
import { centerGameObjects } from '../utils'
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

    this.ready = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'ready')
    this.game.add.tween(this.ready.scale).to({x: 1.1, y: 1.1}, 1000, Phaser.Easing.Linear.NONE, true, 0, 1000, true)

    this.gameText = this.game.add.bitmapText(this.game.world.centerX, 230, 'flappyfont', 'FREIXAS FARM', 24)
    this.game.add.tween(this.gameText.scale).to({x: 1.2, y: 1.2}, 1000, Phaser.Easing.Linear.NONE, true, 0, 1000, true)
    this.startButton = this.game.add.button(this.game.world.centerX, 380, 'startButton', this.startClick, this)

    centerGameObjects([this.ready, this.gameText, this.startButton])
    this.audioGame = this.game.add.audio('game')
    this.game.sound.setDecodedCallback(this.audioGame, this.playSound, this)
  }

  startClick () {
    this.state.start('Game', true, false, 0, 0)
  }

  playSound () {
    this.audioGame.play().volume = 0.2
  }
}
