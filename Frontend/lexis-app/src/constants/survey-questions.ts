type SurveyQuestion = {
  id: number;
  question: string;
  type: "radio";
  options?: string[];
};

export const surveyQuestions: SurveyQuestion[] = [
  {
    id: 1,
    question: "What area of law are you most interested in?",
    type: "radio",
    options: [
      "Corporate Law",
      "Criminal Law",
      "Family Law",
      "Constitutional Law",
      "Other",
    ],
  },
  {
    id: 2,
    question: "How many years of law school have you completed?",
    type: "radio",
    options: ["1st Year", "2nd Year", "3rd Year", "4th Year", "Graduate"],
  },
  {
    id: 3,
    question: "What is your primary goal in using this AI chatbot?",
    type: "radio",
    options: [
      "Exam Preparation",
      "Case Understanding",
      "Legal Research",
      "Practice Questions",
      "General Knowledge",
    ],
  },
  {
    id: 4,
    question: "How comfortable are you with legal research?",
    type: "radio",
    options: [
      "Very Comfortable",
      "Comfortable",
      "Neutral",
      "Uncomfortable",
      "Very Uncomfortable",
    ],
  },
  {
    id: 5,
    question: "Which learning style do you prefer?",
    type: "radio",
    options: [
      "Visual",
      "Reading/Writing",
      "Interactive",
      "Practical Examples",
      "Mixed Approach",
    ],
  },
  {
    id: 6,
    question: "How often do you plan to use this chatbot?",
    type: "radio",
    options: ["Daily", "Few times a week", "Weekly", "Monthly", "As needed"],
  },
  {
    id: 7,
    question: "What specific features would you find most helpful?",
    type: "radio",
    options: [
      "Case Summaries",
      "Practice Questions",
      "Legal Definitions",
      "Document Analysis",
      "Study Planning",
    ],
  },
];
