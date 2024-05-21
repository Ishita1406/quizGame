let questions = [
    {
        question: 'Which HTML tag is used to define an inline style?',
        choice1: '<script>',
        choice2: '<css>',
        choice3: '<style>',
        choice4: '<span>',
        answer: 3,
    },
    {
        question: 'Which property is used to change the text color in CSS?',
        choice1: 'text-color',
        choice2: 'font-color',
        choice3: 'text-style',
        choice4: 'color',
        answer: 4,
    },
    {
        question: 'Which of the following is the correct way to comment in HTML?',
        choice1: '// Comment',
        choice2: '<!-- Comment -->',
        choice3: '/* Comment */',
        choice4: '<! Comment>',
        answer: 2,
    }
];

var que = document.querySelector('#question')
var choices = Array.from(document.querySelectorAll('.text'));
var queCounterText = document.querySelector('#questionCounter');
var scoreText = document.querySelector('#score');
var ans = document.querySelectorAll('.choiceContainer');
var progressBarFull = document.querySelector('#progress-bar-full');

let currQue = {};
let acceptingAns = true;
let score = 0;
let queCounter = 0;
let availableQue = [];
const maxQue = questions.length;

function startQuiz() {
    queCounter = 0;
    score = 0;
    availableQue = [...questions];
    newQuestion();
}

function newQuestion() {
    if (availableQue.length == 0 || queCounter >= maxQue) {
        localStorage.setItem('mostRecentScore', score);
        return window.location.href = 'end.html';
    }

    queCounter++;
    queCounterText.innerText = 'Question' + queCounter + '/' + maxQue;

    var queIdx = Math.floor(Math.random() * availableQue.length);
    currQue = availableQue[queIdx];
    que.innerText = currQue.question;

    choices.forEach(function(choice) {
        var num = choice.dataset['num'];
        choice.innerText = currQue['choice' + num];
        choice.parentElement.classList.remove('correct', 'incorrect');  // Reset classes
        choice.parentElement.style.backgroundColor = 'white';
    });

    availableQue.splice(queIdx, 1);
    acceptingAns = true;
    progressBarFull.style.width = (queCounter / maxQue) * 100 + '%';
}

choices.forEach(function(choice) {
    choice.addEventListener('click', function(e) {
        if (!acceptingAns) return;

        acceptingAns = false;
        var selectedChoice = e.target;
        var selectedAnswer = selectedChoice.dataset['num'];

        var classToApply;
        if (selectedAnswer == currQue.answer) {
            classToApply = 'correct';
            incrementScore(10);
        }
        else {
            classToApply = 'incorrect';
        }

        selectedChoice.parentElement.classList.add(classToApply);

        choices.forEach(function(choice) {
            if (choice.dataset['num'] == currQue.answer) {
                choice.parentElement.classList.add('correct');
                choice.parentElement.style.backgroundColor = 'green';  // Set correct choice background
            } else if (choice.dataset['num'] == selectedAnswer) {
                choice.parentElement.classList.add('incorrect');
                choice.parentElement.style.backgroundColor = 'red';  // Set incorrect choice background
            }
        });

        setTimeout(function() {
            selectedChoice.parentElement.classList.remove(classToApply);
            newQuestion();
        }, 1000);
    });
});

// Increment score function
function incrementScore(num) {
    score += num;
    scoreText.innerText = 'Score: ' + score;
}

function restartGame() {
    window.location.href = 'quiz.html';
}

function goToHomePage() {
    window.location.href = 'index.html';
}

if (window.location.pathname.includes('end.html')) {
    var finalScore = document.querySelector('#finalScore');
    finalScore.innerText = localStorage.getItem('mostRecentScore');
}

// Start the game
startQuiz();