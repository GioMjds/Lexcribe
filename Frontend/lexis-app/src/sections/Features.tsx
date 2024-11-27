
const Features = () => {
  return (
    <section className="bg-light dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <div className="max-ws-screen-md mb-8 lg:mb-16">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Main Features</h2>
        </div>
        <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
          <div>
            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-light-medium lg:h-12 lg:w-12">
              <i className="fas fa-book-open text-lg lg:w-6 lg:h-6"></i>
            </div>
            <h3 className="mb-2 text-xl font-bold dark:text-white">Legal Research Assistance</h3>
            <p className="text-gray-500 dark:text-gray-400">Summarizes complex legal texts into concise explanations and identifies key legal principles and arguments.</p>
          </div>

          <div>
            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-light-medium lg:h-12 lg:w-12">
              <i className="fas fa-clipboard-list text-lg lg:w-6 lg:h-6"></i>
            </div>
            <h3 className="mb-2 text-xl font-bold dark:text-white">Case Briefing and Analysis</h3>
            <p className="text-gray-500 dark:text-gray-400">Analyzing cases and identifying relevant legal principles. Assisting in breaking down case briefs into their essential components (facts, issue, rule, analysis, conclusion)</p>
          </div>

          <div>
            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-light-medium lg:h-12 lg:w-12">
              <i className="fas fa-quote-left text-lg lg:w-6 lg:h-6"></i>
            </div>
            <h3 className="mb-2 text-xl font-bold dark:text-white">Citation Generation and Formatting</h3>
            <p className="text-gray-500 dark:text-gray-400">Automatically generating citations in various legal styles, and formatting legal documents according to specific style guides.</p>
          </div>

          <div>
            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-light-medium lg:h-12 lg:w-12">
              <i className="fas fa-user-graduate text-lg lg:w-6 lg:h-6"></i>
            </div>
            <h3 className="mb-2 text-xl font-bold dark:text-white">Personalized Learning</h3>
            <p className="text-gray-500 dark:text-gray-400">Adapting to the individual learning styles and preferences of each user. Whilst tailoring recommendations and content to the user's specific needs.</p>
          </div>

          <div>
            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-light-medium lg:h-12 lg:w-12">
              <i className="fas fa-bell text-lg lg:w-6 lg:h-6"></i>
            </div>
            <h3 className="mb-2 text-xl font-bold dark:text-white">Real-Time Legal Updates</h3>
            <p className="text-gray-500 dark:text-gray-400">Providing real-time updates on new laws, regulations, and court decisions and alerting users to significant legal developments.</p>
          </div>

          <div>
            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-light-medium lg:h-12 lg:w-12">
              <i className="fas fa-balance-scale text-lg lg:w-6 lg:h-6"></i>
            </div>
            <h3 className="mb-2 text-xl font-bold dark:text-white">Ethical Considerations</h3>
            <p className="text-gray-500 dark:text-gray-400">Informing users about the limitations of AI and the importance of human judgment in legal decision-making.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features