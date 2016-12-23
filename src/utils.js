export const centerGameObjects = (objects) => {
  objects.forEach(function (object) {
    object.anchor.setTo(0.5)
  })
}

export const setResponsiveWidth = (sprite, percent, parent) => {
  let percentWidth = (sprite.texture.width - (parent.width / (100 / percent))) * 100 / sprite.texture.width
  sprite.width = parent.width / (100 / percent)
  sprite.height = sprite.texture.height - (sprite.texture.height * percentWidth / 100)
}

export const safeZone = (context) => {
  // determine the safe zone
  let safeZone = {
    width: context.game.width,
    height: context.game.height,
    x: 0,
    y: 0
  }

  let heightWidthRatio = 1.9
  let currentHeightWidthRatio = context.game.height / context.game.width

  if (currentHeightWidthRatio > heightWidthRatio) {
    safeZone.height = context.game.width * heightWidthRatio
    safeZone.y = (context.game.height - safeZone.height) / 2
  } else {
    safeZone.width = context.game.height / heightWidthRatio
    safeZone.x = (context.game.width - safeZone.width) / 2
  }

  return safeZone
}
