class DisplayObjectContainer extends DisplayObject
  ->
    super!
    @_parent = null
    @_children = []
  addChild: (child) ->
    @_children.push child
    child
  removeChild: (child) ->
    index = @_children.indexOf child
    if index isnt -1
      @_children.splice index, 1
      child
    else
      void
  render: ->
    ctx = @canvas.getContext \2d
      ..clearRect 0, 0, @canvas.width, @canvas.height
    for child in @_children
      # update the matrix and canvas of this child
      image = child.render!
      ctx
        ..save!
        ..transform.apply ctx, child._matrix
        ..drawImage image, 0, 0
        ..restore!
    super!

(@toys ?= {}).DisplayObjectContainer = DisplayObjectContainer
