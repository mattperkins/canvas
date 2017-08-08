var socketData = {a: 1000, b: 1, c: 1000, d: 10000, e:{f: 1000, g: 1000 }};
var seekData = {a: 1, b: 10000, c: 10000, d: 1000, e:{f: 1000, g: 1000 }};

var socket = new WebSocket('ws://literature.uncontext.com');

socket.onmessage = function (event) {
  seekData = JSON.parse(event.data);
};

var tick = 1000;

var cvs = document.createElement('canvas'),
    context = cvs.getContext("2d"),
    centerPt = {x:cvs.width/4, y:cvs.height/4},
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
  
  socketData.a = socketData.b + (seekData.c - socketData.d) * .1;
  socketData.d = socketData.b + (seekData.c - socketData.d) * .1;
  socketData.a = socketData.c + (seekData.a - socketData.c) * .9;
  
  context.fillStyle = 'black';
  context.fillRect(0, 0, cvs.width, cvs.height);
  
  context.beginPath();
  context.strokeStyle = 'red';
  context.arc(centerPt.x,centerPt.y,bigRadius,0,2*Math.PI);
  //context.stroke();
  
  for (var i = 0; i < socketData.a; i++) {
    var len = Math.abs(Math.sin(tick/1 + i)) / 1;
    len = Math.sin(tick/100) + (i / socketData.a);
    len = ((1 - Math.sin(tick/(socketData.a * 1 + 1) + i/(socketData.d/(socketData.e.g)) * (Math.PI))) / (.1 + socketData.c * 1));
    context.beginPath();
    context.lineWidth = 100;
    var step = (Math.PI * 10) / socketData.a * i;
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
