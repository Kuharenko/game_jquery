

function playerScor(number){
    var cont = ''
    var points;
    var plName = 'Player';
    
    for(var i=0;i<number;i++){
        cont+='<span class="playername" id="playername'+i+'">'+plName+'</span><span class="playerpoints" id="playerpoints'+i+'">0</span>';
    }
        $('#playerscore').html(cont);
}


// playerScor(10);
//$('body').click(func(10));



