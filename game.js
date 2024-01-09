var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0

$(document).click(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true
    }
});

$(".btn").click(function() {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour); // 1st
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1)
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length){

             setTimeout(function() {
                nextSequence();
             }, 1000);
    }
    
} else {

    console.log("wrong")

    playSound("noyourewrong");

    
    $("body").addClass("game-over")
    setTimeout(function() {
        $("body").removeClass("game-over")
    }, 200)

    $("#level-title").text("No You're Wrong! Game Over! Press Any to Start Again!").css("font-size","20px")

    startOver();
}
}




function nextSequence() {

    //6. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
    userClickedPattern = [];
  
    level++;
    $("#level-title").text("Level " + level);
  
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
  
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
  }
  
  function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }
  
  function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
  }


  function startOver() {

    level = 0;
    gamePattern = [];
    started = false;
  }


