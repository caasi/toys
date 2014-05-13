class AABB
  axises = <[ x y ]>
  scan = (group, axis) ->
    | not Array.isArray group         => throw new Error 'first argument should be an array'
    | group.0.min[axis] is undefined  => throw new Error 'axis not found'
    | otherwise
      points = []
      for box in group
        if not box.isEmpty!
          # should not do this over and over again
          points.push do
            box:   box
            value: box.min[axis]
            depth: 1
          points.push do
            value: box.max[axis]
            depth: -1
      points.sort (a, b) ->
        | a.value <  b.value => -1
        | a.value == b.value => 0
        | a.value >  b.value => 1
      groups = []
      g = []
      d = 0
      for p in points
        d += p.depth
        if d isnt 0
          g.push p.box if p.box
        else
          groups.push g
          g = []
      groups
  @rdc = (g, todo = axises.slice!) ->
    | not Array.isArray g => throw new Error 'first argument should be an array'
    | otherwise
      results = for axis in todo
        gs = scan g, axis
        if gs.length > 1
          # group split, do rdc in other axises
          next = axises.slice!
          next.splice next.indexOf(axis), 1
          # collect all sub groups
          Array::concat.apply [], for g in gs => @rdc g, next
        else
          gs
      # return longest groups
      results.reduce (c, n) -> if c.length > n.length then c else n
  @collide = ->
    | not Array.isArray it => throw new Error 'first argument should be an array'
    | otherwise
      result = []
      for i from 0 til it.length
        for j from i+1 til it.length
          if it[i].intersect it[j]
            result.push [it[i], it[j]]
      result
  @hit = ->
    | not Array.isArray it => throw new Error 'first argument should be an array'
    | otherwise
      Array::concat.apply [], for g in @rdc it => @collide g
  # constructor
  (
    @min = x: Infinity, y: Infinity
    @max = x: -Infinity, y: -Infinity
  ) ->
    if isNaN @min.x then @min.x = Infinity
    if isNaN @min.y then @min.y = Infinity
    if isNaN @max.x then @max.x = -Infinity
    if isNaN @max.y then @max.y = -Infinity
  width:~
    -> @max.x - @min.x
  height:~
    -> @max.y - @min.y
  size:~
    -> @width * @height
  isEmpty: ->
    @min.x >= @max.x or @min.y >= @max.y
  clone: ->
    new AABB(@min, @max)
  # lame solution
  transform: (m00, m01, m10, m11, m20, m21) ->
    new AABB {
      x: m00 * @min.x + m10 * @min.y + m20
      y: m01 * @min.x + m11 * @min.y + m21
    },{
      x: m00 * @max.x + m10 * @max.y + m20
      y: m01 * @max.x + m11 * @max.y + m21
    }
  addPoint: (pt) !->
    @min.x = pt.x if pt.x < @min.x
    @min.y = pt.y if pt.y < @min.y
    @max.x = pt.x if pt.x > @max.x
    @max.y = pt.y if pt.y > @max.y
  addBox: (aabb) !->
    @min.x = aabb.min.x if aabb.min.x < @min.x
    @min.y = aabb.min.y if aabb.min.y < @min.y
    @max.x = aabb.max.x if aabb.max.x > @max.x
    @max.y = aabb.max.y if aabb.max.y > @max.y
  containPoint: (pt) ->
    @min.x < pt.x < @max.x and
    @min.y < pt.y < @max.y
  intersect: ->
    @min.x <= it.max.x and @max.x >= it.min.x and
    @min.y <= it.max.y and @max.y >= it.min.y

(@toys ?= {}).AABB = AABB
