// 💡 여기에 퀴즈 문제를 추가하거나 수정하세요!
const questions = [
    {
        question: "인류 최초로 문자가 발명되고 도시 국가가 형성된 '메소포타미아 문명'이 발생한 강 유역은?",
        answers: [
            { text: "나일 강", correct: false },
            { text: "인더스 강", correct: false },
            { text: "티그리스 강, 유프라테스 강", correct: true },
            { text: "황허 강, 창장 강", correct: false }
        ]
    },
    {
        question: "고대 아테네에서 독재자가 될 위험이 있는 사람의 이름을 도자기 파편에 적어 추방했던 제도는?",
        answers: [
            { text: "호민관 제도", correct: false },
            { text: "도편 추방제", correct: true },
            { text: "카스트 제도", correct: false },
            { text: "봉건제", correct: false }
        ]
    },
    {
        question: "고대 로마에서 귀족에 맞서 평민의 권리를 보호하기 위해 처음 설치된 관직은?",
        answers: [
            { text: "집정관", correct: false },
            { text: "원로원", correct: false },
            { text: "황제", correct: false },
            { text: "호민관", correct: true }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "다음 문제";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    
    // 정답을 보여주고 모든 버튼 비활성화
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `수고하셨습니다! 총 ${questions.length}문제 중 ${score}문제를 맞혔습니다. 🎉`;
    nextButton.innerHTML = "다시 풀기";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

// 퀴즈 시작
startQuiz();
