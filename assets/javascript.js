// Variables
var timer;
var timeLeft = 60; // Set this to whatever number of seconds you want
var currentQuestionIndex = 0;
var questions = [
    // You'll need to fill in your actual questions here
    {question: 'Commonly used data types DO Not Include', answers: ['strings', 'booleans', 'alerts', 'numbers'], correctAnswer: 'alerts'},
    {question: 'The condition in an if/else statement is enclosed with _____', answers: ['quotes', 'curly brackets', 'parenthesis', 'square brackets'], correctAnswer: 'parenthesis'},
    {question: 'Arrays in JavaScript can be used to store', answers: ['numbers and strings', 'other arrays', 'booleans', 'all the above'], correctAnswer: 'all the above'},
    {question: 'String values must be enclosed within _____ when being assigned to variables', answers: ['commas', 'curly brackets', 'quotes', 'parenthesis'], correctAnswer: 'quotes'},
    {question: 'A very useful tool used during development and debugging for printing content to the debugger is:', answers: ['JavaScript', 'terminal/bash', 'for loops', 'console.log'], correctAnswer: 'console.log'},
    // Add more questions as needed
];

// Event listeners
document.getElementById('start-btn').addEventListener('click', startQuiz);
document.getElementById('save-score-btn').addEventListener('click', saveScore);
document.getElementById('view-scores-btn').addEventListener('click', viewScores);
document.getElementById('clear-scores-btn').addEventListener('click', clearScores);


// Functions
function displayQuestion() {
    // Clear out any old question
    var questionContainer = document.getElementById('question-container');
    questionContainer.innerHTML = '';

    // Display current question and answers
    var question = questions[currentQuestionIndex];

    // Create and display question element
    var questionEl = document.createElement('h2');
    questionEl.textContent = question.question;
    questionContainer.appendChild(questionEl);

    // Create and display answer buttons
    for (var i = 0; i < question.answers.length; i++) {
        var button = document.createElement('button');
        button.textContent = question.answers[i];
        button.addEventListener('click', function(event) {
            checkAnswer(event.target.textContent);
        });
        questionContainer.appendChild(button);
    }
}

function startQuiz() {
    // Hide start button and show question container
    document.getElementById('start-btn').style.display = 'none';
    document.getElementById('question-container').style.display = 'block';

    // Start timer
    timer = setInterval(function() {
        timeLeft--;
        // Update timer display
        document.getElementById('timer').textContent = 'Time: ' + timeLeft;
        // If timeLeft reaches 0, end quiz
        if (timeLeft <= 0) {
            clearInterval(timer);
            endQuiz();
        }
    }, 1000);

    // Display first question
    displayQuestion();
}

function checkAnswer(answer) {
    // Check if answer is correct and adjust timeLeft if necessary
    if (answer !== questions[currentQuestionIndex].correctAnswer) {
        timeLeft -= 10; // Or however much time you want to subtract
    }

    // Move to next question
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    // Stop timer
    clearInterval(timer);

    // Hide question container and show end screen
    document.getElementById('question-container').style.display = 'none';
    document.getElementById('end-screen').style.display = 'block';

    // Show the final score
    document.getElementById('score').textContent = timeLeft;
}

function saveScore() {
    // Get initials from input
    var initials = document.getElementById('initials-input').value;

    // Check if initials are entered
    if (initials === '') {
        alert('Please enter your initials.');
        return;
    }

    // Save initials and score (which is time left)
    var highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    highScores.push({initials: initials, score: timeLeft});
    localStorage.setItem('highScores', JSON.stringify(highScores));
}
function viewScores() {
    // Get high scores from local storage
    var highScores = JSON.parse(localStorage.getItem('highScores')) || [];

    // Sort high scores in descending order
    highScores.sort(function(a, b) {
        return b.score - a.score;
    });

    // Clear old scores
    document.getElementById('scores-list').innerHTML = '';

    // Display each score
    for (var i = 0; i < highScores.length; i++) {
        var scoreDiv = document.createElement('div');
        scoreDiv.textContent = highScores[i].initials + ': ' + highScores[i].score;
        document.getElementById('scores-list').appendChild(scoreDiv);
    }

    // Hide other screens and show high scores
    document.getElementById('start-btn').style.display = 'none';
    document.getElementById('question-container').style.display = 'none';
    document.getElementById('end-screen').style.display = 'none';
    document.getElementById('high-scores').style.display = 'block';
}

function clearScores() {
    // Clear scores from local storage
    localStorage.removeItem('highScores');

    // Clear scores from display
    document.getElementById('scores-list').innerHTML = '';
}
