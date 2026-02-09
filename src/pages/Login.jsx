import { LoginLayout } from "../layouts/LoginLayout"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { signInWithEmail, signInWithGoogle } from "../services/auth/auth.service"

export const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await signInWithEmail(email, password);
            navigate("/"); // Redirect ke home setelah berhasil login
        } catch (err) {
            setError(err.message || "Failed to sign in");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setError("");
        setLoading(true);

        try {
            await signInWithGoogle();
            // Redirect akan dilakukan otomatis oleh Supabase
        } catch (err) {
            setError(err.message || "Failed to sign in with Google");
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
                    <h2 className="text-3xl font-semibold mb-3">Sign in</h2>
                    <p className="text-gray-400">to continue to your account</p>
                </div>

                {error && (
                    <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleEmailLogin}>
                    <div className="flex flex-col gap-4 mt-6">
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email"
                            autoComplete="email"
                            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={loading}
                        />
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                            autoComplete="current-password"
                            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={loading}
                        />
                        <div className="flex justify-between items-center px-1">
                            <div>
                                <input type="checkbox" name="remember" id="remember" className="mr-2" />
                                <label htmlFor="remember" className="text-sm">Keep me sign in</label>
                            </div>
                            <a href="#" className="text-sm font-bold text-red-500 hover:underline">FORGOT PASSWORD?</a>
                        </div>
                        <button
                            type="submit"
                            className="bg-red-500 text-white rounded-lg p-3 hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={loading}
                        >
                            {loading ? "Signing in..." : "Sign In"}
                        </button>
                    </div>
                </form>
                <p className="mt-6 text-center text-sm">Don't have an account? <Link to="/signup" className="font-bold text-red-500 hover:underline">Sign Up</Link></p>
            </div>
        </LoginLayout>
    )
}
