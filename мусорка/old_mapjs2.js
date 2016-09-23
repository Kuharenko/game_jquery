;
jQuery(function($){
	var canvas = document.getElementById('c');
	var size = 50;
	var coord = [{x:0,y:0},{x:1,y:1},{x:2,y:2},
	{x:3,y:3},{x:4,y:4},{x:5,y:5},{x:6,y:6},
	{x:7,y:7},{x:8,y:7},{x:9,y:7},{x:10,y:7},
	{x:11,y:7},{x:12,y:7},{x:13,y:7},{x:14,y:7},
	{x:15,y:6},{x:16,y:5},{x:17,y:4},{x:18,y:3},
	{x:19,y:2},{x:20,y:1},{x:21,y:0},];
	
	
	var App = {
		
		init: function(){
			
			var w = ~~ (canvas.width / size);
			var h = ~~ (canvas.height / size);
			var state = new Array(h);
			for (var y = 0; y < h; ++y) {
				state[y] = new Array(w);
			}

			App.bindFunctions(canvas,size,coord);
		},
		
		bindFunctions: function(canvas,size,coord){

			App.buildMap(canvas, size, coord),
			App.getCoordinates(canvas,size)
		},
		setPlayer: function(canvas,size, coord, posStart, posEnd){
			var ctx = canvas.getContext('2d');
			var playerIcon = new Image();
			playerIcon.src = 'images/circle.png';
			playerIcon.onload = function(){
				ctx.drawImage(playerIcon, coord[posEnd].x*size, coord[posEnd].y*size,50,50);
			}
			var img = new Image();
			img.src = 'images/1064-full.png';
			img.onload = function(){
				i = posStart;
				i<9?num=' '+(i+1):num=i+1;
				ctx.clearRect(coord[posStart].x*size, coord[posStart].y*size,50,50);
				ctx.drawImage(img, coord[posStart].x*size, coord[posStart].y*size,50,50);
				ctx.font = "28px Calibri"
				ctx.fillText(num,coord[posStart].x*size +9, coord[posStart].y*size + 34);

			}
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
				ctx.drawImage(img, coord[i].x*size, coord[i].y*size,50,50);
				i<9?num=' '+(i+1):num=i+1;
				ctx.fillText(num,coord[i].x*size +9, coord[i].y*size + 34);
					//console.log(coord[i].x,' ',coord[i].y);
					
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
		currPlayerPosition: 0,
		finishPlayerPosition: -1,
		init: function(){
			Player.bindFunctions(Player.currPlayerPosition, Player.finishPlayerPosition, coord);
		},

		bindFunctions:function(currPlayerPosition, finishPlayerPosition, coord){

		},
		moveTo: function( currPlayerPosition, finishPlayerPosition, coord ){
			App.setPlayer(canvas,size, coord,currPlayerPosition,finishPlayerPosition);
			Player.currPlayerPosition = finishPlayerPosition;
		},
		moveFront: function(step){
			if(	Player.finishPlayerPosition + step >= coord.length-1){
				var temp = (Player.finishPlayerPosition + step) - coord.length;
				Player.finishPlayerPosition+=step-temp-1;
				Player.moveTo(Player.currPlayerPosition,Player.finishPlayerPosition,coord);
				$('#clckRnd').prop('disabled', true);
			}else{
				Player.finishPlayerPosition+=step;
				Player.moveTo(Player.currPlayerPosition,Player.finishPlayerPosition,coord);
			}
		},
		time: function(){
		
		console.log('time');
			
		},
		moveBack: function(step){
			if(Player.currPlayerPosition<1){
				Player.moveTo(1,1,coord);
			}{
			//console.log('back: ', Player.currPlayerPosition);
			if(	Player.finishPlayerPosition + step <= 0){
				var temp;

				if(Player.finishPlayerPosition + step>0){
					temp = Player.finishPlayerPosition + step;
				}
				else{
					temp = 0;
				}

				Player.finishPlayerPosition=temp;
				Player.moveTo(Player.currPlayerPosition,Player.finishPlayerPosition,coord);
				Player.currPlayerPosition=0;

			}else{
				Player.finishPlayerPosition+=step;
				Player.moveTo(Player.currPlayerPosition,Player.finishPlayerPosition,coord);
			}
		}},

	};
	App.init();
	Player.init();

	$('#clckRnd').bind('click', function() {
		
		var rndNumber = Math.floor(Math.random()*12)+1;
		var sign = Math.floor(Math.random()*100);
		if(sign>50) rndNumber *=-1;
		console.log(rndNumber);
		if(rndNumber>0){
			Player.moveFront(rndNumber)
		}   else {
			Player.moveBack(rndNumber);
		}
		
	});

}($));