import { AnimatePresence, motion } from 'framer-motion';
import { FC, useState } from 'react';
import { surveyQuestions } from '../constants/survey-questions';
import Loading from '../components/Loading';
import NotificationBox from '../components/NotificationBox';
import { sendSurveyAnswers } from '../services/axios';
import { useNavigate } from 'react-router-dom';

interface SurveyResponse {
  [key: string]: string | { main: string; q3_sub: string };
}

const Survey: FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [showSubQuestion, setShowSubQuestion] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const nav = useNavigate();
  const [notificationOpen, setNotificationOpen] = useState<boolean>(false);
  const [notificationMessage, setNotificationMessage] = useState<string>('');
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

  console.log(answers);

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

  const handleSubmit = async () => {
    // Connect the API endpoint for the survey submission
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.table(answers);
    window.dispatchEvent(new CustomEvent('surveySubmit', {
      detail: { responses: answers }
    }));
    try {
      const response = await sendSurveyAnswers(answers);

      if(response.status === 200) {
        nav('/');
        setNotificationMessage('Survey submitted successfully');
        setNotificationOpen(true);

      }

      


    } catch(error:any) {
      const {data, status} = error.response;
      if(status === 400) {
        alert(data.error);
        setNotificationOpen(false);

      }
      

    }
    
    setIsSubmitting(false);
  };

  const currentQuestionData = surveyQuestions[currentQuestion];

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
    <>
      <div className="min-h-screen bg-spotlight py-24 px-4">
        <motion.div 
          className="max-w-6xl bg-black bg-opacity-5 mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          exit={{ opacity: 0 }}
        >
          <div className="bg-black bg-opacity-5 rounded-xl border border-gray-400 shadow-lg p-8">
            <div className="mb-8">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-br from-teal to-sky-600 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${((currentQuestion + 1) / surveyQuestions.length) * 100}%`,
                  }}
                />
              </div>
              <p className="mt-2 text-sm text-white text-right">
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
                        <h2 className="text-2xl font-semibold text-white mb-2">
                          {currentQuestionData.questionHeader}
                        </h2>
                      )}
                      <p className="text-lg text-white">
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
                            type="radio"
                            name={`question-${currentQuestion}`}
                            value={option}
                            checked={getCurrentAnswer() === option}
                            onChange={(e) => handleAnswerChange(e.target.value)}
                            className="mt-1 mr-3 bg-transparent"
                          />
                          <span className={getCurrentAnswer() === option ? "text-black" : "text-white"}>{option}</span>
                        </label>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="mb-8">
                      <h2 className="text-2xl font-semibold text-white mb-2">
                        Follow-Up Question
                      </h2>
                      <p className="text-lg text-white">
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
                            className="mt-1 mr-3 bg-transparent"
                          />
                          <span className={getCurrentAnswer(true) === option ? "text-black" : "text-white"}>{option}</span>
                        </label>
                      ))}
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 p-4 flex space-x-4">
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
              ? 'bg-sky-600 hover:bg-sky-700 text-white'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            disabled={!canProceed || isSubmitting}
          >
            {isSubmitting ? <Loading text='Submitting...' /> : 'Submit'}
          </button>
        )}
      </div>
      <NotificationBox
        isOpen={notificationOpen}
        message={notificationMessage}
        onClose={() => setNotificationOpen(false)}
      />
    </>
  );
};

export default Survey;