import React, { useState, useEffect } from 'react';
import './App.css';
import Chat from './chat';

const questions = [
  {
    question: 'Какая столица Франции?',
    options: ['Лондон', 'Мадрид', 'Париж', 'Рим'],
    correctAnswer: 'Париж',
    difficulty: 'easy',
  },
  {
    question: 'Сколько планет в Солнечной системе?',
    options: ['7', '8', '9', '10'],
    correctAnswer: '8',
    difficulty: 'easy',
    },
    {
    question: 'Как называется жидкая вода в замороженном состоянии?',
    options: ['Лед', 'Пар', 'Газ', 'Плазма'],
    correctAnswer: 'Лед',
    difficulty: 'medium',
    },
    {
    question: 'Какой химический символ углекислого газа?',
    options: ['CO', 'H2O', 'O2', 'N2'],
    correctAnswer: 'CO',
    difficulty: 'medium',
    },
    {
    question: 'Какой химический элемент обозначается как Fe?',
    options: ['Железо', 'Алюминий', 'Свинец', 'Калий'],
    correctAnswer: 'Железо',
    difficulty: 'hard',
    },
    {
    question: 'Какой год был основательным для Основания Рима?',
    options: ['753 год до н.э.', '200 год н.э.', '44 год до н.э.', '1066 год н.э.'],
    correctAnswer: '753 год до н.э.',
    difficulty: 'medium',
    },
    {
    question: 'Какое животное является символом Австралии?',
    options: ['Кенгуру', 'Лев', 'Слон', 'Панда'],
    correctAnswer: 'Кенгуру',
    difficulty: 'hard',
    },
    {
    question: 'Кто написал роман "Преступление и наказание"?',
    options: ['Лев Толстой', 'Фёдор Достоевский', 'Иван Тургенев', 'Александр Пушкин'],
    correctAnswer: 'Фёдор Достоевский',
    difficulty: 'hard',
    },
    {
    question: 'Какой химический элемент имеет аббревиатуру "Au"?',
    options: ['Серебро', 'Золото', 'Платина', 'Медь'],
    correctAnswer: 'Золото',
    difficulty: 'hard',
    },
    {
    question: 'Какая столица Франции?',
    options: ['Лондон', 'Мадрид', 'Париж', 'Рим'],
    correctAnswer: 'Париж',
    difficulty: 'easy',
    },
    {
    question: 'Сколько планет в Солнечной системе?',
    options: ['7', '8', '9', '10'],
    correctAnswer: '8',
    difficulty: 'medium',
    },
    {
    question: 'Как называется жидкая вода в замороженном состоянии?',
    options: ['Лед', 'Пар', 'Газ', 'Плазма'],
    correctAnswer: 'Лед',
    difficulty: 'hard',
    },
  // ... (other questions) ...
];

const backgrounds = {
  easy: 'background-easy.jpg',
  medium: 'background-medium.jpg',
  hard: 'background-hard.jpg',
};

const App = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [selectedOption, setSelectedOption] = useState('');
  const [difficulty, setDifficulty] = useState('easy');
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      handleNextQuestion();
    }
  }, [timeLeft, currentQuestionIndex]);

  const handleSelectOption = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (selectedOption === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }

    setSelectedOption('');
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(30);
    } else {
      handleFinishQuiz();
    }
  };

  const handleFinishQuiz = () => {
    setQuizCompleted(true);
  };

  const handleDifficultyChange = (newDifficulty) => {
    setDifficulty(newDifficulty);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const message = { text: newMessage, timestamp: new Date() };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  return (
    
    <div className={`quiz-container ${difficulty}`}>
      <div className="background" style={{ backgroundImage: `url(${backgrounds[difficulty]})` }}></div>
      <div className="quiz-content">
        <h1>Викторина</h1>
        <div className="question">{currentQuestion.question}</div>
        <div className="options">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              className={`option ${selectedOption === option ? 'selected' : ''}`}
              onClick={() => handleSelectOption(option)}
            >
              {option}
            </button>
          ))}
        </div>
        <div className="timer">Осталось времени: {timeLeft} сек.</div>
        <button className="next-button" onClick={handleNextQuestion}>
          Следующий вопрос
        </button>
        <div className="score">Счет: {score}</div>
        <div className="difficulty-buttons">
          <button onClick={() => handleDifficultyChange('easy')}>Легко</button>
          <button onClick={() => handleDifficultyChange('medium')}>Средне</button>
          <button onClick={() => handleDifficultyChange('hard')}>Сложно</button>
        </div>
        {quizCompleted ? (
          <div className="quiz-completed">
            Викторина завершена! Вы набрали {score} правильных ответов из {questions.length}.
          </div>
        ) : (
          <Chat
            messages={messages}
            newMessage={newMessage}
            onSendMessage={handleSendMessage}
            onNewMessageChange={setNewMessage}
          />
        )}
      </div>
    </div>
  );
};

export default App;