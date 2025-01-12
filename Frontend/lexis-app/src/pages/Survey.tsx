import { AnimatePresence, motion } from 'framer-motion';
import { FC, useState } from 'react';
import { surveyQuestions } from '../constants/survey-questions';
import { sendSurveyAnswers } from '../services/axios';


interface SurveyResponse {
  [key: string]: string | { main: string; q3_sub: string };
}

const Survey: FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showSubQuestion, setShowSubQuestion] = useState(false);
  const [answers, setAnswers] = useState<SurveyResponse>({
    q1: '',
    q2: '',
    q3: { main: '', q3_sub: '' }, 
    q4: '',
    q5: '',
    q6: '',
    q7: '',
    q8: '',
    q9: '',
    q10: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAnswerChange = (value: string, isSubQuestion: boolean = false) => {
    const questionKey = `q${currentQuestion + 1}` as keyof SurveyResponse;

    setAnswers(prev => {
      if (currentQuestion + 1 === 3) {
        const q3Answer = prev.q3 as { main: string; q3_sub: string };
        return {
          ...prev,
          q3: isSubQuestion
            ? { ...q3Answer, q3_sub: value }
            : { ...q3Answer, main: value }
        };
      }
      return {
        ...prev,
        [questionKey]: value
      };
    });
  };

  const goToNextQuestion = () => {
    const currentQuestionHasSubQuestion = Boolean(surveyQuestions[currentQuestion].subQuestion);
    if (currentQuestionHasSubQuestion && !showSubQuestion) {
      setShowSubQuestion(true);
      return;
    }

    if (currentQuestion < surveyQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setShowSubQuestion(false);
    }
  };

  const goToPreviousQuestion = () => {
    if (showSubQuestion) {
      setShowSubQuestion(false);
      return;
    }

    if (currentQuestion > 0) {
      const questionKey = `q${currentQuestion}` as keyof SurveyResponse;
      setAnswers(prev => ({
        ...prev,
        [questionKey]: ''
      }));
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    // Connect the API endpoint for the survey submission
    setIsSubmitting(true);
    console.log('Final survey responses:', answers);
    window.dispatchEvent(new CustomEvent('surveySubmit', {
      detail: { responses: answers }
    }));



    try {
      const response = sendSurveyAnswers(answers);

      

    } catch(error) {
      alert("Lexcribe is under maintenanace")
    }

    setIsSubmitting(false);
  };

  const currentQuestionData = surveyQuestions[currentQuestion];

  // Helper function to get the current answer
  const getCurrentAnswer = (isSubQuestion: boolean = false) => {
    const questionKey = `q${currentQuestion + 1}`;
    if (currentQuestion + 1 === 3) {
      const q3Answer = answers.q3 as { main: string; q3_sub: string };
      return isSubQuestion ? q3Answer.q3_sub : q3Answer.main;
    }
    return answers[questionKey] as string;
  };

  const selectedAnswer = getCurrentAnswer();
  const selectedSubAnswer = getCurrentAnswer(true);
  const hasSubQuestion = Boolean(currentQuestionData.subQuestion);
  const isAnswerSelected = Boolean(selectedAnswer);
  const isSubAnswerSelected = Boolean(selectedSubAnswer);
  const canProceed = isAnswerSelected && (!hasSubQuestion || !showSubQuestion || isSubAnswerSelected);

  return (
    <div className="min-h-screen bg-spotlight py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-8">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${((currentQuestion + 1) / surveyQuestions.length) * 100}%`,
                }}
              />
            </div>
            <p className="mt-2 text-sm text-gray-600 text-right">
              Step {currentQuestion + 1} of {surveyQuestions.length}
            </p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentQuestion}-${showSubQuestion}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {!showSubQuestion ? (
                <>
                  <div className="mb-8">
                    {currentQuestionData.questionHeader && (
                      <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                        {currentQuestionData.questionHeader}
                      </h2>
                    )}
                    <p className="text-lg text-gray-700">
                      {currentQuestionData.question}
                    </p>
                  </div>

                  <div className="space-y-3">
                    {currentQuestionData.options?.map((option, index) => (
                      <label
                        key={index}
                        className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all ${getCurrentAnswer() === option
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-200'
                          }`}
                      >
                        <input
                          type={currentQuestionData.type}
                          name={`question-${currentQuestion}`}
                          value={option}
                          checked={getCurrentAnswer() === option}
                          onChange={(e) => handleAnswerChange(e.target.value)}
                          className="mt-1 mr-3"
                        />
                        <span className="text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                      Additional Question
                    </h2>
                    <p className="text-lg text-gray-700">
                      {currentQuestionData.subQuestion?.question}
                    </p>
                  </div>

                  <div className="space-y-3">
                    {currentQuestionData.subQuestion?.options.map((option, index) => (
                      <label
                        key={index}
                        className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all ${getCurrentAnswer(true) === option
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-200'
                          }`}
                      >
                        <input
                          type={currentQuestionData.subQuestion?.type}
                          name={`question-${currentQuestion}-sub`}
                          value={option}
                          checked={getCurrentAnswer(true) === option}
                          onChange={(e) => handleAnswerChange(e.target.value, true)}
                          className="mt-1 mr-3"
                        />
                        <span className="text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex justify-between items-center">
            <button
              onClick={goToPreviousQuestion}
              className={`px-6 py-2 rounded-lg transition-colors ${currentQuestion > 0 || showSubQuestion
                ? 'bg-sky-600 text-white hover:bg-sky-700'
                : 'invisible'
                }`}
              disabled={currentQuestion === 0 && !showSubQuestion}
            >
              &larr; Back
            </button>

            {currentQuestion < surveyQuestions.length - 1 || showSubQuestion ? (
              <button
                onClick={goToNextQuestion}
                className={`px-6 py-2 rounded-lg transition-colors ${canProceed
                  ? 'bg-sky-600 hover:bg-sky-700 text-white'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                disabled={!canProceed}
              >
                Next &rarr;
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className={`px-6 py-2 rounded-lg transition-colors ${canProceed && !isSubmitting
                  ? 'bg-blue-500 hover:bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                disabled={!canProceed || isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Survey;