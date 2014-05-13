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
  render: !(parent-ctx) ->
    ctx = @canvas.getContext \2d
      ..clearRect 0, 0, @canvas.width, @canvas.height
    for child in @_children => child.render ctx
    super parent-ctx if parent-ctx

(@toys ?= {}).DisplayObjectContainer = DisplayObjectContainer
