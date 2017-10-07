/* 
*  Code By : CDog
*  http://cdog.me
*  inspired by : Rakume
*/
export const initAnimation = () => {
  const DOT_AMOUNT = 120;
  const MAX_RADIUS = 15;
  const MAX_X_SPEED = 0.7;
  const MAX_Y_SPEED = 0.5;
  var canvas = document.getElementById('canvas');

  var ctx = canvas.getContext('2d');
  var color = [
    [252, 229, 286],
    [243, 255, 58],
    [35, 252, 0],
    [150, 255, 215],
    [37, 238, 255],
    [114, 111, 253],
    [250, 111, 253],
    [253, 75, 75]
  ];

  function dot() {
    this.x = Math.round(Math.random() * canvas.width);
    this.y = Math.round(Math.random() * canvas.height);
    this.vx = (Math.random() < 0.5 ? 1 : -1) * Math.random() * MAX_X_SPEED;
    this.vy = (Math.random() < 0.5 ? 1 : -1) * Math.random() * MAX_Y_SPEED;
    this.r = Math.random() * MAX_RADIUS;
    this.alpha = 0.1;
    this.color = Math.round(Math.random() * (color.length - 1));
    this.inScreen = true;
  }

  dot.prototype.draw = function() {
    ctx.fillStyle =
      'rgba(' +
      color[this.color][0] +
      ',' +
      color[this.color][1] +
      ',' +
      color[this.color][2] +
      ',' +
      this.alpha +
      ')';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.fill();
  };

  dot.prototype.update = function() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.alpha < 0.8) {
      this.alpha += 0.01;
    }

    if (
      this.x + this.r < 0 ||
      this.x - this.r > canvas.width ||
      this.y + this.r < 0 ||
      this.y - this.r > canvas.height
    ) {
      this.inScreen = false;
    }
  };

  var cvsCtrl = {
    dots: [],

    init: function() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      for (var i = 0; i < DOT_AMOUNT; i++) {
        cvsCtrl.dots.push(new dot());
      }
      this.update();
    },

    draw: function() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (var i in cvsCtrl.dots) {
        cvsCtrl.dots[i].draw();
      }
    },
    update: function() {
      if (cvsCtrl.dots.length < DOT_AMOUNT) {
        for (var i = cvsCtrl.dots.length; i < DOT_AMOUNT; i++) {
          cvsCtrl.dots.push(new dot());
        }
      }
      var cnt = 0;
      for (i in cvsCtrl.dots) {
        cvsCtrl.dots[i].update();
        if (cvsCtrl.dots[i].inScreen) {
          cvsCtrl.dots[cnt++] = cvsCtrl.dots[i];
        }
      }
      while (cvsCtrl.dots.length > cnt) {
        cvsCtrl.dots.pop();
      }

      cvsCtrl.draw();

      if (cvsCtrl.dots.length)
        requestAnimationFrame(cvsCtrl.update);
    }
  };

  window.canvasControl = cvsCtrl;

  window.onresize = function() {
    cvsCtrl.dots = [];
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  window.onload = cvsCtrl.init();
};