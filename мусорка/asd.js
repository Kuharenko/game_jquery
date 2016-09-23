;
jQuery(function($){
  var playersCount = 2;
  var canvas = document.getElementById('c');
  var playerCanvas = document.getElementById('p');
  var bonusCanvas = document.getElementById('b');
  var size = 50;
  var playersPosition = [{x:1,y:1},{x:2,y:2},];
  var coord = [{x:0,y:0},{x:1,y:1},{x:2,y:2},
  {x:3,y:3},{x:4,y:4},{x:5,y:5},{x:6,y:6},
  {x:7,y:7},{x:8,y:7},{x:9,y:7},{x:10,y:7},
  {x:11,y:7},{x:12,y:7},{x:13,y:7},{x:14,y:7},
  {x:15,y:6},{x:16,y:5},{x:17,y:4},{x:18,y:3},
  {x:19,y:2},{x:20,y:1},{x:21,y:0},];
  var valueBonuses = [1,2,-1,-2,1,-1,1,-1,'swap','skip-step','quest'];

  function generateBonuses(coord){
    var result = [];
    var temp = [];
    for(var s = 0; s<~~(coord.length/2); s++){
      var rndmPlace = ~~(Math.random()*(coord.length));
      if(rndmPlace == coord.length-1 || rndmPlace == 0 || rndmPlace == 1){
      }else{
        if(temp.indexOf(rndmPlace,0)==-1){
          temp.push(rndmPlace);
          result.push(coord[rndmPlace]);
        }
      }
    }
    
    for(var i = 0; i<result.length; i++){
      result[i].z = ~~(Math.random()*11);
    }
    
    return result;
  };  
  
  var bonuses = [];

  var App = {

    init: function(){
      var volume = true;
      var w = ~~ (canvas.width / size);
      var h = ~~ (canvas.height / size);
      var state = new Array(h);
      for (var y = 0; y < h; ++y) {
        state[y] = new Array(w);
      }
      bonuses = [];
      bonuses = generateBonuses(coord);
      App.bindFunctions(canvas,size,coord, bonuses);
    },

    bindFunctions: function(canvas,size,coord,bonuses){

      App.buildMap(canvas, size, coord),
      App.setBonus(bonusCanvas, size, coord, bonuses),
      App.getCoordinates(canvas,size),
      App.createPlayer()
    },
    
    createPlayer: function(){
      for(var i = 0; i < playersPosition.length; i++){
        App.setPlayer(playerCanvas,size,coord,playersPosition[i].x,playersPosition[i].y);
        console.log(playersPosition[i].x);
      }
    },
    
    setPlayer: function(canvas,size, coord, posStart, posEnd){

      var ctx = canvas.getContext('2d');
      ctx.globalCompositeOperation='destination-over';
      var playerIcon = new Image();
      playerIcon.src = 'images/circle_red.png';
      var img = new Image();
      img.src = 'images/1064-full.png';

      img.onload = function(){
        ctx.clearRect(coord[posStart].x*size, coord[posStart].y*size,50,50);
      }

      playerIcon.onload = function(){
        ctx.drawImage(playerIcon, coord[posEnd].x*size, coord[posEnd].y*size,50,50);
      }
      App.setBonus(bonusCanvas, size, coord, bonuses);
    },

    setBonus: function(canvas, size, coord, bonuses){
      var ctx = canvas.getContext('2d');
      var img = new Image();
      img.src = 'images/circle.png';
      img.onload = function(){
        for(var i = 0; i<bonuses.length; i++){
          ctx.drawImage(img,bonuses[i].x*size, bonuses[i].y*size,50,50);
        }
      };

    },
    buildMap: function(canvas,size, coord){
      var ctx = canvas.getContext('2d');
      var img = new Image();
      img.src = 'images/1064-full.png';
      img.onload = function(){
        for(var i = 0; i<coord.length; i++){
          App.test(ctx,img,i,coord,size);
        }
      };
    },
    test: function(ctx,img,i,coord,size){
      setTimeout(function(){
        ctx.font = "28px Calibri"
        if(i>0)
          ctx.drawImage(img, coord[i].x*size, coord[i].y*size,50,50);
        i<10?num=' '+(i):num=i;
        i==0?num='Start':'';
        ctx.fillText(num,coord[i].x*size +9, coord[i].y*size + 34);

      },100 + i*400/10);

    },
    getCoordinates: function(canvas,size){
      $(canvas).click(function(e) {
        var w = ~~ (canvas.width / size);
        var h = ~~ (canvas.height / size);

        var mx = e.offsetX;
        var my = e.offsetY;

        var gx = ~~ (mx / size);
        var gy = ~~ (my / size);

        if (gx < 0 || gx >= w || gy < 0 || gy >= h) {
          return;
        }
        console.log("x: " + gx + "  y: " + gy);
      });
    }
  };
  var Player = {
    currPlayerPosition: 1,
    finishPlayerPosition: 1,
    bb: false,
    init: function(){
      $("#clckNext").hide();
      $("#clckNext").prop('disabled',true);
      Player.bindFunctions(Player.currPlayerPosition, Player.finishPlayerPosition, coord);
    },

    bindFunctions:function(currPlayerPosition, finishPlayerPosition, coord){

    },
    moveTo: function( currPlayerPosition, finishPlayerPosition, coord ){
      App.setPlayer(playerCanvas,size, coord,currPlayerPosition,finishPlayerPosition);
    },

    time: function(i,a,b){
      Player.bb = false;
      var sound = document.getElementById('sound');
      setTimeout(function(){
        Player.moveTo(a, b,coord);
        if(!App.volume) sound.play();

        if(b == Player.finishPlayerPosition){
         Player.bb = true;
         bonuses.forEach(function(item, i, arr){
          if(Player.finishPlayerPosition == item.x){
            setTimeout(function() {
             console.log('Z = ', item.z); 

             (item.z==0 || item.z==1)?Player.moveFronts(valueBonuses[item.z]):'';
             (item.z==2 || item.z==3)?Player.moveBacks(valueBonuses[item.z]):'';
             (item.z==4 || item.z==5)?(console.log('Get score:', ~~(Math.random()*500)*valueBonuses[item.z])):'';
             (item.z==6)?Player.moveFronts(Math.floor((Math.random()*3)+1)*valueBonuses[item.z]):'';
             (item.z==7)?Player.moveBacks(Math.floor((Math.random()*3)+1)*valueBonuses[item.z]):'';
             (item.z==8)?console.log('swap'):'';
             (item.z==9)?console.log('skip step'):'';
             (item.z==10)?console.log('Вопрос номер...', ~~(Math.random()*20)):'';


           },600);
          }
        });
       }
       if(b == coord.length-1){
        setTimeout(function() {
          alert('End');
        },400);
      }
    },400*i);
      sound.pause();
      sound.currentTime = 0;
    },

    moveFronts: function(step){
      if( Player.currPlayerPosition + step > coord.length){
        Player.moveFronts(coord.length-Player.currPlayerPosition);
      }else{
        for(var i = 0; i<step; i++){
          if( Player.currPlayerPosition + i > coord.length-1){
            break;
          }else{
            Player.finishPlayerPosition = Player.currPlayerPosition+i;
            Player.time(i, Player.currPlayerPosition+i-1,  Player.finishPlayerPosition);
          }
        }
        Player.currPlayerPosition +=step;

      }
    },

    moveBacks: function(step){
      if( Player.currPlayerPosition + step <= 1 ){
        var next = ++step;
        if(next<0) Player.moveBacks(next);
        Player.currPlayerPosition = Player.finishPlayerPosition;
        if(Player.currPlayerPosition==0){
         Player.currPlayerPosition++;
         Player.finishPlayerPosition++;
       }
     }else{
      for(var i = 0; i<step*(-1); i++){
        if( Player.currPlayerPosition - i < 1){
          break;
        }else{
          Player.finishPlayerPosition = Player.currPlayerPosition-i-2;
          Player.time(i, Player.currPlayerPosition-i-1,  Player.finishPlayerPosition);
        }
      }
      Player.currPlayerPosition +=step;
    }

  },

};


setTimeout(App.init(),1000);
Player.init();

$('#volume').click(
  function() {
      $(this).toggleClass('glyphicon-volume-up glyphicon-volume-off');
      App.volume = !App.volume;
  });
$('#restart').on('click',function() {
  var ctx1 = canvas.getContext('2d');
  var ctx2 = playerCanvas.getContext('2d');
  var ctx3 = bonusCanvas.getContext('2d');

  ctx1.clearRect(0, 0, canvas.width, canvas.height);
  ctx2.clearRect(0, 0, canvas.width, canvas.height);
  ctx3.clearRect(0, 0, canvas.width, canvas.height);

  Player.currPlayerPosition = 1;
  Player.finishPlayerPosition= 1;

  setTimeout(App.init(),1000);

  Player.init();
  $("#clckRnd").show();
  $("#clckRnd").prop('disabled',false);
  bindButton();
});
function bindButton() {
 $("#clckRnd").unbind('click').one("click", function() {
   $("#clckRnd").hide();
   $("#clckNext").show();
   $("#clckRnd").prop('disabled',true);
   $("#clckNext").prop('disabled',false);
   var rndNumber = Math.floor(Math.random()*11)+1;
   var sign = Math.floor(Math.random()*100);
   console.log('Выпало число:', rndNumber);
   rndNumber>0? Player.moveFronts(rndNumber):Player.moveBacks(rndNumber);
 });
}
bindButton();
$("#clckNext").on("click", function() {
  $("#clckNext").hide();
  $("#clckNext").prop('disabled',true);
  setTimeout(function(){
    $("#clckRnd").show();
    $("#clckRnd").prop('disabled',false);
    bindButton();
  },1000); 
});
}($));