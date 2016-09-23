;
jQuery(function($){

	var canvas           = document.getElementById('c');
	canvas.width = $(window).width();
	canvas.height = $(window).height();
	
	var playersPosition  = [1,1];
	var bon_count        = 3;
	var size             = 55;
	var PL_POS           = 0;
	var valueBonuses     = [1,2,1,2,1,-1,1,1,'swap','skip-step','quest'];
	var coord            = [{x:1,y:3},{x:1,y:4},{x:1,y:5},
	{x:1,y:6},{x:1,y:7},{x:1,y:8},{x:1,y:9},
	{x:1,y:10},{x:1,y:11},{x:1,y:12},{x:2,y:12},
	{x:3,y:12},{x:3,y:13},{x:3,y:14},{x:4,y:14},
	{x:5,y:14},{x:6,y:14},{x:7,y:14},{x:8,y:14},
	{x:9,y:14},{x:10,y:14},{x:11,y:14},{x:12,y:14},
	{x:13,y:14},{x:14,y:14},{x:15,y:14},{x:16,y:14},
	{x:17,y:14},{x:18,y:14},{x:19,y:14},{x:19,y:13},
	{x:19,y:12},{x:20,y:12},{x:21,y:12},{x:21,y:11},{x:21,y:10},
	{x:21,y:9},{x:21,y:8},{x:21,y:7},{x:21,y:6},
	{x:21,y:5},{x:21,y:4},{x:21,y:3},{x:20,y:3},{x:19,y:3},
	{x:19,y:2},{x:19,y:1},{x:18,y:1},{x:17,y:1},
	{x:16,y:1},{x:15,y:1},{x:14,y:1},{x:13,y:1},
	{x:12,y:1},{x:11,y:1},{x:10,y:1},{x:9,y:1},
	{x:8,y:1},{x:7,y:1},{x:6,y:1},{x:5,y:1},
	{x:4,y:1},{x:3,y:1}
	];

    for(var i = 0; i< playersPosition.length; i++){
		$('#canv').append('<canvas id="p'+i+'" width="'+$(window).width()+'" height="'+$(window).height()+'"></canvas>');
	}

	function generateBonuses(){
		var result    = [];
		var temp      = [];
		
		for(var s = 0; s<~~(coord.length/bon_count); s++){
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
			var volume  = true;
			var w       = ~~ (canvas.width / size);
			var h       = ~~ (canvas.height / size);
			var state   = new Array(h);
			
			for (var y = 0; y < h; ++y) {
				state[y] = new Array(w);
			}
			bonuses = [];
			bonuses = generateBonuses();

			App.bindFunctions();
		},

		bindFunctions: function(){
			App.buildMap(),
			App.getCoordinates()
		},
		

		setPlayer: function( posStart, posEnd, player){
			var playerCanvas1;
			var ctx;    
			for(var i = 0; i<playersPosition.length; i++){
				playerCanvas1   = document.getElementById('p'+i);
				ctx             = playerCanvas1.getContext('2d');
				playerIcon      = new Image();
				playerIcon.src  = 'images/player-min.png';


				if(player==i){
					ctx.clearRect(coord[posStart].x*size, coord[posStart].y*size,size,size);
				}
			}
			playerIcon.onload = function(){
				for(var i = 0; i<playersPosition.length; i++){
					canvs         = document.getElementById('p'+i);
					ctx           = canvs.getContext('2d');
					if(player==i){
						ctx.drawImage(playerIcon, coord[posEnd].x*size+5, coord[posEnd].y*size+6,40,40);
					}
				}
			}
			
		},

		buildMap: function(){
			var ctx            = canvas.getContext('2d');
			var img            = new Image();
			var img2           = new Image();
			img.src            = 'images/cells-new.png';
			//img2.src           = 'images/bonus2-min.png';
			
			
			img.onload = function(){
				for(var i = 0; i<coord.length; i++){
					App.buildCells(ctx,img,i);
				}
			};
		},
		
		buildCells: function(ctx,img,i){
			setTimeout(function(){
			    
				ctx.font        = "22px Calibri";
				ctx.fillStyle = 'orange';
				if(i>0)
					ctx.drawImage(img, coord[i].x*size, coord[i].y*size,50,50);
				i<10?num=' '+(i):num=i;
				i==0?num=' ':'';
				ctx.fillText(num,coord[i].x*size +12, coord[i].y*size + 33);
				for(var j = 0; j<bonuses.length; j++){
					if(bonuses[j].x == coord[i].x &&  bonuses[j].y == coord[i].y){
						img_bon = new Image();
						if(bonuses[j].z == 0 || bonuses[j].z == 1 || bonuses[j].z == 6){
							img_bon.src = 'images/0.png';
						}
							if(bonuses[j].z == 2 || bonuses[j].z == 3 || bonuses[j].z == 7){
							img_bon.src = 'images/2.png';
						}
							if(bonuses[j].z == 8){
							img_bon.src = 'images/swap-min.png';
						}
							if(bonuses[j].z == 9){
							img_bon.src = 'images/9.png';
						}
						if(bonuses[j].z == 4 || bonuses[j].z == 5){
							img_bon.src = 'images/air.png';
						}
						if(bonuses[j].z == 10){
							img_bon.src = 'images/earth.png';
						}
						
						ctx.drawImage(img_bon,bonuses[j].x*size, bonuses[j].y*size,size,size);
					}
				}
				
			},100 + i*30);

		},
		getCoordinates: function(){
			$(canvas).click(function(e) {
				var w             = ~~ (canvas.width / size);
				var h             = ~~ (canvas.height / size);

				var mx            = e.offsetX;
				var my            = e.offsetY;

				var gx            = ~~ (mx / size);
				var gy            = ~~ (my / size);

				if (gx < 0 || gx >= w || gy < 0 || gy >= h) {
					return;
				}
				console.log("x: " + gx + "  y: " + gy);
			});
		}
	};
	var Player = {
		bb: false,
		init: function(){
			$("#clckNext").hide();
			$("#clckNext").prop('disabled',true);
		},
		moveTo: function(a, b, player){
			App.setPlayer(a,b, player);
		},

		time: function(i,a,b, p){
			Player.bb = false;
			var sound = document.getElementById('sound');
			setTimeout(function(){
				Player.moveTo(a,b, p);
				if(!App.volume) sound.play();
				
				if(b+1 == playersPosition[p]){
					Player.bb = true;
					bonuses.forEach(function(item, s, arr){
						if( coord[b].x == item.x && coord[b].y == item.y){
							setTimeout(function() {
								console.log('Bonus под номером = ', item.z); 

								(item.z==0 || item.z==1)?(console.log('Bonus +2'),Player.moveFronts(valueBonuses[item.z],p)):'';
								(item.z==2 || item.z==3)?(console.log('Bonus -2'),Player.moveBacks(valueBonuses[item.z],p)):'';
								(item.z==4 || item.z==5)?(console.log('Get score:', ~~(Math.random()*500)*valueBonuses[item.z])):'';
								(item.z==6)?(console.log('Bonus +n'),Player.moveFronts(Math.floor((Math.random()*3)+1)*valueBonuses[item.z],p)):'';
								(item.z==7)?(console.log('Bonus -n'),Player.moveBacks(Math.floor((Math.random()*3)+1)*valueBonuses[item.z],p)):'';
								(item.z==8)?console.log('swap'):'';
								(item.z==9)?console.log('skip step'):'';
								(item.z==10)?console.log('Вопрос номер...', ~~(Math.random()*20)):'';

							},600);
						}
					});
				}
				if(b == coord.length-1){
					setTimeout(function() {
						alert('End! Player' +p+' WIN!');
					},400);
				}
			},400*i);
			sound.pause();
			sound.currentTime = 0;

		},

		moveFronts: function(step, p){
			if( playersPosition[p] + step > coord.length){
				Player.moveFronts(coord.length - playersPosition[p],p);
			}else{
				for(var i = 0; i<step; i++){
					if( playersPosition[p] + i > coord.length-1){
						break;
					}else{
						b= playersPosition[p]+i;
						Player.time(i, playersPosition[p]+i-1, b, p);
					}
				}
				playersPosition[p] +=step;
			}
		},

		moveBacks: function(step,p){
			if( playersPosition[p] - step <= 0) return;
			if( playersPosition[p] - step <= 1 ){
				var next = --step;
				if(next>0) Player.moveBacks(next,p);
			}else{
				for(var i = 0; i<step; i++){
					if(playersPosition[p] - i <= 1){
						break;
					}else{
						b = playersPosition[p]-i-2;
						Player.time(i, playersPosition[p]-i-1,  b, p);
					}
				}
				playersPosition[p]-=step;
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
		ctx1        = canvas.getContext('2d');

		for(var i = 0; i< playersPosition.length; i++){
			playersPosition[i] = 1;
			playerCanvas1      = document.getElementById('p'+i);
			ctx2               = playerCanvas1.getContext('2d');
			ctx2.clearRect(0, 0, canvas.width, canvas.height);
		}

		ctx1.clearRect(0, 0, canvas.width, canvas.height);

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
			rndNumber = Math.floor(Math.random()*10)+2;
			sign = Math.floor(Math.random()*100);
			console.log('Выпало число:', rndNumber);
			if(PL_POS==playersPosition.length-1)PL_POS=0 
				else ++PL_POS;
			
			rndNumber>0? Player.moveFronts(rndNumber, PL_POS):Player.moveBacks(rndNumber, PL_POS);
			
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
		},200); 
	});
}($));