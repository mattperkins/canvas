var socketData = {a: 1, b: 1, c: 10, d: 1, e:{f: 1000, g: 1000 }};
var seekData = {a: 1, b: 10, c: 10, d: 10, e:{f: 1, g: 1 }};

var socket = new WebSocket('ws://localhost');

socket.onmessage = function (event) {
  seekData = JSON.parse(event.data);
};

var tick = 1;

var cvs = document.createElement('canvas'),
    context = cvs.getContext("2d"),
    centerPt = {x:cvs.width/2, y:cvs.height/2},
    bigRadius = 100,
    smallRadius = 100,
    numPoints = 100;

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
  bigRadius = cvs.width / 50000 * (10000 + socketData.c);
  tick += 50;
  
  socketData.a = socketData.d + (seekData.c - socketData.b) * .5;
  socketData.d = socketData.b + (seekData.d - socketData.c) * .1;
  socketData.a = socketData.c + (seekData.a - socketData.c) * .4;
  
  context.fillStyle = 'black';
  context.fillRect(1, 1, cvs.width, cvs.height);
  
  context.beginPath();
  context.strokeStyle = '#ff00cc';
  context.arc(centerPt.x,centerPt.y,bigRadius,0,2*Math.PI);
  //context.stroke();
  
  for (var i = 0; i < socketData.a; i++) {
    var len = Math.abs(Math.sin(tick/1 + i)) / 1;
    len = Math.sin(tick/100) + (i / socketData.a);
    len = ((1 - Math.sin(tick/(socketData.a * 100 + 100) + i/(socketData.d/(socketData.e.g)) * (Math.PI))) / (.1 + socketData.c * 1));
    context.beginPath();
    context.lineWidth = 10000;
    var step = (Math.PI * 100) / socketData.a * i;
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
