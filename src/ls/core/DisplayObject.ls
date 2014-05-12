class DisplayObject
  ->
    @createCanvas?!
    # by exposing the transform matrix,
    # i can get local x and y later
    @_matrix =
      [ 1 0
        0 1
        0 0 ]
  createCanvas: ->
    @canvas = document.createElement \canvas
  x:~
    -> @_x ? 0
    (v) ->
      if @_x isnt v
        @_x = v
        @_should-update-matrix = true
      @_x
  y:~
    -> @_y ? 0
    (v) ->
      if @_y isnt v
        @_y = v
        @_should-update-matrix = true
      @_y
  scale-x:~
    -> @_scale-x ? 1
    (v) ->
      if @_scale-x isnt v
        @_scale-x = v
        @_should-update-matrix = true
      @_scale-x
  scale-y:~
    -> @_scale-y ? 1
    (v) ->
      if @_scale-y isnt v
        @_scale-y = v
        @_should-update-matrix = true
      @_scale-y
  rotation:~
    -> @_rotation ? 0
    (v) ->
      if @_rotation isnt v
        @_rotation = v
        @_should-update-matrix = true
      @_rotation
  center-x:~
    -> @_center-x ? 0
    (v) ->
      if @_center-x isnt v
        @_center-x = v
        @_should-update-matrix = true
      @_center-x
  center-y:~
    -> @_center-y ? 0
    (v) ->
      if @_center-y isnt v
        @_center-y = v
        @_should-update-matrix = true
      @_center-y
  updateMatrix: !->
    @_matrix = mat2d.create!
    mat2d.translate @_matrix, @_matrix, [@x + @center-x, @y + @center-y]
    mat2d.scale     @_matrix, @_matrix, [@scale-x, @scale-y]
    mat2d.rotate    @_matrix, @_matrix, @rotation
    mat2d.translate @_matrix, @_matrix, [-@center-x, -@center-y]
    @_should-update-matrix = false
  render: ->
    if @_should-update-matrix then @updateMatrix!
    @canvas

(@toys ?= {}).DisplayObject = DisplayObject
