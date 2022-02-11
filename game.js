var gamePattern=[];
var userPattern=[];
var level=0;
var index=0;

var buttonColors=["red","blue","green","yellow"];

$(document).keydown(function(){
    if(gamePattern.length===0)
    nextSequence();
});

$(".btn").click(function (){
    var userChosenColor=$(this).attr("id");
    userPattern.push(userChosenColor);
    console.log("user: ");
    console.log(userPattern);
    animatePress(userChosenColor);
    playSound(userChosenColor);

    checkAnswer();
});



function nextSequence(){
    level++;
    var randomNumber=Math.round(Math.random()*3);
    var randomChosenColor=buttonColors[randomNumber];
    //console.log(randomChosenColor);
    gamePattern.push(randomChosenColor);
    console.log("gamep: ");
    console.log(gamePattern);
    $("#" + randomChosenColor).fadeOut(100).fadeIn();
    playSound(randomChosenColor);
    $("h1").text("Level "+level);
}

function playSound(selectedColor){
    var audio=new Audio("sounds/"+selectedColor+".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("."+currentColor).addClass("pressed");
    setTimeout(function(){
        $("."+currentColor).removeClass("pressed");
    },100);
}

function checkAnswer(){
    var index=userPattern.length-1;
    if(index==gamePattern.length-1)
    {
        if(gamePattern[index]===userPattern[index])
        {
            userPattern=[];
            setTimeout(function (){
                nextSequence();
            },500);
        }
        else{
            gameOver();
        }
        
        
    }
    else if(gamePattern[index]===userPattern[index])
        console.log("success");
    else{
        gameOver();
    }

}

function gameOver(){
    $("h1").text("Game Over! Press Any key to start over");
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
        var audio=new Audio("sounds/wrong.mp3");
        audio.play();
    },100);

    userPattern=[];
    gamePattern=[];
    level=0;

    
}