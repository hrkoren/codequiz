//getting all required elements
const start = document.querySelector('.startQuiz');
const infoBox = document.querySelector('.infoBox');
const highScores = infoBox.querySelector('.highScores');
const startQuiz = infoBox.querySelector('.start');

//if start quiz button clicked
start.onclick = ()=>{
    infoBox.classList.add('activeinfo');
}

//if high scores button clicked - need to open high scores list
// highScores.onclick = ()=>{
//     highScores.classList.add('activeinfo');
// }

