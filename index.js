var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var counter = 0;
var level = 0;

$(document).keydown(function (){
    if(level === 0){
        nextSequence();
        $("h1").text("Level " + level);
    }
});

$(".btn").click(function (){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    animateButton(userChosenColor);
    track(userClickedPattern.length-1);
});

function track(currColor){
    if(gamePattern[currColor] === userClickedPattern[currColor]){
        console.log("success"); 
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function (){
                nextSequence();
            },1000);
            userClickedPattern.length = 0;
        }
    }
    else {
        console.log("wrong");
        $("body").addClass("game-over");
        setTimeout(function (){
            $("body").removeClass("game-over");
        },500);
        $("h1").text("Press Any Key to Restart");
            level = 0;
            gamePattern.length = 0;
            userClickedPattern.length = 0;
    }
}

function nextSequence(){
    var randomNumber = Math.round(Math.random()*3);
    var  randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    animateButton(randomChosenColor);
    level++;
    $("h1").text("Level " + level);
}

function animateButton(color){
    $("#" + color).fadeOut(100).fadeIn(100);
    $("#" + color).addClass("pressed");
    
    setTimeout(function(){
        $("#" + color).removeClass("pressed");
    },100);

    var audio = new Audio("./sounds/" + color + ".mp3");
    audio.play();
}