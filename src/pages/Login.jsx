import { LoginLayout } from "../layouts/LoginLayout"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import { signInWithEmail, translateAuthError } from "../services/auth/auth.service"
import { BackButton } from "../components/BackButton"

export const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [remember, setRemember] = useState(true);

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await signInWithEmail(email, password, remember);
            navigate("/");
        } catch (err) {
            setError(translateAuthError(err));
        } finally {
            setLoading(false);
        }
    };

    return (
        <LoginLayout>
            <div className="relative w-100 p-7 py-10 rounded-2xl shadow-lg bg-[white] text-gray-600 z-10
            after:absolute after:top-0 after:bottom-0 after:-left-1 after:-right-1 after:border-x-3 after:rounded-2xl after:border-red-500 after:-z-20">
                <BackButton to="/" label="Back to Home" />
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
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                id="password"
                                placeholder="Password"
                                autoComplete="current-password"
                                className="w-full border border-gray-300 rounded-lg p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-red-500"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={loading}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
                                tabIndex={-1}
                            >
                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                            </button>
                        </div>
                        <div className="flex justify-between items-center px-1">
                            <div>
                                <input type="checkbox" name="remember" id="remember" className="mr-2" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
                                <label htmlFor="remember" className="text-sm">Keep me sign in</label>
                            </div>
                            {/* <a href="#" className="text-sm font-bold text-red-500 hover:underline">FORGOT PASSWORD?</a> */}
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
