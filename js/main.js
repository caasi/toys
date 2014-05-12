(function(){
  var RedBox, BlueBox, x$, red, y$, blue, z$, blue2, z1$, root, z2$, update;
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
  y$ = blue = new BlueBox;
  y$.centerX = 25;
  y$.centerY = 25;
  z$ = blue2 = new toys.Symbol(blue);
  z$.x = 100;
  z$.scaleY = 2;
  z1$ = root = new toys.DisplayObjectContainer;
  z2$ = z1$.canvas;
  z2$.width = 400;
  z2$.height = 400;
  z1$.addChild(red);
  z1$.addChild(blue);
  z1$.addChild(blue2);
  update = function(){
    var x, y, r, x$;
    root.render();
    x = red.x + 1;
    red.x = x > root.canvas.width ? -200 : x;
    x = blue.x + 1;
    y = blue.y + 1;
    r = blue.rotation + 3 * Math.PI / 180;
    x$ = blue;
    x$.x = x > root.canvas.width ? -50 : x;
    x$.y = y > root.canvas.height ? -50 : y;
    x$.rotation = r > 2 * Math.PI ? r - 2 * Math.PI : r;
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
