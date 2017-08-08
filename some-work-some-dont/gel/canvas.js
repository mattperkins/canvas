var canvas = document.querySelector("canvas"),
    ctx = canvas.getContext("2d"),
  toAngle = Math.PI/180,
    r = 0,
    g = 30,
    b = 60;

canvas.width = 450;
canvas.height = 450;

ctx.translate(225,225);
ctx.lineWidth = 60;
ctx.globalCompositeOperation = "lighter";
ctx.shadowBlur = 5; /* 5 is a good amount but experiment */

var last = new Date().getTime();

function draw() {
  var now = new Date().getTime(),
    delta = (now - last)/30;

  window.requestAnimationFrame(draw);
  
  ctx.clearRect(-225,-225,450,450);
  ctx.save();
  
  ctx.rotate(r*toAngle)
  ctx.shadowColor = "#F00";
  ctx.strokeRect(-120,-120,240,240);

  ctx.rotate((g-r)*toAngle)
  ctx.shadowColor = "#0F0";
  ctx.strokeRect(-120,-120,240,240);

  ctx.rotate((b-g)*toAngle)
  ctx.shadowColor = "#00F";
  ctx.strokeRect(-120,-120,240,240);

// my added square below

  ctx.rotate((b-g)*toAngle)
  ctx.shadowColor = "pink";
  ctx.strokeRect(-100,-100,240,240);

  ctx.rotate((b-g)*toAngle)
  ctx.shadowColor = "aqua";
  ctx.strokeRect(-100,-100,240,240);

  ctx.restore();

  r += delta;
  g += delta * 2;
  b += delta * 3;
  last = now;
}

draw();



