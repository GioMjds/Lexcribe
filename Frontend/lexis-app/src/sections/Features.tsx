import { motion } from "framer-motion"

const featuresList = [
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
]

const Features = () => {
    return (
        <section className="bg-light dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
                <div className="max-ws-screen-md mb-8 lg:mb-16">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Main Features</h2>
                </div>
                <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
                    {featuresList.map((feature) => (
                        <motion.div 
                            key={feature.id} 
                            className="p-6 border border-gray-400 rounded-xl shadow-md dark:bg-gray-800 dark:border-gray-700"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-light-medium lg:h-12 lg:w-12">
                                <i className={`${feature.icon} text-lg lg:w-6 lg:h-6`}></i>
                            </div>
                            <h3 className="mb-2 text-xl font-bold dark:text-white">{feature.title}</h3>
                            <p className="text-gray-500 dark:text-gray-400">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Features