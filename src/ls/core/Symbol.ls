class Symbol extends DisplayObject
  (o) ->
    super!
    @canvas = o.canvas
  createCanvas: void # should not create any canvas

(@toys ?= {}).Symbol = Symbol
