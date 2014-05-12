(function(){
  var RedBox, BlueBox, x$, red, blue, y$, root, update;
  RedBox = (function(superclass){
    var prototype = extend$((import$(RedBox, superclass).displayName = 'RedBox', RedBox), superclass).prototype, constructor = RedBox;
    function RedBox(){
      var x$;
      RedBox.superclass.call(this);
      x$ = this.canvas;
      x$.width = 100;
      x$.height = 100;
    }
    prototype.render = function(){
      var x$;
      x$ = this.canvas.getContext('2d');
      x$.fillStyle = 'red';
      x$.fillRect(0, 0, 100, 100);
      return superclass.prototype.render.call(this);
    };
    return RedBox;
  }(toys.DisplayObject));
  BlueBox = (function(superclass){
    var prototype = extend$((import$(BlueBox, superclass).displayName = 'BlueBox', BlueBox), superclass).prototype, constructor = BlueBox;
    function BlueBox(){
      var x$;
      BlueBox.superclass.call(this);
      x$ = this.canvas;
      x$.width = 50;
      x$.height = 50;
    }
    prototype.render = function(){
      var x$;
      x$ = this.canvas.getContext('2d');
      x$.fillStyle = 'blue';
      x$.fillRect(0, 0, 50, 50);
      return superclass.prototype.render.call(this);
    };
    return BlueBox;
  }(toys.DisplayObject));
  x$ = red = new RedBox;
  x$.x = 10;
  x$.y = 10;
  x$.scaleX = 2;
  blue = new BlueBox;
  y$ = root = new toys.DisplayObjectContainer;
  y$.addChild(red);
  y$.addChild(blue);
  update = function(){
    var x, y;
    root.render();
    x = red.x + 1;
    red.x = x > root.canvas.width ? -200 : x;
    x = blue.x + 1;
    y = blue.y + 1;
    blue.x = x > root.canvas.width ? -50 : x;
    blue.y = y > root.canvas.height ? -50 : y;
    return requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
  $('#container').append(root.canvas);
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
