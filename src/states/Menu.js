import Phaser from 'phaser'
import { centerGameObjects } from '../utils'
import Background from '../sprites/Background'

export default class extends Phaser.State {
  init () {
    this.playSound = this.playSound.bind(this)
    this.startClick = this.startClick.bind(this)
    this.mute = this.mute.bind(this)
  }
  preload () {}

  create () {
    // Sprites
    this.background = new Background({
      game: this.game,
      x: 0,
      y: 0,
      asset: 'background',
      velocity: 10
    })

    this.background_sol = new Background({
      game: this.game,
      x: 0,
      y: 0,
      asset: 'background_sol',
      velocity: 15
    })

    this.background_arboles = new Background({
      game: this.game,
      x: 0,
      y: 0,
      asset: 'background_arboles',
      velocity: 150
    })

    this.background_ground = new Background({
      game: this.game,
      x: 0,
      y: 0,
      asset: 'background_ground',
      velocity: 170
    })

    this.gameText = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 100, 'FREIXAS FARM', this.game.customStyle)
    this.game.add.tween(this.gameText.scale).to({x: 1.2, y: 1.2}, 1000, Phaser.Easing.Linear.NONE, true, 0, 1000, true)

    this.startButton = this.game.add.button(this.game.world.centerX, this.game.world.centerY, 'startButton', this.startClick, null, 1, 0, 2)
    this.startButton.scale.setTo(0.7, 0.7)
    this.game.add.tween(this.startButton.scale).to({x: 0.9, y: 0.9}, 1000, Phaser.Easing.Linear.NONE, true, 0, 1000, true)
    centerGameObjects([this.gameText, this.startButton])

    this.audioButton = this.game.add.button(10, 10, 'audioButton', this.mute, null)
    this.game.sound.mute ? this.audioButton.setFrames(3, 4, 5) : this.audioButton.setFrames(1, 0, 2)

    this.audioGame = this.game.add.audio('game')
    this.game.sound.setDecodedCallback(this.audioGame, this.playSound)
  }

  startClick () {
    this.state.start('Game', true, false, 0, 0)
  }

  playSound () {
    this.audioGame.loopFull(0.3)
  }

  mute () {
    this.game.sound.mute = !this.game.sound.mute
    if (this.game.sound.mute) {
      this.audioButton.setFrames(3, 4, 5)
    } else {
      this.audioButton.setFrames(1, 0, 2)
    }
  }
}
