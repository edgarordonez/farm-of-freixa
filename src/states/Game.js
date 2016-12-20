/* globals __DEV__ */
import Phaser from 'phaser'
import { centerGameObjects } from '../utils'
import Background from '../sprites/Background'
import Ground from '../sprites/Ground'
import Pool from '../sprites/Pool'
import Runner from '../sprites/Runner'

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
      x: this.game.world.centerX - 100,
      y: 465,
      asset: 'runner'
    })

    this.cows = this.game.add.group()
    this.cowGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * 2, this.generateCows, this)
    this.game.add.existing(this.cows)

    this.score = 0
    this.scoreText = this.game.add.bitmapText(this.game.world.centerX, 20, 'flappyfont', `SCORE ${this.score.toString()}`, 24)
    centerGameObjects([this.scoreText])

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
    pool.reset(this.game.width + pool.width / 2, 465)
  }

  checkScore (pool) {
    if (pool.exists && !pool.hasScored && pool.cow.world.x <= this.runner.world.x) {
      pool.hasScored = true
      this.score++
      this.scoreText.setText(`SCORE ${this.score.toString()}`)
      this.scoreSound.play()
    }
  }

  gameOver () {
    this.dieSound.play()
    this.state.start('GameOver', true, false, this.score)
  }

  shutdown () {
    this.game.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR)
    this.runner.destroy()
    this.cows.destroy()
    this.game.sound._sounds.forEach(sound => {
      sound.destroy()
    })
  }

  render () {
    if (__DEV__) {
      this.game.debug.spriteBounds(this.runner)
    }
  }
}
