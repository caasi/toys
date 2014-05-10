(function(){
  var DisplayObject, ref$, DisplayObjectContainer;
  DisplayObject = (function(){
    DisplayObject.displayName = 'DisplayObject';
    var prototype = DisplayObject.prototype, constructor = DisplayObject;
    function DisplayObject(){
      var x$;
      this._dirty = false;
      x$ = this.canvas = document.createElement('canvas');
      x$.width = 0;
      x$.height = 0;
      this._matrix = [1, 0, 0, 0, 1, 0, 0, 0, 0];
      this.x = 0;
      this.y = 0;
      this.scaleX = 0;
      this.scaleY = 0;
      this.rotation = 0;
    }
    prototype.update = function(){
      this._dirty = false;
      return this.canvas.getContext('2d');
    };
    prototype.render = function(){
      if (this._dirty) {
        this.update();
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
      this._dirty = true;
      return child;
    };
    prototype.removeChild = function(child){
      var index;
      index = this._children.indexOf(child);
      if (index !== -1) {
        this._children.splice(index, 1);
        this._dirty = true;
        return child;
      } else {}
    };
    prototype.update = function(){
      var ctx, i$, ref$, len$, child, x$;
      ctx = superclass.prototype.update.call(this);
      for (i$ = 0, len$ = (ref$ = this._children).length; i$ < len$; ++i$) {
        child = ref$[i$];
        x$ = ctx;
        x$.save();
        x$.transform(child._matrix);
        x$.drawImage(child.render());
        x$.restore();
      }
      return ctx;
    };
    return DisplayObjectContainer;
  }(DisplayObject));
  ((ref$ = this.toys) != null
    ? ref$
    : this.toys = {}).DisplayObjectContainer = DisplayObjectContainer;
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
