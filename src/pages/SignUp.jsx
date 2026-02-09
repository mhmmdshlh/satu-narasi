import { LoginLayout } from "../layouts/LoginLayout"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { signUpWithEmail } from "../services/auth/auth.service"

export const SignUp = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [username, setUsername] = useState("");
    const [fullName, setFullName] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            setLoading(false);
            return;
        }

        if (!username || username.length < 3) {
            setError("Username must be at least 3 characters");
            setLoading(false);
            return;
        }

        try {
            await signUpWithEmail(email, password, {
                username: username,
                full_name: fullName
            });
            setSuccess(true);
            // Redirect setelah 2 detik
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (err) {
            setError(err.message || "Failed to sign up");
        } finally {
            setLoading(false);
        }
    };

    return (
        <LoginLayout>
            <div className="relative w-100 p-7 py-10 rounded-2xl shadow-lg bg-[white] text-gray-600 z-10
            after:absolute after:top-0 after:bottom-0 after:-left-1 after:-right-1 after:border-x-3 after:rounded-2xl after:border-red-500 after:-z-20">
                <Link to="/" className="inline-flex items-center gap-2 text-red-500 hover:text-red-500-dark transition mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium">Back to Home</span>
                </Link>
                <div className="text-center">
                    <h2 className="text-3xl font-semibold mb-3">Sign up</h2>
                    <p className="text-gray-400">create your account</p>
                </div>

                {error && (
                    <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm">
                        Account created successfully! Redirecting to login...
                    </div>
                )}

                <form onSubmit={handleSignUp}>
                    <div className="flex flex-col gap-4 mt-6">
                        <input type="text"
                            name="fullName"
                            id="fullName"
                            placeholder="Full Name"
                            autoComplete="name"
                            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                            disabled={loading || success}
                        />
                        <input
                            type="text"
                            name="username"
                            id="username"
                            placeholder="Username (min. 3 characters)"
                            autoComplete="username"
                            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            disabled={loading || success}
                        />
                        <input type="email"
                            name="email"
                            id="email"
                            placeholder="Email"
                            autoComplete="email"
                            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={loading || success}
                        />
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password (min. 6 characters)"
                            autoComplete="new-password"
                            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={loading || success}
                        />
                        <input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            placeholder="Confirm Password"
                            autoComplete="new-password"
                            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            disabled={loading || success}
                        />
                        <button
                            type="submit"
                            className="bg-red-500 text-white rounded-lg p-3 hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={loading || success}
                        >
                            {loading ? "Creating account..." : "Sign Up"}
                        </button>
                    </div>
                </form>
                {/* <div className="text-center text-xs/0.5 text-gray-400 my-7 w-full bg-gray-200 h-0.5 after:content-['OR'] after:bg-white after:px-2"></div>
                <button
                    type="button"
                    className="border border-gray-300 rounded-lg p-3 hover:bg-gray-100 transition w-full disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleGoogleSignUp}
                    disabled={loading || success}
                >
                    <svg viewBox="0 0 24 24" className="w-5 h-5 inline-block mx-3">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Continue with Google
                </button> */}
                <p className="mt-6 text-center text-sm">Already have an account? <Link to="/login" className="font-bold text-red-500 hover:underline">Sign In</Link></p>
            </div>
        </LoginLayout>
    )
}
