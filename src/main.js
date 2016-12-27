import 'pixi'
import 'p2'
import Phaser from 'phaser'

import BootState from './states/Boot'
import SplashState from './states/Splash'
import MenuState from './states/Menu'
import GameState from './states/Game'
import GameOverState from './states/GameOver'

class Game extends Phaser.Game {

  constructor () {
    let gameRatio = window.innerWidth / window.innerHeight
    let width = Math.ceil(1080 * gameRatio)
    let heigth = 1080 // <== MAX BACKGROUND

    super(width, heigth, Phaser.AUTO, 'freixas-farm', null)

    this.state.add('Boot', BootState, false)
    this.state.add('Splash', SplashState, false)
    this.state.add('Menu', MenuState, false)
    this.state.add('Game', GameState, false)
    this.state.add('GameOver', GameOverState, false)
    this.state.start('Boot')
  }
}

window.game = new Game()
