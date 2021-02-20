let secondsLeft = 75;
let timer = document.getElementById('timer');
let scores = document.getElementById('scores');
let buttons = document.getElementById('buttons');

//high scores
let viewScores = document.getElementById('highScores');

//start button
let startQuiz = document.getElementById('start_btn');
startQuiz.addEventListener('click', setTime);

//questions
var questions = document.getElementById('questions');
//hold results
let results = document.getElementById('results');
//options or answer choices
var options = document.getElementById('options');

//store high scores
let emptyArray = [];

//high scores array from local storage
let storedArray = JSON.parse(window.localStorage.getItem('highScores'));

//current question
var questionCount = 0;
//current score
score = 0;

//when start button pressed, timer starts and 1st question displayed
function setTime() {
    displayQuestions();
    let timerInterval = setInterval(function() {
        secondsLeft--;
        timer.textContext = '';
        timer.textContent = 'Time: ' + secondsLeft;
        if (secondsLeft <= 0 || questionCount === questions.length) {
            clearInterval(timerInterval);
            captureUserScore();
        }
    }, 1000);
}

var questions = [
    {
        title: 'What is the HTML tag used to link to the JavaScript code?',
        options: ['<scripted>', '<javascript>', '<script>', '<js>'],
        answer: '<script>'
    },

    {
        title: 'Which of the following will display the message in an alert box?',
        options: ['alertbox("Hello World")', 'text("Hello World")', 'alert("Hello World")', 'msg("Hello World")'],
        answer: 'alert("Hello World")'
    },

    {
        title: 'The external JavaScript file must contain a <script> tag.',
        options: ['true', 'false'],
        answer: 'true'
    },

    {
        title: 'What property is used to get an array length?',
        options: ['.log', '.length', '.console', 'index'],
        answer: '.length'
    },
    
    {
        title: 'Which are valid JavaScript variable data types?',
        options: ['numbers', 'strings', 'objects', 'All of the above'],
        answer: 'All of the above'
    }
]

function displayQuestions() {
    removeEls(startQuiz);
    // var questionDisplay = questions[0];
    console.log('display question test');
    if (questionCount < questions.length) {
        questions.innerText = questions[questionCount].title;
        options.textContent = '';

        for (let i = 0; i < questions[questionCount].options.length; i++) {
            let el = document.createElement('button');
            el.innerText = questions[questionCount].options[i];
            el.setAttribute('data-id', i);
            el.addEventListener('click', function (event) {
                event.stopPropagation();

                if (el.innerText === questions[questionCount].answer) {
                    score += secondsLeft;
                } else {
                    score -= 10;
                    secondsLeft = secondsLeft - 10;
                }

                questions.innerHTML = '';

                if (questionCount === questions.length) {
                    return;
                } else {
                    questionCount++;
                    displayQuestions();
                }
            });
            options.append(el);
        }
    }
}

function captureUserScore() {
    timer.remove();
    options.textContent = '';

    let initialsInput = document.createElement('input');
    let postScores = document.createElement('input');

    results.innerHTML = 'You scored ${score} points! Enter your initials: ';
    initialsInput.setAttribute('type', 'text');
    postScores.setAttribute('type', 'button');
    postScores.setAttribute('value', 'Post Score');
    postScores.addEventListener('click', function (event) {
        event.preventDefault();
        let scoresArray = defineScoresArray(storedArray, emptyArray);

        let initials = initialsInput.value;
        let userScore = {
            initials: initials,
            score: score,
        };

        scoresArray.push(userScore);
        saveScores(scoresArray);
        displayAllScores();
        clearScores();
        goBackBtn();
        viewScores.remove();
    });
    results.append(initialsInput);
    results.append(postScores);
}

const saveScores = (array) => {
    window.localStorage.setItem('highScores', JSON.stringify(array));
}

const defineScoresArray = (arr1, arr2) => {
    if (arr1 !== null) {
        return arr1
    } else {
        return arr2
    }
}

const removeEls = (...els) => {
    for (let el of els) el.remove();
}

function displayAllScores() {
    removeEls(timer, startQuiz, results);
    let scoresArray = defineScoresArray(storedArray, emptyArray);

    scoresArray.forEach(obj => {
        let initials = obj.initials;
        let storedScore = obj.score;
        let resultsP = document.createElement('p');
        resultsP.innerText = '${initials}: ${storedScore}';
        scores.append(resultsP);
    });
}

function viewHighScores(){
    viewScores.addEventListener('click', function(event) {
        event.preventDefault();
        removeEls(timer, start_btn);
        displayAllScores();
        clearScores();
        goBackBtn();
    });
}

function clearScores () {
    let clearBtn = document.createElement('input');
    clearBtn.setAttribute('type', 'button');
    clearBtn.setAttribute('value', 'Clear Scores');
    clearBtn.addEventListener('click', function(event){
        event.preventDefault();
        removeEls(scores);
        window.localStorage.removeItem('highScores');
    })
    scores.append(clearBtn)
}

function goBackBtn() {
    let backBtn = document.createElement('input');
    backBtn.setAttribute('type', 'button');
    backBtn.setAttribute('value', 'Go Back');
    backBtn.addEventListener('click', function(event){
        event.preventDefault();
        window.location.reload();
    })
    buttons.append(backBtn)
}