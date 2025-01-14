type SubQuestion = {
  question: string;
  type: "radio";
  options: string[];
};

type SurveyQuestion = {
  id: number;
  questionHeader: string;
  question: string;
  type: "radio";
  options?: string[];
  subQuestion?: SubQuestion;
};

export const surveyQuestions: SurveyQuestion[] = [
  {
    id: 1,
    questionHeader: "Learning Style Assessment",
    question: "How do you prefer to learn new legal concepts?",
    type: "radio",
    options: [
      "Through Practical Case Studies",
      "Through Theoretical Explanations",
      "Through Visual Diagrams and Flowcharts",
      "Through Question-And-Answer Format",
    ],
  },
  {
    id: 2,
    questionHeader: "Explanation Preferences",
    question: "For complex legal concepts, what helps you understand best?",
    type: "radio",
    options: [
      "Real-world Analogies (comparing to everyday situations)", 
      "Step-by-step Breakdowns", 
      "Historical Context and Development", 
      "Practical Applications", 
      "Comparative Analysis with Similar Concepts",
    ],
  },
  {
    id: 3,
    questionHeader: "Content Complexity Preferences",
    question: "How would you like legal concepts explained?",
    type: "radio",
    options: [
      "Basic explanations first, then detailed analysis",
      "Straight to complex analysis",
      "Mix of both depending on the topic",
    ],
    subQuestion: {
      question: "Do you prefer explanations with:",
      type: "radio",
      options: [
        "More theoretical frameworks",
        "Q & A sessions",
        "Real-world scenarios",
        "Case Studies",
        "Role-playing exercises",
        "Mock court sessions",
      ]
    },
  },
  {
    id: 4,
    questionHeader: "Content Structure Preference",
    question: "How would you like information organized?",
    type: "radio",
    options: [
      "Building blocks (fundamentals first)",
      "Top-down (overview then details)",
      "Problem-based (start with an issue, then explore solutions)",
      "Case-based (learn through actual cases)",
    ],
  },
  {
    id: 5,
    questionHeader: "Language Preferences",
    question: "Preferred language for explanations:",
    type: "radio",
    options: [
      "Pure English",
      "Mix of English and Filipino",
      "With Latin legal terms",
      "Simplified language",
    ],
  },
  {
    id: 6,
    questionHeader: "Interaction Style",
    question: "How would you like the AI to interact with you?",
    type: "radio",
    options: [
      "Formal and Professional", 
      "Casual but Informative",
      "Socratic Method (questioning approach)", 
      "Direct and Concise",
    ],
  },
  {
    id: 7,
    questionHeader: "Practice Preferences",
    question: "What types of practice exercises do you prefer?",
    type: "radio",
    options: [
      "Multiple Choice Questions",
      "Essay Questions",
      "Case Analyses",
      "Legal Problem-Solving Scenarios",
    ],
  },
  {
    id: 8,
    questionHeader: "Support Level Needed",
    question: "How much guidance do you prefer?",
    type: "radio",
    options: [
      "Step-by-step explanations",
      "Brief overviews with option to dig deeper",
      "Challenged-Based Learning",
      "Mixed Approach",
    ],
  },
  {
    id: 9,
    questionHeader: "Memory & Retention Style",
    question: "How do you best memorize legal concepts?",
    type: "radio",
    options: [
      "Through Mnemonics and Acronyms",
      "Through analogies and stories",
      "Through practical examples",
      "Through repeated practice",
      "Through teaching others",
    ],
  },
  {
    id: 10,
    questionHeader: "Review and Reinforcement",
    question: "What helps you reinforce your learning?",
    type: "radio",
    options: [
      "Quick quizzes",
      "Summarization exercises",
      "Teaching/explaining to others",
      "Practical applications",
      "Writing assignments",
    ],
  },
];
