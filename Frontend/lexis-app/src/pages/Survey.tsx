import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { surveyQuestions } from '../constants/survey-questions';

const Survey = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [selectedAnswer, setSelectedAnswer] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    // This may change to a different method of authentication
    const user = localStorage.getItem('user');
    // if (!user) navigate('/signup')
  }, [navigate]);

  const handleAnswerChange = (e: any) => {
    const { value, checked } = e.target;
    if (surveyQuestions[currentQuestion].type === 'checkbox') {
      setSelectedAnswer((prev: any) =>
        checked ? [...(prev || []), value] : prev.filter((v: string) => v !== value)
      );
    } else {
      setSelectedAnswer(value);
    }
  };
  
  const confirmAnswer = () => {
    if (selectedAnswer !== null) {
      setAnswers((prev) => ({
        ...prev,
        [`q${currentQuestion + 1}`]: selectedAnswer,
      }));
      setSelectedAnswer(null);
      if (currentQuestion < surveyQuestions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
      }
    } else console.warn(`No answer selected for question ${currentQuestion + 1}`);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const responsePayload = surveyQuestions.reduce((acc, question, index) => {
      const answerKey = `q${index + 1}`;
      acc[question.id] = answers[answerKey] || null;
      return acc;
    }, {} as { [key: string]: any });

    try {
      // This might change depending on the API handling
      // You can replace this with the API endpoint for user survey submission
      const userId = JSON.parse(localStorage.getItem('user') || '{}' as any).id;
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/survey`, {
        user_id: userId,
        responses: responsePayload, // Use "responses" as the key
      });
      console.log(`Payload: ${{ user_id: userId, responses: responsePayload }}`);
      if (response.status === 200) {
        console.log(`Survey submitted successfully! ${responsePayload}`);
        navigate('/');
      }
    } catch (error) {
      console.error(`Error submitting survey: ${error}`);
    }
    console.log(responsePayload);
    setIsSubmitting(false);
  };

  const currentQuestionData = surveyQuestions[currentQuestion];

  return (
    <div className="min-h-screen bg-spotlight py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-lg shadow-xl p-8"
        >
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
                className="py-2 px-4 bg-blue-500 text-white rounded-lg"
                disabled={!selectedAnswer}
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="py-2 px-4 bg-green-500 text-white rounded-lg"
                disabled={!selectedAnswer || isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            )}
          </div>

          <div className="mt-8">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className="bg-blue-600 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{
                  width: `${((currentQuestion + 1) / surveyQuestions.length) * 100}%`,
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Survey;