import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {}

  preload () {
    this.game.input.maxPointers = 1

    let bestScore = window.localStorage.getItem('best')
    if (bestScore === null) {
      window.localStorage.setItem('best', 0)
    }

    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)
    this.game.customStyle = {
      font: '40px Permanent Marker',
      fill: '#FFF'
    }

    this.load.spritesheet('runner', 'assets/images/runner.png', 200, 218)
    this.load.spritesheet('startButton', 'assets/images/button-start.png', 401, 143)
    this.load.spritesheet('restartButton', 'assets/images/button-restart.png', 360, 130)
    this.load.spritesheet('audioButton', 'assets/images/button-audio.png', 110, 95)
    this.load.spritesheet('continueButton', 'assets/images/button-continue.png', 355, 130)
    this.load.spritesheet('pauseButton', 'assets/images/button-pause.png', 96, 97)
    this.load.image('background', 'assets/images/background.png')
    this.load.image('background_sol', 'assets/images/sol.png')
    this.load.image('background_arboles', 'assets/images/arboles.png')
    this.load.image('background_ground', 'assets/images/ground.png')
    this.load.image('ground', 'assets/images/transparent.png')
    this.load.image('cow', 'assets/images/cow.png')
    this.load.image('chicken', 'assets/images/chicken.png')
    this.load.image('lifes', 'assets/images/life-full.png')

    this.load.audio('game', 'assets/sounds/game.mp3')
    this.load.audio('up', 'assets/sounds/up.wav')
    this.load.audio('life', 'assets/sounds/life.wav')
    this.load.audio('die', 'assets/sounds/cow.mp3')
  }

  create () {
    this.state.start('Menu')
  }
}
