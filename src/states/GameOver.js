import Phaser from 'phaser'
import { centerGameObjects } from '../utils'
import Background from '../sprites/Background'

export default class extends Phaser.State {
  init (score) {
    this.returnGame = this.returnGame.bind(this)
    this.mute = this.mute.bind(this)
    this.score = score
    this.bestScore = window.localStorage.getItem('best')
    if (this.bestScore !== null) {
      this.bestScore = score > this.bestScore ? score : this.bestScore
      window.localStorage.setItem('best', this.bestScore)
    }
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

    this.bestText = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 200, `BEST ${this.bestScore}`, this.game.customStyle)
    this.scoreText = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 130, `LAST ${this.score.toString()}`, this.game.customStyle)

    this.startButton = this.game.add.button(this.game.world.centerX, this.game.world.centerY, 'restartButton', this.returnGame, null, 1, 0, 2)
    this.game.add.tween(this.startButton.scale).to({x: 1.1, y: 1.1}, 1000, Phaser.Easing.Linear.NONE, true, 0, 1000, true)
    centerGameObjects([this.bestText, this.scoreText, this.startButton])

    this.audioButton = this.game.add.button(10, 10, 'audioButton', this.mute, null)
    this.game.sound.mute ? this.audioButton.setFrames(3, 4, 5) : this.audioButton.setFrames(1, 0, 2)
  }

  returnGame () {
    this.state.start('Game', true, false, 0, 0)
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
