(function(){
  var AABB, ref$, DisplayObject, DisplayObjectContainer, Symbol;
  AABB = (function(){
    AABB.displayName = 'AABB';
    var axises, scan, prototype = AABB.prototype, constructor = AABB;
    axises = ['x', 'y'];
    scan = function(group, axis){
      var points, i$, len$, box, groups, g, d, p;
      switch (false) {
      case !!Array.isArray(group):
        throw new Error('first argument should be an array');
      case group[0].min[axis] !== undefined:
        throw new Error('axis not found');
      default:
        points = [];
        for (i$ = 0, len$ = group.length; i$ < len$; ++i$) {
          box = group[i$];
          if (!box.isEmpty()) {
            points.push({
              box: box,
              value: box.min[axis],
              depth: 1
            });
            points.push({
              value: box.max[axis],
              depth: -1
            });
          }
        }
        points.sort(function(a, b){
          switch (false) {
          case !(a.value < b.value):
            return -1;
          case a.value !== b.value:
            return 0;
          case !(a.value > b.value):
            return 1;
          }
        });
        groups = [];
        g = [];
        d = 0;
        for (i$ = 0, len$ = points.length; i$ < len$; ++i$) {
          p = points[i$];
          d += p.depth;
          if (d !== 0) {
            if (p.box) {
              g.push(p.box);
            }
          } else {
            groups.push(g);
            g = [];
          }
        }
        return groups;
      }
    };
    AABB.rdc = function(g, todo){
      var results, res$, i$, len$, axis, gs, next;
      todo == null && (todo = axises.slice());
      switch (false) {
      case !!Array.isArray(g):
        throw new Error('first argument should be an array');
      default:
        res$ = [];
        for (i$ = 0, len$ = todo.length; i$ < len$; ++i$) {
          axis = todo[i$];
          gs = scan(g, axis);
          if (gs.length > 1) {
            next = axises.slice();
            next.splice(next.indexOf(axis), 1);
            res$.push(Array.prototype.concat.apply([], (fn$.call(this))));
          } else {
            res$.push(gs);
          }
        }
        results = res$;
        return results.reduce(function(c, n){
          if (c.length > n.length) {
            return c;
          } else {
            return n;
          }
        });
      }
      function fn$(){
        var i$, ref$, len$, results$ = [];
        for (i$ = 0, len$ = (ref$ = gs).length; i$ < len$; ++i$) {
          g = ref$[i$];
          results$.push(this.rdc(g, next));
        }
        return results$;
      }
    };
    AABB.collide = function(it){
      var result, i$, to$, i, j$, to1$, j;
      switch (false) {
      case !!Array.isArray(it):
        throw new Error('first argument should be an array');
      default:
        result = [];
        for (i$ = 0, to$ = it.length; i$ < to$; ++i$) {
          i = i$;
          for (j$ = i + 1, to1$ = it.length; j$ < to1$; ++j$) {
            j = j$;
            if (it[i].intersect(it[j])) {
              result.push([it[i], it[j]]);
            }
          }
        }
        return result;
      }
    };
    AABB.hit = function(it){
      var g;
      switch (false) {
      case !!Array.isArray(it):
        throw new Error('first argument should be an array');
      default:
        return Array.prototype.concat.apply([], (function(){
          var i$, ref$, len$, results$ = [];
          for (i$ = 0, len$ = (ref$ = this.rdc(it)).length; i$ < len$; ++i$) {
            g = ref$[i$];
            results$.push(this.collide(g));
          }
          return results$;
        }.call(this)));
      }
    };
    function AABB(min, max){
      this.min = min != null
        ? min
        : {
          x: Infinity,
          y: Infinity
        };
      this.max = max != null
        ? max
        : {
          x: -Infinity,
          y: -Infinity
        };
      if (isNaN(this.min.x)) {
        this.min.x = Infinity;
      }
      if (isNaN(this.min.y)) {
        this.min.y = Infinity;
      }
      if (isNaN(this.max.x)) {
        this.max.x = -Infinity;
      }
      if (isNaN(this.max.y)) {
        this.max.y = -Infinity;
      }
    }
    Object.defineProperty(prototype, 'width', {
      get: function(){
        return this.max.x - this.min.x;
      },
      configurable: true,
      enumerable: true
    });
    Object.defineProperty(prototype, 'height', {
      get: function(){
        return this.max.y - this.min.y;
      },
      configurable: true,
      enumerable: true
    });
    Object.defineProperty(prototype, 'size', {
      get: function(){
        return this.width * this.height;
      },
      configurable: true,
      enumerable: true
    });
    prototype.isEmpty = function(){
      return this.min.x >= this.max.x || this.min.y >= this.max.y;
    };
    prototype.clone = function(){
      return new AABB(this.min, this.max);
    };
    prototype.transform = function(m00, m01, m10, m11, m20, m21){
      return new AABB({
        x: m00 * this.min.x + m10 * this.min.y + m20,
        y: m01 * this.min.x + m11 * this.min.y + m21
      }, {
        x: m00 * this.max.x + m10 * this.max.y + m20,
        y: m01 * this.max.x + m11 * this.max.y + m21
      });
    };
    prototype.addPoint = function(pt){
      if (pt.x < this.min.x) {
        this.min.x = pt.x;
      }
      if (pt.y < this.min.y) {
        this.min.y = pt.y;
      }
      if (pt.x > this.max.x) {
        this.max.x = pt.x;
      }
      if (pt.y > this.max.y) {
        this.max.y = pt.y;
      }
    };
    prototype.addBox = function(aabb){
      if (aabb.min.x < this.min.x) {
        this.min.x = aabb.min.x;
      }
      if (aabb.min.y < this.min.y) {
        this.min.y = aabb.min.y;
      }
      if (aabb.max.x > this.max.x) {
        this.max.x = aabb.max.x;
      }
      if (aabb.max.y > this.max.y) {
        this.max.y = aabb.max.y;
      }
    };
    prototype.containPoint = function(pt){
      var ref$;
      return (this.min.x < (ref$ = pt.x) && ref$ < this.max.x) && (this.min.y < (ref$ = pt.y) && ref$ < this.max.y);
    };
    prototype.intersect = function(it){
      return this.min.x <= it.max.x && this.max.x >= it.min.x && this.min.y <= it.max.y && this.max.y >= it.min.y;
    };
    return AABB;
  }());
  ((ref$ = this.toys) != null
    ? ref$
    : this.toys = {}).AABB = AABB;
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
      mat2d.rotate(this._matrix, this._matrix, this.rotation);
      mat2d.scale(this._matrix, this._matrix, [this.scaleX, this.scaleY]);
      mat2d.translate(this._matrix, this._matrix, [-this.centerX, -this.centerY]);
      this._shouldUpdateMatrix = false;
    };
    prototype.render = function(parentCtx){
      var x$;
      if (this._shouldUpdateMatrix) {
        this.updateMatrix();
      }
      x$ = parentCtx;
      x$.save();
      x$.transform.apply(parentCtx, this._matrix);
      x$.drawImage(this.canvas, 0, 0);
      x$.restore();
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
    prototype.render = function(parentCtx){
      var x$, ctx, i$, ref$, len$, child;
      x$ = ctx = this.canvas.getContext('2d');
      x$.clearRect(0, 0, this.canvas.width, this.canvas.height);
      for (i$ = 0, len$ = (ref$ = this._children).length; i$ < len$; ++i$) {
        child = ref$[i$];
        child.render(ctx);
      }
      if (parentCtx) {
        superclass.prototype.render.call(this, parentCtx);
      }
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
