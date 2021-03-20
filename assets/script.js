//assigning variables
const startQuiz = document.querySelector('#startBtn');
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
const scoresPage = document.querySelector('#highScores');
const scoresList = document.querySelector('#submittedScores');
const viewScores = document.querySelector('#viewHighScores');
const goBack = document.querySelector('#goBack');
let currentQuestion;
let currentQuestionIndex;
let score = 0;
let timeLeft = 60;
let timeInterval;

startQuiz.addEventListener('click', startChallenge);

//questions
const questions = [
    {
        question: 'What is the HTML tag used to link to the JavaScript code?',
        answers: [
            { text: '<scripted>', correct: false },
            { text: '<javascript>', correct: false },
            { text: '<script>', correct: true },
            { text: '<js>', correct: false }
        ]
    },
    {
        question: 'Which of the following will display the message in an alert box?',
        answers: [
            { text: 'alertbox("Hello World")', correct: false },
            { text: 'text("Hello World")', correct: false },
            { text: 'alert("Hello World")', correct: true },
            { text: 'msg("Hello World")', correct: false }
        ]
    },
    {
        question: 'The external JavaScript file must contain a <script> tag.',
        answers: [
            { text: 'true', correct: true },
            { text: 'false', correct: false }
        ]
    },
    {
        question: 'What property is used to get an array length?',
        answers: [
            { text: '.log', correct: false },
            { text: '.length', correct: true },
            { text: '.console', correct: false },
            { text: 'index', correct: false }
        ]
    },
    {
        question: 'Which are valid JavaScript variable data types?',
        answers: [
            { text: 'numbers', correct: false },
            { text: 'strings', correct: false },
            { text: 'objects', correct: false },
            { text: 'All of the above', correct: true }
        ]
    }
];

//when start quiz button is clicked timer starts and 1st question appears
function startChallenge() {
    timer();
    infoBox.classList.add('hide');
    currentQuestion = questions.sort();
    currentQuestionIndex = 0;
    questionBox.classList.remove('hide');
    setNextQuestion();
}
//time function starts at 60 and decreases in seconds and is displayed on screen
function timer() {
    timeInterval = setInterval(function () {
        if (timeLeft > 1) {
            timerEl.textContent = "Time Left: " + timeLeft + " seconds";
            timeLeft--;
        } else {
            //Not displaying "time's up" but does now go to the finished screen; time stopping at 2 seconds
            // timerEl.textContext = "Time's Up!";
            showFinishedScreen(timerEl.textContext = "Time's Up!");
            clearInterval(timeInterval);
        }
    }, 1000);
}

//starts questions and cycles through until no more left
function setNextQuestion() {
    resetState();
    if (currentQuestion.length < currentQuestionIndex + 1) {
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
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButton.appendChild(button);
    });
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

let initials;

function storeScores(event) {
    event.preventDefault();
    console.log('showScore');
    finished.classList.add('hide');
    scoresList.classList.remove('hide');
    //looks in local storage for a stored array, if none exists, it creates one
    let finalScore = JSON.parse(localStorage.getItem('highScores')) || [];
    finalScore.push({ Initials: userInitials.value, Score: score });
    localStorage.setItem('highScores', JSON.stringify(finalScore));
    scoresPage.textContent = '';
    scoresList.value = '';

    //storing scores to high scores page after submit
}

function showHighScores() {
    //look at localstorage for high scoore and parse array
    //for each array element create p tag and add values and score
    let userScores = JSON.parse(localStorage.getItem('highScores')) || [];
    userScores.forEach(score => {
        let createScoreP = document.createElement('p');
        createScoreP.textContent = score.Initials + ' ' + score.Score;
        console.log(createScoreP);
        scoresList.appendChild(createScoreP);
    })
    highScores.classList.remove('hide');
    scoresList.classList.remove('hide');
    quizIntro.classList.add('hide');
    questionBox.classList.add('hide');
    finished.classList.add('hide');
}

viewScores.addEventListener('click', function (event) {
    event.preventDefault();
    showHighScores();
});
//submit button runs the storeScores function
submitBtnEl.addEventListener('click', storeScores);

//Go Back to start screen
function goBackToStart() {
    quizIntro.classList.remove('hide');
    scoresList.classList.add('hide');
    highScores.classList.add('hide');

    timeLeft = 60;
    timerEl.textContent = "Time Left: " + timeLeft + " seconds";
}

goBack.addEventListener('click', goBackToStart);

//clear local storage on clear high scores button click
function deleteScores () {
    localStorage.clear();
}
