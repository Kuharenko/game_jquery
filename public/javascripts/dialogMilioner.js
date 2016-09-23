/*function dialogQuest(){
    $('.conteinerQuest').fadeIn(2500);
    $.getJSON( "storage/quests.json", function( jsonStr ) {
        var rand = getRandomInt(0,1)  //100 - количество вопросов
        var questionAtThisTime = jsonStr[rand];
        $('.quest').text(questionAtThisTime.quest);
        console.log(questionAtThisTime.quest);
    });
} 

$('#complete').click(function f(){
    $('.conteinerQuest').fadeOut('slow');
    $('.scorebox').css({background: '#69F0AE'}).fadeIn('slow');
    $('#scoremessage').text("You win 100 bonuses!");
    setTimeout(function(){$('.scorebox').fadeOut('slow'); }, 2000);
});

$('#fail').click(function f(){
    $('.conteinerQuest').fadeOut('slow');
    $('.scorebox').css({background: '#FF5252',color:'#fff'}).fadeIn('slow');
    $('#scoremessage').text("You lose -100 bonuses");
    setTimeout(function(){$('.scorebox').fadeOut('slow'); }, 2000);
});*/


//******************************************************************************************************
$('#btn').click(function(){
    //вызывать на бонусе
    //************************
    
    // dialogWith4Answerss();
    // dialogWith4AnswerssV();
    // dialWA();
    // dialogQuest();
    //***********************
});

/*function generateNumber(bool){
    var id;
    if(bool){
       id = setInterval(function(){
            $('#cubenumber').text(getRandomInt(0,12));
        }, 100); 
    }else{
        clearInterval(id);
    }
}*/
/*
var idd;
$('#generatecubenumber').click(function(){
    $("#generatecubenumber").prop('disabled',true);
    $("#acceptcubenumber").prop('disabled',false);
    idd = setInterval(function(){
            $('#cubenumber').text(getRandomInt(1,12));
        }, 60);
});


$('#acceptcubenumber').click(function() {
    clearInterval(idd);
    $("#generatecubenumber").prop('disabled',false);
    $("#acceptcubenumber").prop('disabled',true);
})*/