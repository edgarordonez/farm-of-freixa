/* globals __DEV__ */
import Phaser from 'phaser'
import { centerGameObjects } from '../utils'
import Background from '../sprites/Background'
import Ground from '../sprites/Ground'
import Pool from '../sprites/Pool'
import Runner from '../sprites/Runner'

export default class extends Phaser.State {

  init (life, score) {
    this.life = life
    this.score = score
  }

  preload () {}

  create () {
    // Objects
    this.background = new Background({
      game: this.game,
      x: 0,
      y: 0,
      asset: 'background'
    })

    this.ground = new Ground({
      game: this.game,
      x: 0,
      y: 520,
      asset: 'ground'
    })

    this.runner = new Runner({
      game: this.game,
      x: this.game.world.centerX - 100,
      y: 480,
      asset: 'runner'
    })

    this.cows = this.game.add.group()
    this.cowGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * 2, this.generateCows, this)
    this.game.add.existing(this.cows)

    this.scoreText = this.game.add.bitmapText(this.game.world.centerX, 20, 'flappyfont', `SCORE ${this.score.toString()}`, 24)
    centerGameObjects([this.scoreText])
    this.lifeText = this.game.add.bitmapText(this.game.world.centerX, 50, 'flappyfont', `LIFES ${this.life.toString()}`, 24)
    centerGameObjects([this.lifeText])

    this.scoreSound = this.game.add.audio('score')
    this.dieSound = this.game.add.audio('die')
  }

  update () {
    this.game.physics.arcade.collide([this.runner, this.cows], this.ground)
    this.cows.forEach((pool) => {
      this.checkScore(pool)
      this.game.physics.arcade.collide(this.runner, pool, this.gameOver, null, this)
    })
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
    pool.reset(this.game.width + 30, 477)
  }

  checkScore (pool) {
    if (pool.exists && !pool.hasScored && pool.cow.world.x <= this.runner.world.x) {
      // CHECK GOLDEN COW INTERSECTS WITH RUNNER
      console.log(this.game.physics.arcade.intersects(this.runner.body, pool.cow.body))
      pool.hasScored = true
      this.score++
      this.life = this.score % 10 === 0 ? this.life + 1 : this.life
      this.scoreText.setText(`SCORE ${this.score.toString()}`)
      this.lifeText.setText(`LIFES ${this.life.toString()}`)
      this.scoreSound.play()
    }
  }

  gameOver () {
    this.dieSound.play()
    if (this.life === 0) {
      this.state.start('GameOver', true, false, this.score)
    } else {
      this.state.start('Game', true, false, this.life - 1, this.score)
    }
  }

  shutdown () {
    this.game.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR)
    this.background.destroy()
    this.ground.destroy()
    this.runner.destroy()
    this.cows.destroy()
    this.game.sound.removeByKey('score')
    this.game.sound.removeByKey('die')
  }

  render () {
    if (__DEV__) {
      this.game.debug.body(this.runner)
      this.game.debug.body(this.ground)
    }
  }
}
