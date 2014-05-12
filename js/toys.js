(function(){
  var DisplayObject, ref$, DisplayObjectContainer, Symbol;
  DisplayObject = (function(){
    DisplayObject.displayName = 'DisplayObject';
    var prototype = DisplayObject.prototype, constructor = DisplayObject;
    function DisplayObject(){
      if (typeof this.createCanvas === 'function') {
        this.createCanvas();
      }
      this._matrix = [1, 0, 0, 1, 0, 0];
    }
    prototype.createCanvas = function(){
      return this.canvas = document.createElement('canvas');
    };
    Object.defineProperty(prototype, 'x', {
      get: function(){
        var ref$;
        return (ref$ = this._x) != null ? ref$ : 0;
      },
      set: function(v){
        if (this._x !== v) {
          this._x = v;
          this._shouldUpdateMatrix = true;
        }
        this._x;
      },
      configurable: true,
      enumerable: true
    });
    Object.defineProperty(prototype, 'y', {
      get: function(){
        var ref$;
        return (ref$ = this._y) != null ? ref$ : 0;
      },
      set: function(v){
        if (this._y !== v) {
          this._y = v;
          this._shouldUpdateMatrix = true;
        }
        this._y;
      },
      configurable: true,
      enumerable: true
    });
    Object.defineProperty(prototype, 'scaleX', {
      get: function(){
        var ref$;
        return (ref$ = this._scaleX) != null ? ref$ : 1;
      },
      set: function(v){
        if (this._scaleX !== v) {
          this._scaleX = v;
          this._shouldUpdateMatrix = true;
        }
        this._scaleX;
      },
      configurable: true,
      enumerable: true
    });
    Object.defineProperty(prototype, 'scaleY', {
      get: function(){
        var ref$;
        return (ref$ = this._scaleY) != null ? ref$ : 1;
      },
      set: function(v){
        if (this._scaleY !== v) {
          this._scaleY = v;
          this._shouldUpdateMatrix = true;
        }
        this._scaleY;
      },
      configurable: true,
      enumerable: true
    });
    Object.defineProperty(prototype, 'rotation', {
      get: function(){
        var ref$;
        return (ref$ = this._rotation) != null ? ref$ : 0;
      },
      set: function(v){
        if (this._rotation !== v) {
          this._rotation = v;
          this._shouldUpdateMatrix = true;
        }
        this._rotation;
      },
      configurable: true,
      enumerable: true
    });
    Object.defineProperty(prototype, 'centerX', {
      get: function(){
        var ref$;
        return (ref$ = this._centerX) != null ? ref$ : 0;
      },
      set: function(v){
        if (this._centerX !== v) {
          this._centerX = v;
          this._shouldUpdateMatrix = true;
        }
        this._centerX;
      },
      configurable: true,
      enumerable: true
    });
    Object.defineProperty(prototype, 'centerY', {
      get: function(){
        var ref$;
        return (ref$ = this._centerY) != null ? ref$ : 0;
      },
      set: function(v){
        if (this._centerY !== v) {
          this._centerY = v;
          this._shouldUpdateMatrix = true;
        }
        this._centerY;
      },
      configurable: true,
      enumerable: true
    });
    prototype.updateMatrix = function(){
      this._matrix = mat2d.create();
      mat2d.translate(this._matrix, this._matrix, [this.x + this.centerX, this.y + this.centerY]);
      mat2d.scale(this._matrix, this._matrix, [this.scaleX, this.scaleY]);
      mat2d.rotate(this._matrix, this._matrix, this.rotation);
      mat2d.translate(this._matrix, this._matrix, [-this.centerX, -this.centerY]);
      this._shouldUpdateMatrix = false;
    };
    prototype.render = function(){
      if (this._shouldUpdateMatrix) {
        this.updateMatrix();
      }
      return this.canvas;
    };
    return DisplayObject;
  }());
  ((ref$ = this.toys) != null
    ? ref$
    : this.toys = {}).DisplayObject = DisplayObject;
  DisplayObjectContainer = (function(superclass){
    var prototype = extend$((import$(DisplayObjectContainer, superclass).displayName = 'DisplayObjectContainer', DisplayObjectContainer), superclass).prototype, constructor = DisplayObjectContainer;
    function DisplayObjectContainer(){
      DisplayObjectContainer.superclass.call(this);
      this._parent = null;
      this._children = [];
    }
    prototype.addChild = function(child){
      this._children.push(child);
      return child;
    };
    prototype.removeChild = function(child){
      var index;
      index = this._children.indexOf(child);
      if (index !== -1) {
        this._children.splice(index, 1);
        return child;
      } else {}
    };
    prototype.render = function(){
      var x$, ctx, i$, ref$, len$, child, image, y$;
      x$ = ctx = this.canvas.getContext('2d');
      x$.clearRect(0, 0, this.canvas.width, this.canvas.height);
      for (i$ = 0, len$ = (ref$ = this._children).length; i$ < len$; ++i$) {
        child = ref$[i$];
        image = child.render();
        y$ = ctx;
        y$.save();
        y$.transform.apply(ctx, child._matrix);
        y$.drawImage(image, 0, 0);
        y$.restore();
      }
      return superclass.prototype.render.call(this);
    };
    return DisplayObjectContainer;
  }(DisplayObject));
  ((ref$ = this.toys) != null
    ? ref$
    : this.toys = {}).DisplayObjectContainer = DisplayObjectContainer;
  Symbol = (function(superclass){
    var prototype = extend$((import$(Symbol, superclass).displayName = 'Symbol', Symbol), superclass).prototype, constructor = Symbol;
    function Symbol(o){
      Symbol.superclass.call(this);
      this.canvas = o.canvas;
    }
    prototype.createCanvas = void 8;
    return Symbol;
  }(DisplayObject));
  ((ref$ = this.toys) != null
    ? ref$
    : this.toys = {}).Symbol = Symbol;
  function extend$(sub, sup){
    function fun(){} fun.prototype = (sub.superclass = sup).prototype;
    (sub.prototype = new fun).constructor = sub;
    if (typeof sup.extended == 'function') sup.extended(sub);
    return sub;
  }
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
}).call(this);
