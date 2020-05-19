// assigning variables
const start = document.querySelector('.start');
const restart = document.querySelector('.restart');
const extra = document.querySelector('.extra');
let timer = document.querySelector('.timer');
let time = 10;
var interval;
const quizContain = document.querySelector('.quizContain');
const quiz = document.querySelector('.quiz');
const question = document.querySelector('.questions');
const choice = document.querySelector('.choice');
const choiceA = document.getElementById('A');
const choiceB = document.getElementById('B');
const choiceC = document.getElementById('C');
const result = document.querySelector('.result');
var prize = 0;
var scoreBoard = document.querySelector('.score');
var score = 0;
let gameOver = false;
let rightAns = false;
var opSelect = 0;
var selOP = 'undefined'
let correctAns = false;
var CorrectOP = 'A';
let questions = [
    {
        question: "What does HTML stands for?",
        choiceA: "Hyper text Markup Language",
        choiceB: "Hyper teller Markup Language",
        choiceC: "Hyper toll Markup Language",
        correct: "A"
    }, {
        question: "What does CSS stands for?",
        choiceA: "Casting Style Sheet",
        choiceB: "Cascading Style Sheet",
        choiceC: "Coloumn Style Sheet",
        correct: "B"
    }
    , 
    {
        question: "What Does JS stands for?",
        choiceA: "Jango Script",
        choiceB: "Joke Script",
        choiceC: "Java Script",
        correct: "C"
    }, {
        question: "Plural of Sheep is?",
        choiceA: "Sheepes",
        choiceB: "Sheep",
        choiceC: "Sheeps",
        correct: "B"
    }, {
        question: "How many Countries in The World are there?",
        choiceA: "195",
        choiceB: "155",
        choiceC: "175",
        correct: "A"
    }, {
        question: "How many Seas are there in The World?",
        choiceA: "Five",
        choiceB: "Six",
        choiceC: "Seven",
        correct: "C"
    }, {
        question: "Complete Sequence: 0, 1, 1, 2, 3, 5, ?, 13",
        choiceA: "8",
        choiceB: "7",
        choiceC: "11",
        correct: "A"
    }, {
        question: "Do You Like This Quiz?",
        choiceA: "No",
        choiceB: "Yes",
        choiceC: "Somewhat",
        correct: "B"
    }
];
var reqScore = questions.length / 2;
const lastQuestion = questions.length - 1;
let runningQuestion = 0;

//Initializing....
function initGame() {
    scoreBoard.style.display = "inline";
    extra.style.display = "none";
    start.style.display = 'none';
    renderQuestion(runningQuestion);
    restart.style.display = 'block';
    quizContain.style.display = 'block';
    interval = setInterval(countDown, 1000);
}

//render question
function renderQuestion() {
    time = 10;
    result.style.display = 'none';
    let q = questions[runningQuestion];
    question.innerHTML = "<p>" + q.question + "</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceA.style.background = 'none';
    choiceB.style.background = 'none';
    choiceC.style.background = 'none';
    if (q.correct == 'A') {
        correctOP = 'A';
    }
    else if (q.correct == 'B') {
        correctOP = 'B';
    }
    else if (q.correct == 'C') {
        correctOP = 'C';
    }
}

//Answer Checker
function checkAnswer(option) {

    if (selOP == 'undefined')
        if (option == 'A') {
            choiceA.style.background = '#eff0dd';
            opSelect++;
            selOP = 'A';
        }
        else if (option == 'B') {
            selOP = 'B';
            opSelect++;
            choiceB.style.background = '#eff0dd';
        }
        else if (option == 'C') {
            selOP = 'C';
            opSelect++;
            choiceC.style.background = '#eff0dd';
        }

    if (selOP == questions[runningQuestion].correct) {
        rightAns = true;
        if (score <= runningQuestion && opSelect) {
            correctAns = true;
            scoreBoard.innerHTML = `
                <div><h2>Your Score: ${score}</h2></div>
                `
        }
    }
    else if (option != questions[runningQuestion].correct) {
        rightAns = false;
    }
}
//Restart Game
function restartGame() {
    restart.style.display = 'none';
    location.reload();
}

//show correct
function showCorrect(corr) {
    if (selOP == corr) {
        timer.style.display = 'block';
        timer.innerHTML = `<h1>Correct</h1>`;
    } else if (selOP == 'undefined') {
        timer.style.display = 'block';
        timer.innerHTML = `<h1>Times Up!</h1>`;
    }
    if (corr == 'A') {
        choiceA.style.background = '#5eed4e';
    }
    else if (corr == 'B') {
        choiceB.style.background = '#5eed4e';
    }
    else if (corr == 'C') {
        choiceC.style.background = '#5eed4e';
    }
}
//showAns
function showAns(sel, corr) {
    if (sel != corr) {
        timer.style.display = 'block';
        timer.innerHTML = `<h1>Wrong</h1>`;
        if (sel == 'A') {
            choiceA.style.background = '#f54c4c';
        }
        else if (sel == 'B') {
            choiceB.style.background = '#f54c4c';
        }
        else if (sel == 'C') {
            choiceC.style.background = '#f54c4c';
        }
        if (corr == 'A') {
            choiceA.style.background = '#5eed4e';
        }
        else if (corr == 'B') {
            choiceB.style.background = '#5eed4e';
        }
        else if (corr == 'C') {
            choiceC.style.background = '#5eed4e';
        }
    }
}

//timer function
function countDown() {
    console.log(time);
    
    if (time > 0) {
        time--;
        timer.style.display = 'block';
        timer.innerHTML = `<h1>${time}</h1>`
    }
    else if (time === 0) {
        time--;
        timer.style.display = 'none';
        quizContain.style.display = 'none';
        if (rightAns) {
            showCorrect(correctOP);
            quizContain.style.display = 'block';
        }
        else if (!rightAns) {
            if (selOP == 'undefined') {
                showCorrect(correctOP);
            }
            else if (selOP == 'A' || selOP == 'B' || selOP == 'C') {
                showAns(selOP, correctOP);
            }
            quizContain.style.display = 'block';
        }
        if(correctAns){
            score++;
            scoreBoard.innerHTML = `<div><h2>Your Score: ${score}</h2></div>
            `;
        }
    }
    else if(time < 0 && time > -4) {
        time--;
    }
    else if (time === -4) {
        if (runningQuestion < lastQuestion) {
            runningQuestion++;
            renderQuestion();
            correctAns = false;
            if (runningQuestion > 0) {
                selOP = 'undefined';
                
            }
        }
        else if (runningQuestion == lastQuestion) {
            clearInterval(interval);
            if (score < reqScore) {
                result.style.display = 'block';
                result.style.background = '#fc563d';
                correctAns = false;
                result.innerHTML = `<h1>You Lost</h1>
                <span>You answered Less than Half of the Questions Correctly.</span>
                <span>Click Restart to Try Again.</span>`;
            }
            else if (score >= reqScore) {
                prize = score * 10;
                correctAns = false;
                result.style.display = 'block';
                result.style.background = '#5eed4e';
                result.innerHTML = `<h1>You Won</h1>
                <span>You answered Half or More than Half of the Questions Correctly. Your Prize is $${prize}</span>
                <span>Click Restart to try again.</span>`;
            }
        }
    }
}

//Event listeners
start.addEventListener('click', initGame);

restart.addEventListener('click', restartGame);