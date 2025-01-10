import { FC, useState } from 'react';
import { surveyQuestions } from '../constants/survey-questions';

const Survey: FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAnswerChange = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [`q${currentQuestion + 1}`]: value
    }));
  };

  const goToNextQuestion = () => {
    if (currentQuestion < surveyQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);

    const responsePayload = surveyQuestions.reduce((acc, question) => {
      acc[question.id] = answers[`q${question.id}`] || null;
      return acc;
    }, {} as Record<number, string | null>);

    console.log('Final survey responses:', responsePayload);

    window.dispatchEvent(new CustomEvent('surveySubmit', {
      detail: { responses: responsePayload }
    }));

    setIsSubmitting(false);
  };

  const currentQuestionData = surveyQuestions[currentQuestion];
  const selectedAnswer = answers[`q${currentQuestion + 1}`];
  const isAnswerSelected = Boolean(selectedAnswer);

  return (
    <div className="min-h-screen bg-spotlight py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6 text-center">
            <h2 className="text-lg font-medium text-gray-900">
              Step {currentQuestion + 1} of {surveyQuestions.length}
            </h2>
            <p className="text-sm text-gray-500">
              {currentQuestionData.question}
            </p>
          </div>

          <div className="space-y-4">
            {currentQuestionData.options?.map((option, index) => (
              <label
                key={index}
                className={`block p-4 border rounded-lg hover:border-blue-500 cursor-pointer transition-colors ${
                  selectedAnswer === option ? 'border-blue-500 bg-blue-50' : ''
                }`}
              >
                <input
                  type="radio"
                  name={`question-${currentQuestion}`}
                  value={option}
                  checked={selectedAnswer === option}
                  onChange={(e) => handleAnswerChange(e.target.value)}
                  className="mr-2"
                />
                {option}
              </label>
            ))}
          </div>

          <div className="mt-6 flex justify-between">
            {currentQuestion > 0 && (
              <button
                onClick={goToPreviousQuestion}
                className="py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
              >
                Back
              </button>
            )}
            
            {currentQuestion < surveyQuestions.length - 1 ? (
              <button
                onClick={goToNextQuestion}
                className={`py-2 px-4 rounded-lg transition-colors ${
                  isAnswerSelected 
                    ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
                disabled={!isAnswerSelected}
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className={`py-2 px-4 rounded-lg transition-colors ${
                  isAnswerSelected && !isSubmitting
                    ? 'bg-blue-500 hover:bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
                disabled={!isAnswerSelected || isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            )}
          </div>

          <div className="mt-8">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${((currentQuestion + 1) / surveyQuestions.length) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Survey;
