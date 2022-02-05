function fadeOutEffect(target) {
    var fadeTarget = document.getElementById(target);
    var fadeEffect = setInterval(function () {
        if (!fadeTarget.style.opacity) {
            fadeTarget.style.opacity = 1;
        }
        if (fadeTarget.style.opacity > 0) {
            fadeTarget.style.opacity -= 0.1;
        } else {
            clearInterval(fadeEffect);
        }
    }, 100);
}
function fadeInEffect(target, content)
{
    box = document.getElementById(target);
    box.style.opacity = 0;
    id = setInterval(show, 10);
    function show() {
        box.innerHTML = content;
        opacity = Number(window.getComputedStyle(box)
            .getPropertyValue("opacity"));
        if (opacity < 1) {
            opacity = opacity + 0.01;
            box.style.opacity = opacity
        } else {
            clearInterval(id);
        }
    }
}
function startTimer(time) {
    const t = time;
    x = setInterval(myTimer, 1000);
    var c = 0
    function myTimer() {
        diff = t - c;
        c += 1;
        document.getElementById("timer").innerHTML = "<p>Time: " + parseInt(diff) + "</p>";

        if (diff < 0) {
            clearInterval(x);
            fadeInEffect("timer", "<p>Time is up!</p>");
            fadeOutEffect("quizbox");
        }
        else if (qcount == arr.length)
        {
            clearInterval(x);
        }
    }
}
document.getElementById("begin").onclick =
    function (event) {
        event.preventDefault();
        if (event) {
            startTimer(120);
            fadeOutEffect("begin");
            // START THE WHOLE GAME AFTER THIS
            setupGameHTML();
        }
    };

function setupGameHTML()    // Called by Start Button.
{
    fadeInEffect("quizbox", '<div id="currentquestion"><h2><p>Question comes here</p></h2></div><div id="ansbox"><input id="answer" class="answer" type="text" placeholder="Enter your answer!" onchange="checkInput()"></input></div>');
}

arr = ['hello', 'no', 'true'];
var qcount = 0;
function checkInput() {     // Called by button on HTML, not here.
    var correct_ans = arr[qcount];
    qcount += 1;
    const val = document.getElementById("answer").value;
    if (val.toLowerCase() == correct_ans) {
        console.log("Correct")
        score = document.getElementById("score").innerText;
        value = parseInt(score) + 1;
        document.getElementById("score").innerText = value;
    }
    if(arr.length == qcount)
    {
        fadeInEffect("quizbox","<h1>You've answered all questions! Awesome!</h1>")
    }
    else {
        console.log(val);
    }
    document.getElementById("ansbox").innerHTML = '<input id="answer" class="answer" type="text" placeholder="Enter your answer!" onchange="checkInput()" autofocus="autofocus"></input>';
}