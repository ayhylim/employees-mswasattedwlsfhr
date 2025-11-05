import React, {useEffect, useState, FormEvent, ChangeEvent} from "react";
import {FaEye, FaEyeSlash} from "react-icons/fa6";
import "../styles/Register.css";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";

interface RegisterFormData {
    username: string;
    email: string;
    password: string;
    role: string;
}

const Register: React.FC = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const navigate = useNavigate();
    const [token, setToken] = useState<string>(localStorage.getItem("auth") || "");

    const handleRegisterSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        const form = e.currentTarget;
        const name = (form.elements.namedItem("name") as HTMLInputElement).value;
        const lastname = (form.elements.namedItem("lastname") as HTMLInputElement).value;
        const email = (form.elements.namedItem("email") as HTMLInputElement).value;
        const password = (form.elements.namedItem("password") as HTMLInputElement).value;
        const confirmPassword = (form.elements.namedItem("confirmPassword") as HTMLInputElement).value;
        const role = (form.elements.namedItem("role") as HTMLSelectElement).value;

        if (
            name.length > 0 &&
            lastname.length > 0 &&
            email.length > 0 &&
            password.length > 0 &&
            confirmPassword.length > 0
        ) {
            if (password === confirmPassword) {
                const formData: RegisterFormData = {
                    username: name + " " + lastname,
                    email,
                    password,
                    role
                };
                try {
                    const response = await axios.post("https://hrd-loginsstm.onrender.com/api/v1/register", formData);
                    console.log("Form data yang dikirim:", formData);
                    toast.success("Registration successfull");
                    navigate("/login");
                } catch (err) {
                    if (axios.isAxiosError(err)) {
                        console.error("🔴 ERROR DETAIL:", err);
                        console.error("Error message:", err.message);
                        console.error("Error response:", err.response);
                        console.error("Error config:", err.config);
                        toast.error(err.message);
                    }
                }
            } else {
                toast.error("Passwords don't match");
            }
        } else {
            toast.error("Please fill all inputs");
        }
    };

    useEffect(() => {
        if (token !== "") {
            toast.success("You already logged in");
            navigate("/dashboard");
        }
    }, [token, navigate]);

    return (
        <div className="register-main">
            <div className="register-left">
                <div className="" style={{border: "2px solid", borderRadius: "10px", padding: "0.5rem"}}>
                    <div className="" style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <h3
                            style={{fontFamily: "anton", fontSize: "1.8rem", fontWeight: "bolder", fontStyle: "italic"}}
                        >
                            www.tyotechmandiri.com
                        </h3>
                    </div>
                    <h5 style={{fontFamily: "calibri"}}>WELDING SPECIALIST AND WELDING EQUIPMENT SUPPLY</h5>
                </div>
            </div>
            <div className="register-right">
                <div className="register-right-container">
                    <div className="register-logo"></div>
                    <div className="register-center">
                        <h2>Welcome to our website!</h2>
                        <p>Please enter your details</p>
                        <form onSubmit={handleRegisterSubmit}>
                            <input type="text" placeholder="Name" name="name" required={true} />
                            <input type="text" placeholder="Lastname" name="lastname" required={true} />
                            <input type="email" placeholder="Email" name="email" required={true} />
                            <div className="pass-input-div">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    name="password"
                                    required={true}
                                />
                                {showPassword ? (
                                    <FaEyeSlash
                                        onClick={() => {
                                            setShowPassword(!showPassword);
                                        }}
                                    />
                                ) : (
                                    <FaEye
                                        onClick={() => {
                                            setShowPassword(!showPassword);
                                        }}
                                    />
                                )}
                            </div>
                            <div className="pass-input-div">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Confirm Password"
                                    name="confirmPassword"
                                    required={true}
                                />
                                {showPassword ? (
                                    <FaEyeSlash
                                        onClick={() => {
                                            setShowPassword(!showPassword);
                                        }}
                                    />
                                ) : (
                                    <FaEye
                                        onClick={() => {
                                            setShowPassword(!showPassword);
                                        }}
                                    />
                                )}
                            </div>
                            <select name="role" className="role-input-div" required>
                                <option value="">Select Role</option>
                                <option value="purchasing">Purchasing</option>
                                <option value="warehouse">Warehouse</option>
                                <option value="marketing">Marketing</option>
                                <option value="developer">Developer</option>
                            </select>
                            <div className="register-center-buttons">
                                <button type="submit">Sign Up</button>
                            </div>
                        </form>
                    </div>

                    <p className="login-bottom-p">
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
