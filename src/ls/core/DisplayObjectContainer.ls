class DisplayObjectContainer extends DisplayObject
  ->
    super!
    @_parent = null
    @_children = []
  addChild: (child) ->
    @_children.push child
    @_dirty = true
    child
  removeChild: (child) ->
    index = @_children.indexOf child
    if index isnt -1
      @_children.splice index, 1
      @_dirty = true
      child
    else
      void
  update: ->
    ctx = super!
    for child in @_children
      ctx
        ..save!
        ..transform child._matrix
        ..drawImage child.render!
        ..restore!
    ctx

(@toys ?= {}).DisplayObjectContainer = DisplayObjectContainer
