var CLOUD_WIDTH = 500;
var CLOUD_X = 30;
var CLOUD_Y = -20;
var GAP = 10;

var TEXT_OFFSET_X = 170;
var TEXT_OFFSET_Y = 100;
var TEXT_ROW_SPACE = 20;

var GRD_CONST = 60;
var GRD_CENTER_X = 120;
var GRD_CENTER_Y = 40;

var TEXT_WIDTH = 50;
var BAR_HEIGHT = 20;

var barWidth = CLOUD_WIDTH - GAP - TEXT_WIDTH - GAP;

window.renderStatistics = function (ctx, names, times) {

  drawCloud(ctx, CLOUD_X, CLOUD_Y, 'rgba(0, 0, 0, 0.7)');

  CLOUD_X = CLOUD_X - GAP;
  CLOUD_Y = CLOUD_Y - GAP;

  var grd = ctx.createRadialGradient(GRD_CENTER_X, GRD_CENTER_Y, GRD_CONST / 10, GRD_CENTER_X, GRD_CENTER_Y, GRD_CONST * 4);
  grd.addColorStop(0, '#fff');
  grd.addColorStop(1, '#B2EBF2');

  drawCloud(ctx, CLOUD_X, CLOUD_Y, grd);

  writeText(ctx, 'Ура вы победили!', CLOUD_X + TEXT_OFFSET_X, CLOUD_Y + TEXT_OFFSET_Y);
  writeText(ctx, 'Список результатов: ', CLOUD_X + TEXT_OFFSET_X, CLOUD_Y + TEXT_OFFSET_Y + TEXT_ROW_SPACE);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    writeText(ctx, names[i], CLOUD_X + TEXT_OFFSET_X - TEXT_WIDTH - GAP, CLOUD_Y + TEXT_OFFSET_Y + 2 * TEXT_ROW_SPACE + GAP + (GAP + BAR_HEIGHT) * i);

    ctx.fillStyle = hslColor(i, 120, 180);
    ctx.fillRect(CLOUD_X + TEXT_OFFSET_X + TEXT_WIDTH - TEXT_WIDTH - GAP, CLOUD_Y + TEXT_OFFSET_Y + 2 * TEXT_ROW_SPACE + (GAP + BAR_HEIGHT) * i, (barWidth * times[i]) / maxTime, BAR_HEIGHT);
  }

};


function drawCloud(ctx, xoff, yoff, fillStyle) {
  ctx.beginPath();
  ctx.moveTo(107 + xoff, 130 + yoff);

  ctx.bezierCurveTo(178 + xoff, 74 + yoff, 195 + xoff, 70 + yoff, 279 + xoff, 87 + yoff);
  ctx.bezierCurveTo(374 + xoff, 106 + yoff, 437 + xoff, 40 + yoff, 496 + xoff, 104 + yoff);
  ctx.bezierCurveTo(506 + xoff, 115 + yoff, 750 + xoff, 100 + yoff, 600 + xoff, 243 + yoff);
  ctx.bezierCurveTo(600 + xoff, 253 + yoff, 700 + xoff, 300 + yoff, 500 + xoff, 288 + yoff);
  ctx.bezierCurveTo(400 + xoff, 286 + yoff, 248 + xoff, 327 + yoff, 137 + xoff, 262 + yoff);
  ctx.bezierCurveTo(-8 + xoff, 177 + yoff, 117 + xoff, 118 + yoff, 109 + xoff, 131 + yoff);

  ctx.fillStyle = fillStyle;
  ctx.fill();

  ctx.closePath();
}

function writeText(ctx, text, xoff, yoff) {
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText(text, xoff, yoff);
}

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

function hslColor(percent, start, end) {
  var a = percent,
    b = (end - start) * a,
    c = b + start;

  return 'hsl(' + c + ', 100%, 50%)';
}
