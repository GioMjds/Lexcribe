import { FC, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { surveyQuestions } from '../constants/survey-questions';

const Survey: FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showSubQuestion, setShowSubQuestion] = useState(false);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  console.log(answers);

  const handleAnswerChange = (value: string, isSubQuestion = false) => {
    const questionKey = `q${currentQuestion + 1}${isSubQuestion ? '_sub' : ''}`;
    setAnswers(prev => ({
      ...prev,
      [questionKey]: value
    }));
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
      // Clear sub-question answer when going back
      const subQuestionKey = `q${currentQuestion + 1}_sub`;
      const updatedAnswers = { ...answers };
      delete updatedAnswers[subQuestionKey];
      setAnswers(updatedAnswers);
      return;
    }

    if (currentQuestion > 0) {
      // Clear current and previous question answers
      const updatedAnswers = { ...answers };
      delete updatedAnswers[`q${currentQuestion + 1}`];
      delete updatedAnswers[`q${currentQuestion + 1}_sub`];
      delete updatedAnswers[`q${currentQuestion}`];
      delete updatedAnswers[`q${currentQuestion}_sub`];
      setAnswers(updatedAnswers);
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    // Implement and connect the API endpoint for the survey submission here
    setIsSubmitting(true);
    const responsePayload = surveyQuestions.reduce((acc, question) => {
      acc[question.id] = {
        main: answers[`q${question.id}`] || null,
        sub: question.subQuestion ? answers[`q${question.id}_sub`] || null : null
      };
      return acc;
    }, {} as Record<number, { main: string | null; sub: string | null }>);

    console.log('Final survey responses:', responsePayload);

    window.dispatchEvent(new CustomEvent('surveySubmit', {
      detail: { responses: responsePayload }
    }));

    setIsSubmitting(false);
  };

  const currentQuestionData = surveyQuestions[currentQuestion];
  const selectedAnswer = answers[`q${currentQuestion + 1}`];
  const selectedSubAnswer = answers[`q${currentQuestion + 1}_sub`];
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
              {/* Question content */}
              {!showSubQuestion ? (
                <>
                  {/* Main question header */}
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

                  {/* Main question options */}
                  <div className="space-y-3">
                    {currentQuestionData.options?.map((option, index) => (
                      <label
                        key={index}
                        className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          selectedAnswer === option 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 hover:border-blue-200'
                        }`}
                      >
                        <input
                          type={currentQuestionData.type}
                          name={`question-${currentQuestion}`}
                          value={option}
                          checked={selectedAnswer === option}
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
                  {/* Sub-question content */}
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
                        className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          selectedSubAnswer === option 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 hover:border-blue-200'
                        }`}
                      >
                        <input
                          type={currentQuestionData.subQuestion?.type}
                          name={`question-${currentQuestion}-sub`}
                          value={option}
                          checked={selectedSubAnswer === option}
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

          {/* Navigation buttons */}
          <div className="mt-8 flex justify-between items-center">
            <button
              onClick={goToPreviousQuestion}
              className={`px-6 py-2 rounded-lg transition-colors ${
                currentQuestion > 0 || showSubQuestion
                  ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  : 'invisible'
              }`}
              disabled={currentQuestion === 0 && !showSubQuestion}
            >
              Back
            </button>
            
            {currentQuestion < surveyQuestions.length - 1 || showSubQuestion ? (
              <button
                onClick={goToNextQuestion}
                className={`px-6 py-2 rounded-lg transition-colors ${
                  canProceed 
                    ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
                disabled={!canProceed}
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className={`px-6 py-2 rounded-lg transition-colors ${
                  canProceed && !isSubmitting
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