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
function fadeInEffect(target, content) {
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
            document.getElementById("quizbox").innerHTML = "<h1>No more typing ;)</h1>";
        }
        // else if (qcount == arr.length) {
        //     clearInterval(x);
        // }
    }
}
document.getElementById("begin").onclick =
    function (event) {
        event.preventDefault();
        if (event) {
            startTimer(12);
            fadeOutEffect("begin");
            // START THE WHOLE GAME AFTER THIS
            // changeQuestion(question);
            getapi(url);
        }
    };

function changeQuestion(question, answers)    // Called by Start Button.
{
    var content = '<div id="currentquestion"><h2><p>' + question + '</p></h2><div id="answers">';
    answers.forEach(element => {
        content += '<span>->' + element + '</span><br>\n';
    });
    content += '</div><div id="ansbox"><input id="answer" class="answer" type="text" placeholder="Enter your answer!" onchange="checkInput()" autofocus="autofocus"></input></div>';
    fadeInEffect("quizbox", content);
}

// I don't know how to hide this OK? Help if you can
const api_key = 'P775y82KPdqf3iNCFhTojUn55SjfO8isR8sycexu';
var url = "https://quizapi.io/api/v1/questions?apiKey=" + api_key + "&limit=1";


// API DATA COLLECTION
// Defining async function
var data = 0;
var question = null;
var answers = [];
var correct_ans = null;
async function getapi(url) {
    console.log(url);
    // Storing response
    data = fetch(url)
        .then(response => response.json())
        .then(fadeOutEffect('loading'))
        .then(jsondata => {
            console.log(jsondata);
            for (const key in jsondata) {
                if (Object.hasOwnProperty.call(jsondata, key)) {
                    const element = jsondata[key];
                    if (element["question"] != null && element["question"] != undefined) {
                        question = element.question;
                        if (element["answers"] != null && element["answers"] != undefined) {

                            for (const ans in element.answers) {
                                // console.log(element.answers[ans]);
                                if (element.answers[ans] != null && element.answers[ans] != undefined) {
                                    var isHTML = RegExp.prototype.test.bind(/(<([^>]+)>)/i);
                                    if (isHTML)
                                        continue;
                                    else
                                        answers.push(element.answers[ans]);
                                }
                            }
                            console.log(answers);
                            // answers = [];
                            if (element["correct_answer"] != null) {
                                correct_ans = element.answers[element.correct_answer];
                                console.log(correct_ans);
                            }
                            else {
                                continue;
                            }
                        }
                        else {
                            continue;
                        }
                    }
                    else {
                        continue;
                    }
                    changeQuestion(question, answers);
                }
            }
        });
    // var qcount = 0;
    // else {
    //     fadeInEffect("quizbox", "<h1>We're facing issues fetching questions ;(</h1>");
    // }
}
// arr = ['hello', 'no', 'true'];
var qcount = 0;
function checkInput() {     // Called by button on HTML, not here.
    getapi(url);
    qcount += 1;
    const val = document.getElementById("answer").value;
    if (val.toLowerCase() == correct_ans) {
        console.log("Correct")
        score = document.getElementById("score").innerText;
        value = parseInt(score) + 1;
        document.getElementById("score").innerText = value;
    }
    if (qcount >= 20) {
        fadeInEffect("quizbox", "<h1>You've answered all questions! Awesome!</h1>")
    }
    else {
        console.log(val);
    }
    document.getElementById("ansbox").innerHTML = '<input id="answer" class="answer" type="text" placeholder="Enter your answer!" onchange="checkInput()" autofocus="autofocus"></input>';
    answers = [];
}