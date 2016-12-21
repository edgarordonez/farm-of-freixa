import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {}

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)
    this.load.bitmapFont('flappyfont', 'assets/fonts/flappyfont/flappyfont.png', 'assets/fonts/flappyfont/flappyfont.fnt')
    this.load.spritesheet('runner', 'assets/images/runner.png', 200, 218)
    this.load.image('background', 'assets/images/background.png')
    this.load.image('ground', 'assets/images/transparent.png')
    this.load.image('cow', 'assets/images/cow2.png')
    this.load.image('ready', 'assets/images/get-ready.png')
    this.load.image('game-over', 'assets/images/gameover.png')
    this.load.image('startButton', 'assets/images/start-button.png')

    this.load.audio('game', 'assets/sounds/game.mp3')
    this.load.audio('score', 'assets/sounds/score.wav')
    this.load.audio('up', 'assets/sounds/flap.wav')
    this.load.audio('die', 'assets/sounds/ground-hit.wav')
  }

  create () {
    this.game.physics.startSystem(Phaser.Physics.ARCADE)
    this.game.physics.arcade.gravity.y = 900
    this.state.start('Menu')
  }
}
