

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


$(".buttonBlock").click(function(){
    $("#randomnumber").text(getRandomInt(0,10));
});

 