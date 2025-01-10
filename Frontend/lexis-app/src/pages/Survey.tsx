import { useState, useEffect, FC } from 'react';
import { surveyQuestions } from '../constants/survey-questions';

const Survey: FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string | string[] }>({});
  const [selectedAnswer, setSelectedAnswer] = useState<string | string[] | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  console.log(answers);

  useEffect(() => {
    const existingAnswer = answers[`q${currentQuestion + 1}`];
    const questionType = surveyQuestions[currentQuestion].type;
    setSelectedAnswer(existingAnswer || (questionType === 'checkbox' ? [] : null));
  }, [currentQuestion, answers]);

  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    if (surveyQuestions[currentQuestion].type === 'checkbox') {
      setSelectedAnswer((prev) => {
        const prevArray = Array.isArray(prev) ? prev : [];
        return checked
          ? [...prevArray, value]
          : prevArray.filter((v) => v !== value);
      });
    } else {
      setSelectedAnswer(value);
    }
  };

  const confirmAnswer = () => {
    const questionType = surveyQuestions[currentQuestion].type;
    const isValidAnswer = selectedAnswer !== null && (
      (questionType === 'checkbox' && Array.isArray(selectedAnswer) && selectedAnswer.length > 0) ||
      (questionType !== 'checkbox' && typeof selectedAnswer === 'string')
    );

    if (isValidAnswer) {
      setAnswers((prev) => ({
        ...prev,
        [`q${currentQuestion + 1}`]: selectedAnswer,
      }));
      setSelectedAnswer(null);
      if (currentQuestion < surveyQuestions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
        setSelectedAnswer(null);
      }
    } else {
      console.warn(`No valid answer selected for question ${currentQuestion + 1}`);
    }
  };

  // Handle the submission for 7 answers in the survey, must be connected to an API endpoint
  const handleSubmit = () => {
    setIsSubmitting(true);

    const responsePayload = surveyQuestions.reduce((acc, question, index) => {
      const answerKey = `q${index + 1}`;
      const answer = answers[answerKey];

      acc[question.id] = question.type === 'checkbox' && Array.isArray(answer)
        ? answer
        : answer || null;

      return acc;
    }, {} as { [key: string]: any });

    console.log('Final survey responses:', responsePayload);

    const event = new CustomEvent('surveySubmit', {
      detail: { responses: responsePayload },
    });
    window.dispatchEvent(event);

    setIsSubmitting(false);
  };

  const currentQuestionData = surveyQuestions[currentQuestion];
  const isAnswerSelected = selectedAnswer !== null && (
    (currentQuestionData.type === 'checkbox' && Array.isArray(selectedAnswer) && selectedAnswer.length > 0) ||
    (currentQuestionData.type !== 'checkbox' && typeof selectedAnswer === 'string')
  );

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
          <form className="space-y-4">
            {currentQuestionData.type === 'radio' &&
              currentQuestionData.options?.map((option, index) => (
                <label
                  key={index}
                  className="block p-4 border rounded-lg hover:border-blue-500 cursor-pointer"
                >
                  <input
                    type="radio"
                    name={`question-${currentQuestion}`}
                    value={option}
                    checked={selectedAnswer === option}
                    className="mr-2"
                    onChange={handleAnswerChange}
                  />
                  {option}
                </label>
              ))}

            {currentQuestionData.type === 'checkbox' &&
              currentQuestionData.options?.map((option, index) => (
                <label
                  key={index}
                  className="block p-4 border rounded-lg hover:border-blue-500 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    value={option}
                    checked={Array.isArray(selectedAnswer) && selectedAnswer.includes(option)}
                    className="mr-2"
                    onChange={handleAnswerChange}
                  />
                  {option}
                </label>
              ))}

            {currentQuestionData.type === 'text' && (
              <input
                type="text"
                className="w-full p-4 border rounded-lg"
                placeholder="Type your answer..."
                value={selectedAnswer as string || ''}
                onChange={(e) => setSelectedAnswer(e.target.value)}
              />
            )}
          </form>

          <div className="mt-6 flex justify-between">
            {currentQuestion > 0 && (
              <button
                onClick={() => setCurrentQuestion((prev) => prev - 1)}
                className="py-2 px-4 bg-gray-200 rounded-lg"
              >
                Back
              </button>
            )}
            {currentQuestion < surveyQuestions.length - 1 ? (
              <button
                onClick={confirmAnswer}
                className={`py-2 px-4 rounded-lg ${isAnswerSelected ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
                disabled={!isAnswerSelected}
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className={`py-2 px-4 rounded-lg ${isAnswerSelected ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
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
