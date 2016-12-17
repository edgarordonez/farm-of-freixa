/* globals __DEV__ */
import Phaser from 'phaser'
import Background from '../sprites/Background'
import Ground from '../sprites/Ground'
import Pool from '../sprites/Pool'
import Runner from '../sprites/Runner'
// import { setResponsiveWidth } from '../utils'

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

    this.ground = new Ground({
      game: this.game,
      x: 0,
      y: 530,
      asset: 'ground'
    })

    this.runner = new Runner({
      game: this.game,
      x: this.game.world.centerX,
      y: 465,
      asset: 'runner'
    })

    this.cowGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * 2, this.generateCows, this)

    this.game.add.existing(this.background)
    this.game.add.existing(this.ground)
    this.game.add.existing(this.runner)
    this.cows = this.game.add.group()
    this.game.add.existing(this.cows)

    this.score = 0
    this.scoreText = this.add.text(this.game.world.centerX, this.game.height - 30, `SCORE: ${this.score.toString()}`)
    this.scoreText.font = 'Nunito'
    this.scoreText.fontSize = 20
    this.scoreText.fill = '#FFFFFF'
    this.scoreText.anchor.setTo(0.5)

    this.scoreSound = this.game.add.audio('score')
    this.dieSound = this.game.add.audio('die')
  }

  update () {
    this.game.physics.arcade.collide([this.runner, this.cow], this.ground)
    this.cows.forEach(function (pool) {
      this.checkScore(pool)
      this.game.physics.arcade.collide(this.runner, pool, this.gameOver, null, this)
    }, this)
  }

  generateCows () {
    let pool = this.cows.getFirstExists(false)
    if (!pool) {
      pool = new Pool({
        game: this.game,
        parent: this.cows,
        name: 'CowPool'
      })
    }
    pool.reset(this.game.width + pool.width / 2, 475)
  }

  checkScore (pool) {
    if (pool.exists && !pool.hasScored && pool.cow.world.x <= this.runner.world.x) {
      pool.hasScored = true
      this.score++
      this.scoreText.setText(`SCORE: ${this.score.toString()}`)
      this.scoreSound.play()
    }
  }

  gameOver () {
    this.dieSound.play()
    window.alert('GAME OVER!')
    this.state.start('Game')
  }

  shutdown () {
    this.game.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR)
    this.runner.destroy()
    this.cows.destroy()
  }

  render () {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.runner, 32, 32)
    }
  }
}
