

// var array = [ "Слоник","Бегемот","Лама","Заяц","Енотик","Чупакабра","Волченок","Лиса","Креветка","Рачек"];


    // console.log(res);
      /*  var rand = getRandomInt(0,0)  //100 - количество вопросов
        console.log("rand: "+rand);
        var nameAtThisTime = jsonStr[rand];
        
        // tmp = nameAtThisTime.names;
        
        console.log("Pl names: "+nameAtThisTime.names);
        // playerNames = nameAtThisTime.names;
        tmp = nameAtThisTime.names;
/*        for (var i = 0; i<10; i++){
            playerNames.push(nameAtThisTime.names[i]);
        }*/
        
        // console.log("before return: "+playerNames);
        // return playerNames;
   /* });
    console.log(tmp);*/
    /*console.log("Pl names: "+tmp);
    for (var i = 0; i<10; i++){
        playerNames.push(tmp[i]);
    }
    console.log("before return: "+playerNames);
    return playerNames;*/
        
    /*console.log("before before return: "+playerNames);
    return playerNames;*/
    // return [ "Слоник","Бегемот","Лама","Заяц","Енотик","Чупакабра","Волченок","Лиса","Креветка","Рачек"];


//*******************************************************************************************************************************

/*
function getPlayersNames(){
    var playerNames= [];

    $.getJSON( "storage/playerNames.json", function( jsonStr ) {
        var rand = getRandomInt(0,0)  //100 - количество вопросов
        console.log("rand: "+rand);
        var nameAtThisTime = jsonStr[rand].names;
        console.log("nameAtThisTime: "+nameAtThisTime);
        selectOnChange(nameAtThisTime);
        checkboxChange(nameAtThisTime);
    });
}   

function selectOnChange(names){
    var playerName = "Player ";
    // names = getPlayersNames();
    console.log("names after return: "+names);
    var str = '';
    if($("#checkbox-1").is(':checked')){
        for(var i=1;i<this.value;i++){
            str +='<input type="text" class="inputPl" id="player'+i+'" name="player'+i+'" value="'+names[i]+'" size="20" placeholder="введите имя игрока"></br>';
        }
    }
    else{
        for(var i=1;i<this.value;i++){
            str +='<input type="text" class="inputPl" id="player'+i+'" name="player'+i+'" value="'+playerName+(i+1)+'" size="20" placeholder="введите имя игрока"></br>';
        }
    }
    $('#main').html(str);
}  

$('select').on('change', getPlayersNames());


function checkboxChange(names){
    console.log("names after return: "+names);
    if(this.checked){
        for(var i=0;i<10;i++){
            $('#player'+i).val(names[i]);
        }
    }else{
        for(var i=0;i<10;i++){
            $('#player'+i).val("Player "+(i+1));
        }
    }
}

$("#checkbox-1").change(getPlayersNames());*/

//*******************************************************************************************************************************


//----------------------------------------------------------------тоже не робит----------------------------------------------------------------

/*$('select').on('change', function(){
    $.getJSON( "storage/playerNames.json", function( jsonStr ) {
        var rand = getRandomInt(0,0)  //100 - количество вопросов
        console.log("rand: "+rand);
        var nameAtThisTime = jsonStr[rand].names;
        console.log("nameAtThisTime: "+nameAtThisTime);
    
        var playerName = "Player ";
        var names = nameAtThisTime;
        console.log("names after return: "+names);
        var str = '';
        if($("#checkbox-1").is(':checked')){
            for(var i=1;i<this.value;i++){
                str +='<input type="text" class="inputPl" id="player'+i+'" name="player'+i+'" value="'+names[i]+'" size="20" placeholder="введите имя игрока"></br>';
            }
        }
        else{
            for(var i=1;i<this.value;i++){
                str +='<input type="text" class="inputPl" id="player'+i+'" name="player'+i+'" value="'+playerName+(i+1)+'" size="20" placeholder="введите имя игрока"></br>';
            }
        }
        $('#main').html(str);
    });
})

$("#checkbox-1").change(function(){
    $.getJSON( "storage/playerNames.json", function( jsonStr ) {
        var rand = getRandomInt(0,0)  //100 - количество вопросов
        console.log("rand: "+rand);
        var nameAtThisTime = jsonStr[rand].names;
        console.log("nameAtThisTime: "+nameAtThisTime);
        
        var names = nameAtThisTime;
        console.log("names after return: "+names);
        if(this.checked){
            for(var i=0;i<10;i++){
                $('#player'+i).val(names[i]);
            }
        }else{
            for(var i=0;i<10;i++){
                $('#player'+i).val("Player "+(i+1));
            }
        }
    });
});
*/
//----------------------------------------------------------------тоже не робит----------------------------------------------------------------

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ОЧЕНЬ КРИВО НАПИСАНО, НО РОБИТ (НЕ ЛАМАТЬ)++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function compareRandom(a, b) {
  return Math.random() - 0.5;
}

function getPlayersNames(){
    var rand = getRandomInt(0,2);
    var tt = [];
    tt.push(["Слоник","Бегемот","Лама","Заяц","Енотик","Чупакабра","Волченок","Лиса","Креветка","Рачек"]);
    tt.push(["Однокнопочный","Инопланетятин","Чупакабра","Я есть грут","Страж апельсинки","Брррррр","Кактус","Ты кто ваще","ПикаПикаЧу","Дичь"]);
    tt.push(["Апельсинка","Яблочко","Малинка","Грушка","Сливка","Арбузик","Дынька","Гранатик","Абрикоска","Лимончик"]);
    // console.log(tt);
    // console.log(tt[rand]);
    return tt[rand];
    // return ["Слоник","Бегемот","Лама","Заяц","Енотик","Чупакабра","Волченок","Лиса","Креветка","Рачек"];
}


$('select').on('change', function(){
    var playerName = "Player ";
    var names = getPlayersNames();
    names.sort(compareRandom);
    // console.log("names after return: "+names);
    var str = '';
    if($("#checkbox-1").is(':checked')){
        for(var i=1;i<this.value;i++){
            str +='<input type="text" class="inputPl" id="player'+i+'" name="player'+i+'" value="'+names[i]+'" size="20" placeholder="введите имя игрока"></br>';
        }
    }
    else{
        for(var i=1;i<this.value;i++){
            str +='<input type="text" class="inputPl" id="player'+i+'" name="player'+i+'" value="'+playerName+(i+1)+'" size="20" placeholder="введите имя игрока"></br>';
        }
    }
    $('#main').html(str);
})

$("#checkbox-1").change(function(){
    var names = getPlayersNames();
    // console.log("names after return: "+names);
    names.sort(compareRandom);
    if(this.checked){
        for(var i=0;i<10;i++){
            $('#player'+i).val(names[i]);
        }
    }else{
        for(var i=0;i<10;i++){
            $('#player'+i).val("Player "+(i+1));
        }
    }
});


