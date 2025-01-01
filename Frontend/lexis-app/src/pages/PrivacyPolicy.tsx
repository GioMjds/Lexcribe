const PrivacyPolicy = () => {
    return (
        <section className="bg-spotlight bg-cover bg-center bg-no-repeat min-h-screen dark:bg-gray-900">
            <div className="max-w-4xl mx-auto p-6 text-white">
                <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-3">Introduction</h2>
                    <p className="mb-4">
                        Welcome to Lexcribe, an AI chatbot designed for law students. This Privacy Policy explains how we collect, use, and protect your personal information when you use our service.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-3">Information We Collect</h2>
                    <ul className="list-disc pl-6 mb-4">
                        <li>User-provided information during registration (name, email, academic institution)</li>
                        <li>Chat history and interactions with the AI chatbot</li>
                        <li>Usage data and analytics</li>
                        <li>Technical information about your device and browser</li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-3">How We Use Your Information</h2>
                    <ul className="list-disc pl-6 mb-4">
                        <li>To provide and improve our AI chatbot services</li>
                        <li>To personalize your learning experience</li>
                        <li>To analyze usage patterns and improve our system</li>
                        <li>To communicate important updates and changes</li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-3">Data Protection</h2>
                    <p className="mb-4">
                        We implement appropriate security measures to protect your personal information. Your chat history and personal data are encrypted and stored securely. We do not share your personal information with third parties without your consent.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-3">Your Rights</h2>
                    <p className="mb-4">
                        You have the right to:
                    </p>
                    <ul className="list-disc pl-6 mb-4">
                        <li>Access your personal data</li>
                        <li>Request corrections to your data</li>
                        <li>Delete your account and associated data</li>
                        <li>Export your chat history</li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-3">Contact Us</h2>
                    <p className="mb-4">
                        If you have any questions about this Privacy Policy, please contact us at:
                        <br />
                        Email: privacy@lexcribe.com
                    </p>
                </section>

                <footer className="text-sm text-white">
                    Last updated: 12/31/2024
                </footer>
            </div>
        </section>
    );
};

export default PrivacyPolicy;
