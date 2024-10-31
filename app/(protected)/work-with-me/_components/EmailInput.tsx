interface EmailInputProps {
    email: string; // email is a string
    setEmail: (email: string) => void; // setEmail is a function that takes a string and returns void
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>; // handleSubmit is a function for form submission
    loading: boolean; // loading is a boolean
    ctaText?: string; // optional ctaText prop for button text with default value
}

const EmailInput: React.FC<EmailInputProps> = ({ email, setEmail, handleSubmit, loading, ctaText = "Get Started" }) => {
    return (
        <form onSubmit={handleSubmit} className="w-full bg-white rounded-lg p-6">
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                type="submit"
                className={`w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition ${loading ? 'cursor-not-allowed' : ''
                    }`}
                disabled={loading}
            >
                {loading ? (
                    <svg
                        className="animate-spin h-6 w-6 text-white mx-auto"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-100"
                            cx="12"
                            cy="12"
                            r="6"
                            stroke="currentColor"
                            strokeDasharray="28"
                            strokeLinecap="round"
                            strokeWidth="4"
                        ></circle>
                    </svg>
                ) : (
                    ctaText
                )}
            </button>
        </form>
    );
};

export default EmailInput;