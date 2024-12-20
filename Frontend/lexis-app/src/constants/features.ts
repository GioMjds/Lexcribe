interface Feature {
    id: number;
    icon: string;
    title: string;
    description: string;
}

export const featuresList: Feature[] = [
    {
        id: 1,
        icon: "fas fa-book-open",
        title: "Legal Research Assistance",
        description: "Summarizes complex legal texts into concise explanations and identifies key legal principles and arguments.",
    },
    {
        id: 2,
        icon: "fas fa-clipboard-list",
        title: "Case Briefing and Analysis",
        description: "Analyzing cases and identifying relevant legal principles. Assisting in breaking down case briefs into their essential components (facts, issue, rule, analysis, conclusion)",
    },
    {
        id: 3,
        icon: "fas fa-quote-left",
        title: "Citation Generation and Formatting",
        description: "Automatically generating citations in various legal styles, and formatting legal documents according to specific style guides.",
    },
    {
        id: 4,
        icon: "fas fa-user-graduate",
        title: "Personalized Learning",
        description: "Adapting to the individual learning styles and preferences of each user. Whilst tailoring recommendations and content to the user's specific needs.",
    },
    {
        id: 5,
        icon: "fas fa-bell",
        title: "Real-Time Legal Updates",
        description: "Providing real-time updates on new laws, regulations, and court decisions and alerting users to significant legal developments.",
    },
    {
        id: 6,
        icon: "fas fa-balance-scale",
        title: "Ethical Considerations",
        description: "Informing users about the limitations of AI and the importance of human judgment in legal decision-making.",
    }
];