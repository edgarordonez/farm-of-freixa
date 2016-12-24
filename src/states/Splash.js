import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {}

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)
    this.game.customStyle = {
      font: '50px Permanent Marker',
      fill: '#FFF'
    }
    this.load.spritesheet('runner', 'assets/images/runner.png', 200, 218)
    this.load.spritesheet('startButton', 'assets/images/button-start.png', 401, 143)
    this.load.spritesheet('restartButton', 'assets/images/button-restart.png', 360, 130)
    this.load.image('background', 'assets/images/background.png')
    this.load.image('background_sol', 'assets/images/sol.png')
    this.load.image('background_arboles', 'assets/images/arboles.png')
    this.load.image('background_ground', 'assets/images/ground.png')
    this.load.image('ground', 'assets/images/transparent.png')
    this.load.image('cow', 'assets/images/cow.png')
    this.load.image('chicken', 'assets/images/chicken.png')
    this.load.image('lifes', 'assets/images/life-full.png')

    this.load.audio('game', 'assets/sounds/game.mp3')
    this.load.audio('up', 'assets/sounds/flap.wav')
    this.load.audio('die', 'assets/sounds/cow.mp3')
  }

  create () {
    this.state.start('Menu')
  }
}
