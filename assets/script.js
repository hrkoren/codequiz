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
// const clearScores = document.getElementById('#clearScores');
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

function timer() {
    timeInterval = setInterval(function () {
        if (timeLeft > 1) {
            timerEl.textContent = "Time Left: " + timeLeft + " seconds";
            timeLeft--;
        } else {
            timerEl.textContext = "Time's Up!";
            showFinished();
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

    finalScore = JSON.parse(localStorage.getItem("highScores")) || [];
}

// let storedHighScores;
// let highScoreText;

//storing high scores

// function saveHighScores(event) {
//     event.preventDefault();
//     let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
// }
// if (localStorage.highScores.length !== 0) {
//     localStorage.setItem("highScores", JSON.stringify(highScores));
//     let scoresPage = document.createElement('li');
    
//     scoresList.append(scoresPage);
// }

// function storedHighScores() {
//     localStorage.setItem('highScores', JSON.stringify(highScores));
// } 

function showScoresPage(event) {
    event.preventDefault();
    finished.classList.add('hide');
    scoresList.classList.remove('hide');

    highScoreText = userInitials.value + ": " + (score + timeLeft);
    let finalScore = JSON.parse(localStorage.getItem("highScores")) || [];
    if (userInitials.value !== '') {
        scoresPage = document.createElement('li');
        scoresPage.push({userInitials: score});
        userInitials.value = '';

        // let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
        if (localStorage.highScores.length !== 0) {
            localStorage.setItem("highScores", JSON.stringify("highScores"));
            
            scoresList.append(finalScore);
    } 

    //storing scores to high scores page after submit
    submitBtnEl.addEventListener('click', showScoresPage);

    viewScores.addEventListener('click', function (event) {
    showScoresPage(event);
    quizIntro.classList.add('hide');
    questionBox.classList.add('hide');
    finished.classList.add('hide');
    clearInterval(timeInterval);
});
}
}
// storedHighScores();
// renderHighScores();

// let li;
// function renderHighScores() {
//     highScores.innerHTML = scoresList;

//     for (let i = 0; i < 10; i++) {
//         highScore = highScores[i];

//         li = document.createElement('li');
//         li.textContext = highScores;
//         li.setAttribute('data-index', i);

//         scoresList.appendChild(li);
//     }
// }

//Go Back
function goBackToStart() {
    quizIntro.classList.remove('hide');
    scoresPage.classList.add('hide');

    while (showFinishedScreen.firstChild) {
        showFinishedScreen.removeChild(showFinishedScreen.firstChild);
    }
    while (scoresList.firstChild) {
        scoresList.removeChild(scoresList.firstChild);
    }
    timeLeft = 60;
    timerEl.textContent = "Time Left: " + timeLeft + " seconds";

    goBack.addEventListener('click', goBackToStart);
}
