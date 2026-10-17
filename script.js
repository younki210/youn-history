// 선생님이 문제를 수정하는 공간입니다.
const quizData = [
    {
        question: "세계 4대 문명의 발생지가 아닌 곳은?",
        options: ["메소포타미아", "이집트", "로마", "황하"],
        correctAnswer: "로마"
    },
    {
        question: "고대 그리스에서 민주정치가 가장 발달했던 폴리스는?",
        options: ["스파르타", "아테네", "테베", "코린토스"],
        correctAnswer: "아테네"
    },
    {
        question: "로마가 지중해 세계를 통일하는 데 결정적인 계기가 된 전쟁은?",
        options: ["포에니 전쟁", "펠로폰네소스 전쟁", "페르시아 전쟁", "트로이 전쟁"],
        correctAnswer: "포에니 전쟁"
    }
];

let currentQuestionIndex = 0;
let score = 0;

// HTML 요소들 가져오기
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const questionCount = document.getElementById('question-count');
const scoreDisplay = document.getElementById('score-display');
const nextBtn = document.getElementById('next-btn');
const finalScore = document.getElementById('final-score');
const feedbackMsg = document.getElementById('feedback-msg');

// 버튼 이벤트 연결
document.getElementById('start-btn').addEventListener('click', startQuiz);
document.getElementById('restart-btn').addEventListener('click', startQuiz);
nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
});

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreDisplay.innerText = `점수: ${score}`;
    startScreen.classList.remove('active');
    resultScreen.classList.remove('active');
    quizScreen.classList.add('active');
    loadQuestion();
}

function loadQuestion() {
    nextBtn.classList.add('hide');
    optionsContainer.innerHTML = ''; // 이전 선택지 초기화
    
    const currentQuiz = quizData[currentQuestionIndex];
    questionCount.innerText = `문제 ${currentQuestionIndex + 1} / ${quizData.length}`;
    questionText.innerText = currentQuiz.question;

    currentQuiz.options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('option-btn');
        button.addEventListener('click', () => selectAnswer(button, option));
        optionsContainer.appendChild(button);
    });
}

function selectAnswer(selectedButton, selectedOption) {
    // 모든 버튼 비활성화 (중복 선택 방지)
    const buttons = optionsContainer.querySelectorAll('.option-btn');
    buttons.forEach(btn => {
        btn.disabled = true;
        btn.style.cursor = 'not-allowed';
    });

    const correctAnswer = quizData[currentQuestionIndex].correctAnswer;

    if (selectedOption === correctAnswer) {
        selectedButton.classList.add('correct');
        score += 10;
        scoreDisplay.innerText = `점수: ${score}`;
    } else {
        selectedButton.classList.add('wrong');
        // 정답을 보여주기
        buttons.forEach(btn => {
            if (btn.innerText === correctAnswer) {
                btn.classList.add('correct');
            }
        });
    }

    nextBtn.classList.remove('hide'); // 다음 문제 버튼 표시
}

function showResult() {
    quizScreen.classList.remove('active');
    resultScreen.classList.add('active');
    finalScore.innerText = `총점: ${score}점`;

    if (score === quizData.length * 10) {
        feedbackMsg.innerText = "완벽해요! 오늘 수업 준비가 끝났네요! 🌟";
    } else if (score > 0) {
        feedbackMsg.innerText = "잘했어요! 헷갈린 부분은 오늘 수업에서 알아봐요! 👍";
    } else {
        feedbackMsg.innerText = "오늘 수업을 열심히 들으면 다음엔 다 맞출 수 있어요! 💪";
    }
}
