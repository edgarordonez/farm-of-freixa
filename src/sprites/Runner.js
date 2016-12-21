import Phaser from 'phaser'

export default class extends Phaser.Sprite {

  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)
    this.game = game

    this.anchor.setTo(0.5, 0.5)
    this.scale.setTo(0.35, 0.35)

    this.animations.add('run')
    this.animations.play('run', 10, true)

    this.game.physics.arcade.enableBody(this)
    this.body.collideWorldBounds = true
    this.game.add.existing(this)
  }

  update () {
    // keep the spacebar from propogating up to the browser
    this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR])

    // Keyboard controls
    let runnerKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    runnerKey.onDown.add(this.up, this)

    // Mouse/touch controls
    this.game.input.onDown.add(this.up, this)
  }

  up () {
    if (this.body.velocity.y === 0) {
      this.freeze()
      this.body.velocity.y = -550
    }
  }

  freeze () {
    this.animations.paused = true
    this.game.time.events.add(1000, () => {
      this.animations.paused = false
    })
  }
}
