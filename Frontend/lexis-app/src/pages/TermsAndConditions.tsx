import { terms } from "../constants/terms";

const TermsAndConditions = () => {
  return (
    <section className="bg-spotlight bg-cover bg-center bg-no-repeat min-h-screen dark:bg-gray-900">
      <div className="max-w-4xl mx-auto p-4 text-white">
        <h1 className="text-4xl font-bold text-center mb-8">{terms.title}</h1>
        {terms.sections.map((section, index) => (
          <div key={index}>
            <h2 className="text-xl font-semibold mb-3">{section.heading}</h2>
            <p className="mb-4">{section.content}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default TermsAndConditions