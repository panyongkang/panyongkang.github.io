float_box = document.getElementById("float_box");

var xPos = document.body.clientWidth;
var yPos = 0;
var step = 1;
var delay = 30;
var height = 0;
var Hoffset = 0;
var Woffset = 0;
var yon = 0;
var xon = 0;
var pause = true;
var interval;

float_box.style.top = yPos;

function closeBox() {
    clearInterval(interval);
    float_box.style.visibility = 'hidden';
}

function changePos() {
    width = document.body.clientWidth;
    height = document.body.clientHeight;
    Hoffset = float_box.offsetHeight;
    Woffset = float_box.offsetWidth;
    float_box.style.left = xPos + document.body.scrollLeft+'px';
    float_box.style.top = yPos + document.body.scrollTop+'px';


    if (yon) {
        yPos = yPos + step;
    }
    else {
        yPos = yPos - step;
    }
    if (yPos < 0) {
        yon = 1;
        yPos = 0;
    }
    if (yPos >= (height - Hoffset)) {
        yon = 0;
        yPos = (height - Hoffset);
    }
    if (xon) {
        xPos = xPos + step;
    }
    else {
        xPos = xPos - step;
    }
    if (xPos < 0) {
        xon = 1;
        xPos = 0;
    }
    if (xPos >= (width - Woffset)) {
        xon = 0;
        xPos = (width - Woffset);
    }
}

function start() {
    float_box.style.visibility = "visible";
    interval = setInterval('changePos()', delay);
}

start();
