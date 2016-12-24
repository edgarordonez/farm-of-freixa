import Phaser from 'phaser'
import { centerGameObjects } from '../utils'
import Background from '../sprites/Background'

export default class extends Phaser.State {
  init (score) {
    this.score = score
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

    this.scoreText = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 100, `LAST SCORE ${this.score.toString()}`, this.game.customStyle)
    this.startButton = this.game.add.button(this.game.world.centerX, this.game.world.centerY, 'restartButton', this.returnGame, this, 1, 0, 2)
    centerGameObjects([this.scoreText, this.startButton])
  }

  returnGame () {
    this.state.start('Game', true, false, 0, 0)
  }
}
