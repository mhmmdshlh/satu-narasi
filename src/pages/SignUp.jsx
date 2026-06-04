import { LoginLayout } from "../layouts/LoginLayout"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faEyeSlash, faCheck, faTimes, faSpinner } from "@fortawesome/free-solid-svg-icons"
import { signInWithEmail, signUpWithEmail, translateAuthError } from "../services/auth/auth.service"
import { checkUsernameAvailable } from "../services/profile/profile.service"
import { BackButton } from "../components/BackButton"

export const SignUp = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [fullName, setFullName] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [usernameStatus, setUsernameStatus] = useState(null);

    const handleUsernameChange = (e) => {
        const value = e.target.value.replace(/[^a-zA-Z0-9_.]/g, "");
        setUsername(value);
    };

    useEffect(() => {
        if (!username || username.length < 3) {
            setUsernameStatus(null);
            return;
        }

        if (username.length > 30 || /^[0-9]+$/.test(username) || !/^[a-zA-Z0-9_.]+$/.test(username) || /^[._]|[._]$/.test(username) || /([._])\1/.test(username)) {
            setUsernameStatus("invalid");
            return;
        }

        setUsernameStatus("checking");

        const timer = setTimeout(async () => {
            try {
                const available = await checkUsernameAvailable(username);
                setUsernameStatus(available ? "available" : "taken");
            } catch {
                setUsernameStatus(null);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [username]);

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
            setError("Username minimal 3 karakter.");
            setLoading(false);
            return;
        }

        if (username.length > 30) {
            setError("Username maksimal 30 karakter.");
            setLoading(false);
            return;
        }

        if (/^[0-9]+$/.test(username)) {
            setError("Username tidak boleh hanya berisi angka.");
            setLoading(false);
            return;
        }

        if (!/^[a-zA-Z0-9_.]+$/.test(username)) {
            setError("Username hanya boleh berisi huruf, angka, underscore, dan titik.");
            setLoading(false);
            return;
        }

        if (/^[._]|[._]$/.test(username)) {
            setError("Username tidak boleh diawali atau diakhiri dengan titik atau underscore.");
            setLoading(false);
            return;
        }

        if (/([._])\1/.test(username)) {
            setError("Username tidak boleh mengandung titik atau underscore berurutan.");
            setLoading(false);
            return;
        }

        if (usernameStatus === "taken") {
            setError("Username sudah digunakan. Silakan pilih username lain.");
            setLoading(false);
            return;
        }

        if (usernameStatus === "checking") {
            setError("Tunggu sebentar, username sedang dicek...");
            setLoading(false);
            return;
        }

        try {
            const data = await signUpWithEmail(email, password, {
                username: username,
                full_name: fullName
            });
            setSuccess(true);
            if (data.session) {
                await signInWithEmail(email, password);
                navigate("/");
            }
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
                        Account created successfully!
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
                        <div className="relative">
                            <input
                                type="text"
                                name="username"
                                id="username"
                                placeholder="Username (huruf, angka, underscore, titik)"
                                autoComplete="username"
                                className="w-full border border-gray-300 rounded-lg p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-red-500"
                                value={username}
                                onChange={handleUsernameChange}
                                required
                                disabled={loading || success}
                            />
                            {usernameStatus && (
                                <span className="absolute right-3 top-1/2 -translate-y-1/2">
                                    {usernameStatus === "checking" && (
                                        <FontAwesomeIcon icon={faSpinner} spin className="text-gray-500" />
                                    )}
                                    {usernameStatus === "available" && (
                                        <FontAwesomeIcon icon={faCheck} className="text-green-500" />
                                    )}
                                    {(usernameStatus === "taken" || usernameStatus === "invalid") && (
                                        <FontAwesomeIcon icon={faTimes} className="text-red-500" />
                                    )}
                                </span>
                            )}
                        </div>
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
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                id="password"
                                placeholder="Password (min. 6 characters)"
                                autoComplete="new-password"
                                className="w-full border border-gray-300 rounded-lg p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-red-500"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={loading || success}
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
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                id="confirmPassword"
                                placeholder="Confirm Password"
                                autoComplete="new-password"
                                className="w-full border border-gray-300 rounded-lg p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-red-500"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                disabled={loading || success}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
                                tabIndex={-1}
                            >
                                <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                            </button>
                        </div>
                        <button
                            type="submit"
                            className="bg-red-500 text-white rounded-lg p-3 hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={loading || success}
                        >
                            {loading ? "Creating account..." : "Sign Up"}
                        </button>
                    </div>
                </form>
                <p className="mt-6 text-center text-sm">Already have an account? <Link to="/login" className="font-bold text-red-500 hover:underline">Sign In</Link></p>
            </div>
        </LoginLayout>
    )
}
