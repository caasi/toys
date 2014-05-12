class RedBox extends toys.DisplayObject
  ->
    super!
    @canvas
      ..width  = 100
      ..height = 100
  render: ->
    @canvas.getContext \2d
      ..fillStyle = \red
      ..fillRect 0, 0, 100, 100
    super!

class BlueBox extends toys.DisplayObject
  ->
    super!
    @canvas
      ..width  = 50
      ..height = 50
  render: ->
    @canvas.getContext \2d
      ..fillStyle = \blue
      ..fillRect 0, 0, 50, 50
    super!

red = new RedBox
  ..x = 10
  ..y = 10
  ..scale-x = 2
blue = new BlueBox

root = new toys.DisplayObjectContainer
  ..addChild red
  ..addChild blue

update = ->
  root.render!
  x = red.x + 1
  red.x = if x > root.canvas.width then -200 else x
  x = blue.x + 1
  y = blue.y + 1
  blue.x = if x > root.canvas.width  then -50 else x
  blue.y = if y > root.canvas.height then -50 else y
  requestAnimationFrame update
requestAnimationFrame update

$ '#container' .append root.canvas
