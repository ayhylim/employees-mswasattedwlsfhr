import React, {useEffect, useState, FormEvent} from "react";
import {FaEye, FaEyeSlash} from "react-icons/fa6";
import "../styles/Login.css";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";
import {useAuth} from "./context/AuthContext"; // ✅ Import AuthContext

interface LoginFormData {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const {isAuthenticated, login} = useAuth(); 

    // ✅ FIXED: Redirect if already logged in
    useEffect(() => {
        if (isAuthenticated) {
            toast.success("You are already logged in");
            navigate("/dashboard");
        }
    }, [isAuthenticated, navigate]);

    const handleLoginSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setIsLoading(true);

        const form = e.currentTarget;
        const email = (form.elements.namedItem("email") as HTMLInputElement).value;
        const password = (form.elements.namedItem("password") as HTMLInputElement).value;

        if (email.length > 0 && password.length > 0) {
            const formData: LoginFormData = {
                email,
                password
            };
            try {
                const response = await axios.post("https://hrd-loginsstm.onrender.com/api/v1/login", formData);

                // ✅ FIXED: Use AuthContext login instead of localStorage directly
                login(response.data.token);
                toast.success("Login successful");
                navigate("/dashboard");
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    console.log(err);
                    toast.error(err.response?.data?.msg || err.message || "Login failed");
                } else {
                    toast.error("An unexpected error occurred");
                }
            }
        } else {
            toast.error("Please fill all inputs");
        }

        setIsLoading(false);
    };

    return (
        <div className="login-main">
            <div className="login-left">
                <div className="" style={{border: "2px solid", borderRadius: "10px", padding: "0.5rem"}}>
                    <div className="" style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <h3
                            style={{
                                fontFamily: "anton",
                                fontSize: "1.8rem",
                                fontWeight: "bolder",
                                fontStyle: "italic"
                            }}
                        >
                            www.tyotechmandiri.com
                        </h3>
                    </div>
                    <h5 style={{fontFamily: "calibri"}}>WELDING SPECIALIST AND WELDING EQUIPMENT SUPPLY</h5>
                </div>
            </div>
            <div className="login-right">
                <div className="login-right-container">
                    <div className="login-logo"></div>
                    <div className="login-center">
                        <h2>Welcome back!</h2>
                        <p>Please enter your details</p>
                        <form onSubmit={handleLoginSubmit}>
                            <input type="email" placeholder="Email" name="email" required disabled={isLoading} />
                            <div className="pass-input-div">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    name="password"
                                    required
                                    disabled={isLoading}
                                />
                                {showPassword ? (
                                    <FaEyeSlash
                                        onClick={() => {
                                            setShowPassword(!showPassword);
                                        }}
                                        style={{pointerEvents: isLoading ? "none" : "auto"}}
                                    />
                                ) : (
                                    <FaEye
                                        onClick={() => {
                                            setShowPassword(!showPassword);
                                        }}
                                        style={{pointerEvents: isLoading ? "none" : "auto"}}
                                    />
                                )}
                            </div>

                            <div className="login-center-options"></div>
                            <div className="login-center-buttons">
                                <button type="submit" disabled={isLoading}>
                                    {isLoading ? "Logging in..." : "Log In"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
