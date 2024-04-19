const questions = [
    {
        question: "Who is not a member of Akatsuki?",
        answers: [
            { text: "Itachi", correct: false },
            { text: "Deidara", correct: false },
            { text: "Kakashi", correct: true },
            { text: "Kisame", correct: false }
        ]
    },
    {
        question: "Who was the second Hokage?",
        answers: [
            { text: "Tobirama", correct: true },
            { text: "Hashirama", correct: false },
            { text: "Hiruzen", correct: false },
            { text: "Minato", correct: false }
        ]
    },
    {
        question: "Who killed Konan?",
        answers: [
            { text: "Jiraiya", correct: false },
            { text: "Obito", correct: true },
            { text: "Pain", correct: false },
            { text: "Naruto", correct: false }
        ]
    },
    {
        question: "Which clan was Hashirama from?",
        answers: [
            { text: "Uchiha", correct: false },
            { text: "Uzumaki", correct: false },
            { text: "Nara", correct: false },
            { text: "Senju", correct: true }
        ]
    },
    {
        question: "What is the name of the sage of the six paths?",
        answers: [
            { text: "Nagato", correct: false },
            { text: "Madara", correct: false },
            { text: "Hagoromo", correct: true },
            { text: "Kaguya", correct: false }
        ]
    },
    {
        question: "Who started the fourth great ninja war?",
        answers: [
            { text: "Obito", correct: true },
            { text: "Madara", correct: false },
            { text: "Kabuto", correct: false },
            { text: "Sasuke", correct: false }
        ]
    },
    {
        question: "What is the name of nine-tailed fox?",
        answers: [
            { text: "Tobi", correct: false },
            { text: "Kisame", correct: false },
            { text: "Matatabi", correct: false },
            { text: "Kurama", correct: true }
        ]
    },
    {
        question: "What is the name of Naruto's mother?",
        answers: [
            { text: "Mei", correct: false },
            { text: "Konan", correct: false },
            { text: "Kushina", correct: true },
            { text: "Tsunade", correct: false }
        ]
    },
    {
        question: "Who killed Sasuke's parents?",
        answers: [
            { text: "Itachi", correct: true },
            { text: "Pain", correct: false },
            { text: "Killer B", correct: false },
            { text: "Kakuzu", correct: false }
        ]
    },
    {
        question: "Who is the best character in Naruto?",
        answers: [
            { text: "Sasuke", correct: true },
            { text: "Shino", correct: false },
            { text: "Naruto", correct: false },
            { text: "Kakashi", correct: false }
        ]
    }
];

const root = document.querySelector(":root");
const image = document.querySelector("img");
const h2 = document.querySelector("h2");
const answersDiv = document.querySelector(".answers_div");
// const answersBtn = document.querySelector(".answers_btn");
const nextBtn = document.querySelector(".next_btn");

// image.addEventListener("click", () => {
//     root.style.setProperty("--primary-color", "black");
//     root.style.setProperty("--secondary-color", "orange");
//     image.src = "images/dark theme icon/sun.png"

// });

window.addEventListener("DOMContentLoaded", () => {
    let themeColor = localStorage.getItem("theme");
    let themeIcon = localStorage.getItem("icon");
    document.body.classList.add(themeColor);
    image.src = themeIcon;
});


image.addEventListener("click", () => {
    document.body.classList.toggle("dark_theme");
    if (document.body.classList.contains("dark_theme")) {
        image.src = "images/dark theme icon/sun.png";
        localStorage.setItem("theme", "dark_theme");
        localStorage.setItem("icon", "images/dark theme icon/sun.png")
    } else {
        image.src = "images/dark theme icon/moon.png";
        localStorage.setItem("theme", "");
        localStorage.setItem("icon", "images/dark theme icon/moon.png")
    };
});

let score = 0;
let questionIndexNumber = 0;

function startQuiz() {
    score = 0;
    questionIndexNumber = 0;
    nextBtn.textContent = "Next";
    renderQuestions();
};

function renderQuestions() {
    resetQuestions();
    let questionNo = questions[questionIndexNumber];
    let questionNumber = questionIndexNumber + 1;
    h2.textContent = questionNumber + ". " + questionNo.question;

    questionNo.answers.forEach((answer) => {
        let button = document.createElement("button");
        button.classList.add("answers_btn");
        button.textContent = answer.text;
        button.dataset.correct = answer.correct;
        answersDiv.appendChild(button);

        button.addEventListener("click", () => {
            nextBtn.style.display = "block";
            if (button.dataset.correct === "true") {
                button.classList.add("correct");
                score++;
            } else {
                button.classList.add("incorrect");
            };

            Array.from(answersDiv.children).forEach((button) => {
                if (button.dataset.correct === "true") {
                    button.classList.add("correct");
                }
                button.disabled = true;
            });
        });
    });
};

function nextButton() {
    questionIndexNumber++;
    if (questionIndexNumber < questions.length) {
        renderQuestions();
    } else {
        showScore();
    };
};

nextBtn.addEventListener("click", () => {
    if (questionIndexNumber < questions.length) {
        nextButton();
    } else {
        startQuiz();
    };
});

function resetQuestions() {
    nextBtn.style.display = "none";
    while (answersDiv.firstChild) {
        answersDiv.removeChild(answersDiv.firstChild);
    };
};

function showScore() {
    resetQuestions();
    nextBtn.style.display = "block";
    h2.textContent = `You scored ${score} out of ${questions.length}!`;
    nextBtn.textContent = "Play Again";
    nextBtn.addEventListener("click", () => {
    });
};

startQuiz();
