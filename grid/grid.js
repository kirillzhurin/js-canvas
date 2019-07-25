var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

xMin = 50;
xMax = 700;
yMin = 50;
yMax = 500;
xStep = 10;
yStep = 10;

context.beginPath();

var imax = Math.floor((xMax - xMin) / xStep);
for (var i = 0; i <= imax; i++) {
  context.moveTo(xMin + xStep * i, yMin);
  context.lineTo(xMin + xStep * i, yMax);
}

var jmax = Math.floor((yMax - yMin) / yStep);
for (var j = 0; j <= jmax; j++) {
  context.moveTo(xMin, yMin + yStep * j);
  context.lineTo(xMax, yMin + yStep * j);
}

context.stroke();
