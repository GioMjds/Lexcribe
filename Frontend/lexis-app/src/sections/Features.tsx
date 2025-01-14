import { FC } from "react";
import { featuresList } from "../constants/Features";

const Features: FC = () => {
    return (
        <section className="dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
                <div className="max-ws-screen-md mb-8 lg:mb-16">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-light-high md:text-5xl lg:text-6xl dark:text-white">Main Features</h2>
                </div>
                <div
                    className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0"
                >
                    {featuresList.map(feature => (
                        <div
                            key={feature.id}
                            className="p-6 dark:bg-gray-800 dark:border-gray-700"
                        >
                            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-light-medium lg:h-12 lg:w-12">
                                <i className={`${feature.icon} text-lg lg:w-6 lg:h-6 text-center`}></i>
                            </div>
                            <h3 className="mb-2 text-light-medium text-xl font-bold dark:text-white">{feature.title}</h3>
                            <p className="text-light-medium dark:text-gray-400">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Features