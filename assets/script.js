//assigning variables
const startQuiz = document.querySelector('#start_btn');
const quizIntro = document.querySelector('#infoBox');
const questionBox = document.querySelector('#questionBox');
const questionText = document.querySelector('#question');
const answerButton = document.querySelector('#answerBtnBox');
const result = document.querySelector('#correctOrIncorrect');
const finished = document.querySelector('#finishQuizBox');
const finalScore = document.querySelector('#finalScore');
const timerEl = document.querySelector('#timer');
const submitBtnEl = document.querySelector('#submitBtn');
const userInitials = document.querySelector('#enterInitials');
const scoresPage = document.querySelector('highScores');
const scoresList = document.querySelector('#submittedScores');
const clearScores = document.querySelector('#clearScores');
const viewScores = document.querySelector('#viewHighScores');
const goBack = document.querySelector('#goBack');

var currentQuestion;
var currentQuestionIndex;

var score = 0;
var timeLeft = 60;
var timeInterval;

//storing high scores
if (localStorage.length === 0) {
    var highScores = [];
} else {
    var highScores = JSON.parse(localStorage.getItem('highScores'));
}

var highScores;
var li;
var storedHighScores;
var highScoreText;

//questions
const questions = [
    {
        question: 'What is the HTML tag used to link to the JavaScript code?',
        answers: [
            {text: '<scripted>', correct: false},
            {text: '<javascript>', correct: false},
            {text: '<script>', correct: true},
            {text: '<js>', correct: false}
        ]
    },
    {
        question: 'Which of the following will display the message in an alert box?',
        answers: [
            {text: 'alertbox("Hello World")', correct: false}, 
            {text: 'text("Hello World")', correct: false},
            {text:'alert("Hello World")', correct: true}, 
            {text:'msg("Hello World")', correct: false} 
        ]
    },
    {
        question: 'The external JavaScript file must contain a <script> tag.',
        answers: [
            {text:'true', correct: true},
            {text:'false', correct: false}
        ]
    },
    {
        question: 'What property is used to get an array length?',
        answers: [
            {text: '.log', correct: false}, 
            {text: '.length', correct: true}, 
            {text:'.console', correct: false},
            {text:'index', correct: false}
        ]
    },
        {
        question: 'Which are valid JavaScript variable data types?',
        answers: [
            {text: 'numbers', correct: false},
            {text: 'strings', correct: false},
            {text: 'objects', correct: false},
            {text: 'All of the above', correct: true}
        ]
    }
]

//when start quiz button is clicked timer starts and 1st question appears
startQuiz.addEventListener('click', startChallenge);

function startChallenge() {
    timer();
    infoBox.classList.add('hide');
    currentQuestion = questions.sort();
    currentQuestionIndex = 0;
    questionBox.classList.remove('hide');
    setNextQuestion();
}

function timer(){
    timeInterval = setInterval(function(){
        if(timeLeft > 0) {
            timerEl.textContext = "Time Left: " + timeLeft + " seconds";
            timeLeft--;
        } else {
            timerEl.textContext = "Time's Up!";
            showFinishedScreen();
            clearInterval(timeInterval);
        }
    }, 1000);
}
//starts questions and cycles through until no more left
function setNextQuestion() {
    resetState();
    if(currentQuestion.length < currentQuestionIndex +1) {
        showFinishedScreen();
    } else {
        showQuestion(currentQuestion[currentQuestionIndex]);
    }
}
//shows the question and answer text
function showQuestion(questions) {
    questionText.innerText = questions.question;
    questions.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text
        button.classList.add('btn');
        if(answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer);
        answerButton.appendChild(button);
    })
}
//incorrect or correct answer will add points or remove time
function selectAnswer(event) {
    const selectedButton = event.target;
    if (selectedButton.dataset.correct) {
        result.innerHTML = "Correct";
        score = score + 10;
    } else {
        timeLeft = timeLeft - 10;
        result.innerHTML = "Wrong";
    }
    currentQuestionIndex++;
    setNextQuestion();
}
//sets the reset state for next question
function resetState() {
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
}
//finished screen with score and initials box
function showFinishedScreen() {
    clearInterval(timeInterval);
    questionBox.classList.add('hide');
    finished.classList.remove('hide');
    const showScore = document.createElement('p');
    showScore.innerHTML = "You scored " + (score + timeLeft);
    finalScore.appendChild(showScore);
}
//storing scores to high scores page after submit
submitBtnEl.addEventListener('click', showScoresPage);

function showScoresPage (event) {
    event.preventDefault();
    finished.classList.add('hide');
    scoresPage.classList.remove('hide');

    highScoreText = userInitials.value + ": " + (score + timeLeft);

    if(userInitials.value !== '') {
        highScores.push(highScoresText);
        userInitials.value = '';
    }
    storedHighScores();
    renderHighScores();
}
function storedHighScores() {
    localStorage.setItem("highScores", JSON.stringify(highScores));
}
function renderHighScores() {
    for (var i = 0; i < 10; i++) {
        highScores = highScores[i];

        li = document.createElement("li");
        li.textContext = highscore;
        li.setAttribute('data-index', i);

        scoresList.appendChild(li);
    }
}