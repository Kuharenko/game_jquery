// block size`
var size = 50;

// get some info about the canvas
var canvas = document.getElementById('c');
var ctx = canvas.getContext('2d');

// how many cells fit on the canvas
var w = ~~ (canvas.width / size);
var h = ~~ (canvas.height / size);

// create empty state array
var state = new Array(h);
for (var y = 0; y < h; ++y) {
    state[y] = new Array(w);
}


var playerIcon = new Image();
playerIcon.src = 'images/circle.png';
var img = new Image();
img.src = 'http://www.progimp.ru/i/brushes/1064-full.png';
//var cart = 'http://3dmax.1bs.ru/files/images/circle.jpg';

var coord = [{x:0,y:0},{x:1,y:1},{x:2,y:2},
{x:3,y:3},{x:4,y:4},{x:5,y:5},{x:6,y:6},
{x:7,y:7},{x:8,y:7},{x:9,y:7},{x:10,y:7},
{x:11,y:7},{x:12,y:7},{x:13,y:7},{x:14,y:7},
{x:15,y:6},{x:16,y:5},{x:17,y:4},{x:18,y:3},
{x:19,y:2},{x:20,y:1},{x:21,y:0},];

playerIcon.onload = function(){
        i = 2;
        ctx.drawImage(playerIcon, coord[i].x*size, coord[i].y*size,50,50);
}
img.onload = function(){

for(var i = 0; i<coord.length; i++){
        //ctx.fillStyle = 'rgba(0, 0, 0, 0)';
        ctx.drawImage(img, coord[i].x*size, coord[i].y*size,50,50);
        //ctx.fillRect(coord[i].x*size, coord[i].y*size,size,size);
        console.log(coord[i].x,' ',coord[i].y);
}
};
// click event, using jQuery for cross-browser convenience
$(canvas).click(function(e) {

    // quick fill function to save repeating myself later
   /* function fill(s, gx, gy) {
        ctx.fillStyle = s;
        ctx.fillRect(gx * size, gy * size, size, size);
    }*/

    // get mouse click position
    var mx = e.offsetX;
    var my = e.offsetY;

    // calculate grid square numbers
    var gx = ~~ (mx / size);
    var gy = ~~ (my / size);
    
    // make sure we're in bounds
    if (gx < 0 || gx >= w || gy < 0 || gy >= h) {
        return;
    }

console.log("x: " + gx + "  y: " + gy);
    if (state[gy][gx]) {
        // if pressed before, flash red
        fill('red', gx, gy);
        setTimeout(function() {
            fill('black', gx, gy)
        }, 1000);
    } else {
        state[gy][gx] = true;
        fill('black', gx, gy);
    }
});