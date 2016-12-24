/* globals __DEV__ */
import Phaser from 'phaser'
import { centerGameObjects } from '../utils'
import Background from '../sprites/Background'
import Ground from '../sprites/Ground'
import Pool from '../sprites/Pool'
import ChickenPool from '../sprites/ChickenPool'
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

    this.ground = new Ground({
      game: this.game,
      x: 0,
      y: 848,
      asset: 'ground'
    })

    this.runner = new Runner({
      game: this.game,
      x: this.game.world.centerX - 100,
      y: 790,
      asset: 'runner'
    })

    this.cows = this.game.add.group()
    this.cowGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * 2, this.generateCows, this)
    this.game.add.existing(this.cows)

    this.chickens = this.game.add.group()
    this.chickenGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * 120, this.generateChickens, this)
    this.game.add.existing(this.chickens)

    this.scoreText = this.game.add.text(this.game.world.centerX - 150, 50, `SCORE ${this.score.toString()}`, this.game.customStyle)
    centerGameObjects([this.scoreText])

    this.lifeImage = this.game.add.sprite(this.game.world.centerX + 150, 20, 'lifes')
    this.lifeText = this.game.add.text(this.game.world.centerX + 280, 50, `${this.life.toString()}`, this.game.customStyle)
    centerGameObjects([this.lifeText])

    this.dieSound = this.game.add.audio('die')
  }

  update () {
    this.game.physics.arcade.collide(this.runner, this.ground)
    this.cows.forEach(pool => {
      this.checkScore(pool)
      this.game.physics.arcade.collide(this.runner, pool, this.gameOver, null, this)
    })
    this.chickens.forEach(pool => {
      this.checkLife(pool)
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
    pool.reset(this.game.width + pool.width / 2, 790)
  }

  generateChickens () {
    let pool = this.chickens.getFirstExists(false)
    if (!pool) {
      pool = new ChickenPool({
        game: this.game,
        parent: this.chickens,
        name: 'ChickenPool'
      })
    }
    pool.reset(this.game.width + pool.width / 2, 790)
  }

  checkScore (pool) {
    if (pool.exists && !pool.hasScored && pool.cow.world.x <= this.runner.world.x) {
      pool.hasScored = true
      this.score++
      this.life = this.score % 10 === 0 ? this.life + 1 : this.life
      this.scoreText.setText(`SCORE ${this.score.toString()}`)
      this.lifeText.setText(`${this.life.toString()}`)
    }
  }

  checkLife (pool) {
    if (pool.exists && !pool.hasScored && pool.chicken.world.x <= this.runner.world.x) {
      pool.hasScored = true
      if (this.game.physics.arcade.intersects(this.runner.body, pool.chicken.body)) {
        this.life += 2
        this.lifeText.setText(`${this.life.toString()}`)
      }
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
    this.background_sol.destroy()
    this.background_arboles.destroy()
    this.background_ground.destroy()
    this.ground.destroy()
    this.runner.destroy()
    this.cows.destroy()
  }

  render () {
    /*
    if (__DEV__) {
      this.game.debug.body(this.runner)
      this.game.debug.body(this.ground)
    }
    */
  }
}
