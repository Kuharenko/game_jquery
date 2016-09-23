;
jQuery(function($){
	var dial_quest = false;
	(que=='on')?dial_quest=true:dial_quest=false;
	var player_name = ssss.split(',');
	var canvas           = document.getElementById('c');
	canvas.width =2456;// 3508/*$(window).width()*/;
	canvas.height = 1736; //2480 /*$(window).height()*/;
	
	var players_info = [];
	var playersPosition  = [];
	var bon_count        = 2;
	var size             = 95/*135*/; /*     size  = 135 / 70 * 100     */
	var PL_POS           = 0;
	var valueBonuses     = [2,2,2,2,1,-1,1,1,/*'swap',*/'skip-step'/*,'quest'*/];

	var coord           = [{x:10,y:1},{x:9,y:1},{x:8,y:1},
	{x:7,y:1},	{x:6,y:1},{x:5,y:1},{x:5,y:2},{x:5,y:3},{x:4,y:4},{x:3,y:5},
	{x:2,y:6},{x:2,y:7},{x:2,y:8},{x:2,y:9},{x:2,y:10},{x:2,y:11},
	{x:3,y:12},{x:4,y:13},{x:5,y:14},{x:5,y:15},{x:5,y:16},
	{x:6,y:16},{x:7,y:16},{x:8,y:16},{x:9,y:16},{x:10,y:16},
	{x:11,y:16},{x:12,y:16},{x:13,y:16},{x:14,y:16},{x:15,y:16},
	{x:16,y:16},{x:17,y:16},{x:18,y:16},{x:19,y:16},{x:20,y:16},
	{x:20,y:15},{x:20,y:14},{x:21,y:13},{x:22,y:12},{x:23,y:11},
	{x:23,y:10},{x:23,y:9},{x:23,y:8},{x:23,y:7},{x:23,y:6},{x:22,y:5},
	{x:21,y:4},{x:20,y:3},{x:20,y:2},{x:20,y:1},{x:19,y:1},{x:18,y:1},
	{x:17,y:1},{x:16,y:1},{x:15,y:1},
	];
	
	
	for(var i = 0; i< player_name.length; i++){
		players_info.push({name: player_name[i],score: 0});
		playersPosition.push(1);
	}
	for(var i = 0; i< playersPosition.length; i++){
		$('#canv').append('<canvas id="p'+i+'" width="2456" height="1736"></canvas>');
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
			activePlayer();

			var volume  = true;
			var w       = ~~ (canvas.width / size);
			var h       = ~~ (canvas.height / size);
			var state   = new Array(h);
			
			for (var y = 0; y < h; ++y) {
				state[y] = new Array(w);
			}
			for(var i = 0; i<playersPosition.length; i++){
				Player.setScore(i,0);
			}
			App.playerScore(players_info);
			bonuses = [];
			bonuses = generateBonuses();
			//console.log(bonuses.length);
			App.bindFunctions();
		},

		bindFunctions: function(){
			App.buildMap()
			App.getCoordinates()
		},
		
		 playerScore: function(players_info){
		    var cont = ''
		    
		    	function compareNumeric(a, b) {
				  return b.score - a.score;
				}
				players_info.sort(compareNumeric);

		    for(var i=0;i<players_info.length;i++){
		        cont+='<span class="playername" id="playername'+i+'">'+players_info[i].name+'</span><span class="playerpoints" id="playerpoints'+i+'">'+Player.getScore(i)+'</span>';
		    }
		    
		        $('#playerscore').html(cont);
		        
		        //$('#playername0').removeClass('ActivePlayer');
		},
		
		setPlayer: function( posStart, posEnd, player){
			/*$('#playername'+player).removeClass('playername');
		    $('#playername'+player).addClass("ActivePlayer");*/
			var playerCanvas1;
			var ctx;    
			var plIcon = [
				'images/fire.png',
				'images/dark_blue.png',
				'images/dark_red.png',
				'images/green.png',
				'images/green_dark.png',
				'images/light_blue.png',
				'images/orange.png',
				'images/purpure.png',
				'images/white.png',
				'images/yellow.png',
				 
				];
			for(var i = 0; i<playersPosition.length; i++){
				playerCanvas1   = document.getElementById('p'+i);
				ctx             = playerCanvas1.getContext('2d');
				playerIcon      = new Image();
				
					
				switch (player) {
					case 0:						playerIcon.src = plIcon[0];		break;
					case 1:						playerIcon.src = plIcon[1];		break;
					case 2:						playerIcon.src = plIcon[2];		break;
					case 3:						playerIcon.src = plIcon[3];		break;
					case 4:						playerIcon.src = plIcon[4];		break;
					case 5:						playerIcon.src = plIcon[5];		break;
					case 6:						playerIcon.src = plIcon[6];		break;
					case 7:						playerIcon.src = plIcon[7];		break;
					case 8:						playerIcon.src = plIcon[8];		break;
					case 9:						playerIcon.src = plIcon[9];		break;
					default:					playerIcon.src = plIcon[0];		break;
				}	
			
				if(player==i){
					ctx.clearRect(coord[posStart].x*size, coord[posStart].y*size,size,size);
				}
			}
			playerIcon.onload = function(){
				for(var i = 0; i<playersPosition.length; i++){
					canvs         = document.getElementById('p'+i);
					ctx           = canvs.getContext('2d');
					if(player==i){
						ctx.drawImage(playerIcon, coord[posEnd].x*size+5, coord[posEnd].y*size+6,size - size/10,size - size/10);
					}
				}
			}
			
		},

		buildMap: function(){
			var ctx            = canvas.getContext('2d');
			var img            = new Image();
			img.src            = 'images/cells-new.png';

			img.onload = function(){
				for(var i = 0; i<coord.length; i++){
					App.buildCells(ctx,img,i);
				}
			};
		},
		
		buildCells: function(ctx,img,i){
			setTimeout(function(){
				ctx.font        = "52px Calibri";
				ctx.fillStyle	= 'orange';
				if(i>0)
					ctx.drawImage(img, coord[i].x*size, coord[i].y*size,size,size);
				i<10?num=' '+(i):num=i;
				i==0?num=' ':'';
				ctx.fillText(num,coord[i].x*size +18, coord[i].y*size + 63);
				
				img_bon = new Image();
				for(var j = 0; j<bonuses.length; j++){
					if(coord[i].x == bonuses[j].x && coord[i].y == bonuses[j].y){
						img_bon.src =  App.getBonuseImage(j);
						App.drowBonuses(img_bon, j, ctx,i);
					}
				}
			},100 + i*100);
		},
		drowBonuses: function(img_bon,j, ctx,i){
			img_bon.onload = function(){
				if(img_bon.src.length<1){
					img_bon.src =  App.getBonuseImage(j);
					App.drowBonuses(img_bon,j);
				}else{
					ctx.drawImage(img_bon,coord[i].x*size, coord[i].y*size, size,size);
				}
			}
		},
		getBonuseImage: function(j){
			if(bonuses[j].z == 0 || bonuses[j].z == 1 /*|| bonuses[j].z == 6*/){
				return 'images/0.png';
			}
			if(bonuses[j].z == 2 || bonuses[j].z == 3 /*|| bonuses[j].z == 7*/){
				return 'images/2.png';
			}
				if(bonuses[j].z == 6 || bonuses[j].z == 7){
				return 'images/123123.png';
			}
			/*if(bonuses[j].z == 8){
				return 'images/arrow.png';
			}*/
			if(bonuses[j].z == 8){
				return 'images/9.png';
			}
			if(bonuses[j].z == 4 || bonuses[j].z == 5){
				return 'images/air2.png';
			}
			if(bonuses[j].z == 9){
				return 'images/earth2.png';
			}
		},
		
		getCoordinates: function(){
			$('#canv').click(function(e) {
				console.log($(window).width(), $(document).width());
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
		setScore: function(player,value){
			if(value == 0)	players_info[player].score=value;
			else	players_info[player].score+=value;
		},
		getScore: function(player){
			return players_info[player].score;
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
								(item.z==2 || item.z==3)?(console.log('Bonus -2'),Player.moveBacks(valueBonuses[item.z],p), 
								Player.setScore(p,-2),   App.playerScore(players_info)):'';
								(item.z==4 || item.z==5)?(val = (~~(Math.random()*500)*valueBonuses[item.z]), console.log('Get score:', val),Player.setScore(p,val), 	App.playerScore(players_info)):'';
								(item.z==6)?(console.log('Bonus +n'),Player.moveFronts(Math.floor((Math.random()*3)+1)*valueBonuses[item.z],p)):'';
								(item.z==7)?(console.log('Bonus -n'),Player.moveBacks(Math.floor((Math.random()*3)+1)*valueBonuses[item.z],p)):'';
								//(item.z==8)?(temp_pos = 0,console.log('Смена игроков')): '';
								/*if(item.z==8){
									high_pl = [];
									// найти игроков впереди
									for(var i = 0; i<playersPosition.length; i++){
										if(playersPosition[p]<playersPosition[i] ){
											console.log('Player ',i, 'впереди');
											high_pl.push(i);
										}
									}
									if(high_pl.length != 0){
									player_swap = ~~(Math.random()*high_pl.length);
									console.log('Свап с ',players_info[i].name, 'игроком');
									swap_pos_1 = playersPosition[p];
									swap_pos_2 = playersPosition[player_swap];
									playersPosition[p]==swap_pos_2;
									playersPosition[player_swap] == swap_pos_1;
									
									console.log('Теперь игрок ',players_info[player_swap].name, 'в позиции',playersPosition[player_swap],'а игрок ',players_info[p].name,' в позции ',playersPosition[p]  );
									console.log(playersPosition);
									}else{
										console.log('Впереди игроков нет');
									}
								}*/
								if(item.z==8){ if(PL_POS+1 > playersPosition.length-1){PL_POS--}else{ PL_POS++;} console.log('Пропуск хода');}
								//(item.z==10)?( dialogWith4Answers(p,100),		/*	dialogQuest(p, 100),*/lookCenter()):'',;

							},600);
						}
					});
				}
				if(b == coord.length-1){
					setTimeout(function() {
						Player.setScore(p,250);
						App.playerScore(players_info);
						
						//$('#EndGame').css("display", "block");
						$('#EndGame').fadeIn(1000);
						$('#restart').fadeIn(1000);
						$("#generatecubenumber").prop('disabled',true);
						$('#EndGame').text('Победа игрока '+ (players_info[0].name) +'!');

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
			Player.setScore(i,0);
		}
		ctx1.clearRect(0, 0, canvas.width, canvas.height);
		
		 $("#generatecubenumber").prop('disabled',false);
		 $('#EndGame').fadeOut(1000);
		 $('#restart').fadeOut(1000);
		setTimeout(App.init(),1000);

		Player.init();
	});
	
	
	var idinterval;
	var rndnumber;
	$('#generatecubenumber').click(function(){
	    $("#generatecubenumber").prop('disabled',true);
	    $("#acceptcubenumber").prop('disabled',false);
	    
	    idinterval = setInterval(function(){
	    	rndnumber = getRandomInt(1,12);
	            $('#cubenumber').text(rndnumber);
	        }, 60);
	        activePlayer();
	});
	
	$('#acceptcubenumber').click(function() {
		
	    clearInterval(idinterval);
	    
	    $("#generatecubenumber").prop('disabled',false);
	    $("#acceptcubenumber").prop('disabled',true);
	    rndNumber = parseInt($('#cubenumber').text());
	    
	    
		
		Player.setScore(PL_POS,rndNumber);
        App.playerScore(players_info);
		
		Player.moveFronts(rndNumber, PL_POS);
		if(dial_quest)dialogQuest(PL_POS, 100);
			if(PL_POS+1 > playersPosition.length-1){
			PL_POS = 0;
		}else{
			++PL_POS;
		}
		
	})
	
	$('#canv').bind('contextmenu', function(){
		return false;
	});
	
	$(document).mouseup(function() {
		$('#canv').off("mousemove");
	});

	function lookPlayer(p, delay){
		var offsetPlayer = 200;
		$('html, body').animate( {
			scrollTop: (coord[playersPosition[p]].y*size - offsetPlayer),
			scrollLeft: (coord[playersPosition[p]].x*size - $(window).width()/2),
		},delay);
	}
	
	function lookCenter(){
		$('html, body').animate( {
			scrollTop: (484),
			scrollLeft: (614)
		},1000);
	}
	function clr(delay){
		$(window).unbind('keypress').one("keypress", function(e) {
			p = playersPosition.length;
			for(var i = 0; i< p; i++){
				if(e.which == 49+i){
					lookPlayer(i,delay);
				}
			}
			$(window).unbind('keypress');
			return false;
		});
	}		 
	clr(1000);
	setInterval(function(delay){
		clr(delay);
	},3000);
	

