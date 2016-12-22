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
      asset: 'background'
    })

    this.gameOver = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'game-over')
    this.game.add.tween(this.gameOver.scale).to({x: 1.1, y: 1.1}, 1000, Phaser.Easing.Linear.NONE, true, 0, 1000, true)

    this.scoreText = this.game.add.bitmapText(this.game.world.centerX, 250, 'flappyfont', `LAST SCORE ${this.score.toString()}`, 24)
    this.startButton = this.game.add.button(this.game.world.centerX, 380, 'startButton', this.returnGame, this)
    centerGameObjects([this.gameOver, this.scoreText, this.startButton])
  }

  returnGame () {
    this.state.start('Game', true, false, 0, 0)
  }
}
