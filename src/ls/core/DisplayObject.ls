class DisplayObject
  ->
    @_dirty = false
    @canvas = document.createElement \canvas
      ..width  = 0
      ..height = 0
    @_matrix =
      [ 1 0 0
        0 1 0
        0 0 0 ]
    @x = 0
    @y = 0
    @scale-x = 0
    @scale-y = 0
    @rotation = 0
  update: ->
    @_dirty = false
    @canvas.getContext \2d
  render: ->
    if @_dirty then @update!
    @canvas

(@toys ?= {}).DisplayObject = DisplayObject
