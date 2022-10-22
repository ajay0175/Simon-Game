let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickPattern = [];

let level = 0;
let started = false;

function nextSequence() {
    userClickPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
} 


function playSound(name) {
    let audio = new Audio("Simon Game/sounds/" + name + ".mp3");
    audio.play();
}

$(".btn").click(function() {
    let userChosenColour = $(this).attr("id");
    userClickPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickPattern.length - 1);
});

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}  

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickPattern[currentLevel]) {
        if(userClickPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
        playSound("wrong");
        $("body").addClass("Game-Over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function() {
            $("body").removeClass("Game-Over");
        }, 200);

        startOver();
    }
}

$(document).keypress(function() {
    if(!started) {
        $("#level-title").text("Level" + level);
        nextSequence();
        started = true;
    }
});

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}