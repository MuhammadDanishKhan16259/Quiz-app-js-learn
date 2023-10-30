// References  to HTML elements
const quizdisplay = document.getElementById("display");
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let wrapper = document.getElementById("wrapper");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");

// Other variables and data
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;

// Array of quiz questions
const quizArray = [
	 // Questions and options go here
	{
		id: "0",
		question: "What does HTML stand for?",
		options: ["Hyper Text Markup Language", "High Technology Modern Language", "Hyperlink and Text Markup Language", "Home Tool Markup Language"],
		correct: "Hyper Text Markup Language"
	},
	{
		id: "1",
		question: "Which HTML tag is used to create a hyperlink?",
		options: ["li", "a", "p", "hr"],
		correct: "a"
	},
	{
		id: "2",
		question: "Which tag is used to define the structure of an HTML table?",
		options: ["img", "picture", "image", "src"],
		correct: "img"
	},
	{
		id: "3",
		question: "Which element is used to define the largest heading?",
		options: ["head", "h6", "heading", "h1"],
		correct: "h1"
	},
	{
		id: "4",
		question: "What is the correct HTML element for creating an unordered list?",
		options: ["ol", "list", "ul", "li"],
		correct: "ul"
	}
];

// Function to start the quiz
function startQuiz() {
	// Show the quiz component
	document.getElementById('wrapper').classList.remove('hide');

	 
    // Disable the Next button initially
    nextBtn.disabled = true;
	// ...
	// Add any additional logic to start the quiz here
}

// Function to handle login logic
function login() {
	// Add your login logic here
	// For example, you can check username and password
	var username = document.getElementById('username').value;
	var password = document.getElementById('password').value;

	// Assuming a simple check for demonstration purposes
	if (username === 'example' && password === 'password') {
		// Hide the login container
		document.querySelector('.login-container').classList.add('hide');

		// Show the start screen
		document.querySelector('.start-screen').classList.remove('hide');
	} else {
		alert('Invalid credentials. Please try again.');
	}
}

//Restart Button
restart.addEventListener("click", () => {


	inital(); //call initial function
	wrapper.classList.remove("hide")
	scoreContainer.classList.add("hide")

})

//Next Button

nextBtn.addEventListener("click", (displayNext =()=> {
	// if (!nextBtn.classList.contains("enabled")) {
    //     return;
    // }
	questionCount += 1;

	if (questionCount == quizArray.length) {
		wrapper.classList.add("hide")
		scoreContainer.classList.remove("hide")

		//User Score
		userScore.innerHTML = "Your Score is " + scoreCount + " out of " + questionCount;

	} else {
		countOfQuestion.innerHTML = questionCount + 1 + " of " + quizArray.length + " Question";
		//display Quiz
		quizDisplay(questionCount)
		count = 11;
		clearInterval(countdown)
		timerDisplay();

	}
   // Disable the Next button again
   nextBtn.disabled = true;
   nextBtn.classList.remove("enabled");

})
);

//Timer

const timerDisplay = () => {
	countdown = setInterval (() => {
		count--;
		timeLeft.innerHTML = `${count}s`
		if (count == 0) {
			//when countdown reaches 0 clearInterval and go to next question
			clearInterval(countdown);
			displayNext()
		}
	}, 1000)
};


const quizDisplay = (questionCount) => {
	let quizCards = document.querySelectorAll(".container_mid")
	quizCards.forEach((card) => {
		card.classList.add("hide")
	})

	quizCards[questionCount].classList.remove("hide")
}



// Quiz creation
function quizCreator() {
	//randomly sort questions
	quizArray.sort(() => Math.random() - 0.5);
	//generate quiz
	for (let i of quizArray) {
		//randomly sort options
		i.options.sort(() => Math.random() - 0.5);
		//quiz card creation
		let div = document.createElement("div");
		div.classList.add("container_mid", "hide");
		//question number
		countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
		//question
		let question_DIV = document.createElement("p");
		question_DIV.classList.add("question");
		question_DIV.innerHTML = i.question;
		div.appendChild(question_DIV);
		//options
		div.innerHTML += `
<button class="option-div" onclick="checker(this)">${i.options[0]}</button>
<button class="option-div" onclick="checker(this)">${i.options[1]}</button>
<button class="option-div" onclick="checker(this)">${i.options[2]}</button>
<button class="option-div" onclick="checker(this)">${i.options[3]}</button>

`;
		quizContainer.appendChild(div);
	}
}


// Check option is correct or not
function checker(userOption) {
	let userSolution = userOption.innerText;
	let question = document.getElementsByClassName("container_mid")[questionCount];
	let options = question.querySelectorAll(".option-div");
	//if user's clicked anaswer==correct option stored in object
	if (userSolution === quizArray[questionCount].correct) {
		//green background and score increment
		userOption.classList.add("correct");
		scoreCount++;
	} else {
		//red background
		userOption.classList.add("inCorrect");
		//for marking green(correct)
		options.forEach((element) => {
			if (element.innerText == quizArray[questionCount].correct) {
				element.classList.add("correct");
			}
		});
	}
	//clear interval(stop timer)
	clearInterval(countdown);
	//disabled all options
	options.forEach((element) => {
		element.disabled = true;
	});
	
    // Enable the Next button after user makes a selection
    nextBtn.disabled = false;
	nextBtn.classList.add("enabled"); // Add "enabled" class to the Next button
}


//initial setup
function inital() {
	quizContainer.innerHTML = "";
	questionCount = 0;
	scoreCount = 0;
	clearInterval(countdown);
	count = 11;
	timerDisplay();
	quizCreator();
	quizDisplay(questionCount);
}
//Start Button Code
startButton.addEventListener("click", () => {
	startScreen.classList.add("hide");
	wrapper.classList.remove("hide");
	inital();
});

window.onload = () => {
	startScreen.classList.remove("hide");
	wrapper.classList.add("hide");
};