var randNUMB;
var jsonWithAns;
var playerPos2;
var valBonus2;

function dialogWith4Answers(p,val) {
    $('.containerMil').fadeIn(2500);
    $('.ans').css({background: '#4CAF50',color:'#RNDNUMber'});
    $.getJSON( "storage/quastions.json", function( jsonStr ) {
        randNUMB = getRandomInt(0,1)  //100 - количество вопросов
        // console.log( "rand: " + randNUMB);
        var questionAtThisTime = jsonStr[randNUMB];
        $('.quastions').text(questionAtThisTime.question);
        for(var i=0;i<4;i++){
            $('#ans'+(i+1)).text(questionAtThisTime.ansvers[i].ans);
        }
        jsonWithAns = questionAtThisTime.ansvers;
    });
    playerPos2 = p;
    valBonus2 = val;
}

$('.ans').click(function(event) {
        $('.containerMil').fadeOut('slow');
        // bonusess = 100;
        var idClickedElem = event.target.id;
        if(jsonWithAns[idClickedElem.charAt(3)-1].boolean){
            $('#'+idClickedElem).css({background:'#69F0AE',transition: '0.9s ease',color: '#212121'});
            $('.scorebox').css({background: '#69F0AE'}).fadeIn('slow');
            $('#scoremessage').text("You win "+valBonus2+" bonuses!");
			//последующая обработка правильного ответа +N очков
            Player.setScore(playerPos2,valBonus2);
            App.playerScore(players_info);
            setTimeout(function(){$('.scorebox').fadeOut('slow'); }, 2000);
        }else{
            $('#'+idClickedElem).css({background:'#FF5252',transition: '0.4s ease'});
            $('.scorebox').css({background: '#FF5252',color:'#fff'}).fadeIn('slow');
            $('#scoremessage').text("You lose -"+valBonus2+" bonuses");
            //последующая обработка неправильного ответа -N очков
            Player.setScore(playerPos2,-valBonus2);
            App.playerScore(players_info);
            setTimeout(function(){$('.scorebox').fadeOut('slow'); }, 2000);
        }
});

	
function dialogQuest(p, val){
    $('.conteinerQuest').fadeIn(2500);
    $.getJSON( "storage/quests.json", function( jsonStr ) {
        var rand = getRandomInt(0,100)  //100 - количество вопросов
        var questionAtThisTime = jsonStr[rand];
        $('.quest').text("#"+(rand+1)+" "+questionAtThisTime.quest);
        $("#complete").prop('disabled',false);
        $("#fail").prop('disabled',false);
    });
    playerPos2 = p;
    valBonus2 = val;
} 

$('#complete').click(function f(){
    $('.conteinerQuest').fadeOut('slow');
    $("#complete").prop('disabled',true);
    $("#fail").prop('disabled',true);
    // $('.scorebox').css({background: '#69F0AE'}).fadeIn('slow');
    // $('#scoremessage').text(players_info[playerPos2].name+" win "+valBonus2+" bonuses!");
    // setTimeout(function(){$('.scorebox').fadeOut('slow'); }, 2000);
    Player.setScore(playerPos2,valBonus2);
    App.playerScore(players_info);
});

$('#fail').click(function f(){
    $('.conteinerQuest').fadeOut('slow');
    // $('.scorebox').css({background: '#FF5252',color:'#fff'}).fadeIn('slow');
    // $('#scoremessage').text(players_info[playerPos2].name+" lose -"+valBonus2+" bonuses");
    // setTimeout(function(){$('.scorebox').fadeOut('slow'); }, 2000);
    $("#fail").prop('disabled',true);
    $("#complete").prop('disabled',true);
    Player.setScore(playerPos2,-valBonus2);
    App.playerScore(players_info);
});

function activePlayer(){
	$(".activePlayerNow").text("Текущий игрок: "+players_info[PL_POS].name); 
}

}($));


