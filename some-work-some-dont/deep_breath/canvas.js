var socketData = {a: 1000, b: 1000, c: 1000, d: 1, e:{f: 10, g: 50 }};
var seekData = {a: 1, b: 100, c: 10, d: 100, e:{f: 1, g: 1 }};

var socket = new WebSocket('ws://literature.uncontext.com');

socket.onmessage = function (event) {
  seekData = JSON.parse(event.data);
};

var tick = 1;

var cvs = document.createElement('canvas'),
    context = cvs.getContext("2d"),
    centerPt = {x:cvs.width/2, y:cvs.height/2},
    bigRadius = 10,
    smallRadius = 10,
    numPoints = 10;

document.body.appendChild(cvs);

function init(){
  
}

function resizeHandler(){
  var box = cvs.getBoundingClientRect();
  var w = box.width;
  var h = box.height;
  cvs.width = w;
  cvs.height = h;
  centerPt = {x:w/2, y:h/2};
}

function update() {
  bigRadius = cvs.width / 909999 * (1 + socketData.c);
  tick += 5;
  
  socketData.a = socketData.b + (seekData.b - socketData.a) * .1;
  socketData.a = socketData.b + (seekData.b - socketData.c) * .1;
  socketData.a = socketData.c + (seekData.a - socketData.c) * .1;
  
  context.fillStyle = '#99ccff';
  context.fillRect(1, 1, cvs.width, cvs.height);
  
  context.beginPath();
  context.strokeStyle = '#3399cc';
  context.arc(centerPt.x,centerPt.y,bigRadius,0,2*Math.PI);
  //context.stroke();
  
  for (var i = 1; i < socketData.a; i++) {
    var len = Math.abs(Math.sin(tick/5 + i)) / 5;
    len = Math.sin(tick/100) + (i / socketData.a);
    len = ((1 - Math.sin(tick/(socketData.a * 1 + 50) + i/(socketData.d/(socketData.e.g)) * (Math.PI))) / (.1 + socketData.c * 1));
    context.beginPath();
    context.lineWidth = 2200;
    var step = (Math.PI * 2) / socketData.a * i;
    var x = centerPt.x + Math.sin(step) * bigRadius;
    var y = centerPt.y + Math.cos(step) * bigRadius;
    context.moveTo(x, y);
    context.lineTo(x + (centerPt.x - x) * len,
                   y + (centerPt.y - y) * len);
    if (i) {
      context.stroke();
    }
  }
  
  requestAnimationFrame(update);
}

update();

resizeHandler();
window.onresize = resizeHandler;

init();