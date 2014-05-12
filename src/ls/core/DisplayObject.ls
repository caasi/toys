class DisplayObject
  ->
    @_should-update-matrix = false
    @canvas = document.createElement \canvas
    # by exposing the transform matrix,
    # i can get local x and y later
    @_matrix =
      [ 1 0
        0 1
        0 0 ]
    @_x = 0
    @_y = 0
    @_scale-x = 1
    @_scale-y = 1
    @_rotation = 0
    @_center-x = 0
    @_center-y = 0
  x:~
    -> @_x
    (v) ->
      if @_x isnt v
        @_x = v
        @_should-update-matrix = true
      @_x
  y:~
    -> @_y
    (v) ->
      if @_y isnt v
        @_y = v
        @_should-update-matrix = true
      @_y
  scale-x:~
    -> @_scale-x
    (v) ->
      if @_scale-x isnt v
        @_scale-x = v
        @_should-update-matrix = true
      @_scale-x
  scale-y:~
    -> @_scale-y
    (v) ->
      if @_scale-y isnt v
        @_scale-y = v
        @_should-update-matrix = true
      @_scale-y
  rotation:~
    -> @_rotation
    (v) ->
      if @_rotation isnt v
        @_rotation = v
        @_should-update-matrix = true
      @_rotation
  center-x:~
    -> @_center-x
    (v) ->
      if @_center-x isnt v
        @_center-x = v
        @_should-update-matrix = true
      @_center-x
  center-y:~
    -> @_center-y
    (v) ->
      if @_center-y isnt v
        @_center-y = v
        @_should-update-matrix = true
      @_center-y
  updateMatrix: !->
    @_matrix = mat2d.create!
    mat2d.translate @_matrix, @_matrix, [@_x + @_center-x, @_y + @_center-y]
    mat2d.scale     @_matrix, @_matrix, [@_scale-x, @_scale-y]
    mat2d.rotate    @_matrix, @_matrix, @_rotation
    mat2d.translate @_matrix, @_matrix, [-@_center-x, -@_center-y]
    @_should-update-matrix = false
  render: ->
    if @_should-update-matrix then @updateMatrix!
    @canvas

(@toys ?= {}).DisplayObject = DisplayObject
