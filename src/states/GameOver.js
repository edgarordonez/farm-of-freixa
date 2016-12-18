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
    this.timerText = this.game.add.bitmapText(this.game.world.centerX, 380, 'flappyfont', ``, 24)
    centerGameObjects([this.gameOver, this.scoreText, this.timerText])

    this.timer = this.game.time.create()
    this.timerEvent = this.timer.add(Phaser.Timer.SECOND * 5, this.returnMenu, this)
    this.timer.start()
  }

  render () {
    if (this.timer.running) {
      this.timerText.setText(`RETURNS IN ${this.formatTime(Math.round((this.timerEvent.delay - this.timer.ms) / 1000)).toString()}`)
    }
  }

  formatTime (s) {
    let minutes = '0' + Math.floor(s / 60)
    let seconds = '0' + (s - minutes * 60)
    return seconds.substr(-2)
  }

  returnMenu () {
    this.state.start('Menu')
  }
}
