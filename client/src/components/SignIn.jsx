import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SignIn.css";

const SignIn = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);
        setButtonDisabled(true);

        try {
            const response = await axios.post("http://localhost:7100/user/login", formData);
            const { access_token, message } = response.data;

            setSuccess(message || "Login successful!");

            localStorage.setItem("token", access_token);

            setTimeout(() => {
                navigate("/home");
            }, 2000);
        } catch (err) {
            if (err.response) {
                setError(err.response.data.message || "Invalid credentials!");
            } else {
                setError("Unable to connect to the server.");
            }
        } finally {
            setLoading(false);
            setButtonDisabled(false);
        }
    };

    return (
        <div className="login-container">
            {/* Left side - Image */}
            <div className="left-side">
                <img src="https://cdni.iconscout.com/illustration/premium/thumb/sign-up-illustration-download-in-svg-png-gif-file-formats--log-register-form-user-interface-pack-design-development-illustrations-6430773.png" alt="Signup" className="login-image" />
            </div>

            {/* Right side - Form */}
            <div className="right-side">
                <h2>Welcome to Krist 👋</h2>
                <p>Please login with your details here</p>

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email address"
                    />
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                    />

                    {/* Show success or error messages */}
                    {error && <div className="error">{error}</div>}
                    {success && <div className="success">{success}</div>}

                    <button type="submit" disabled={buttonDisabled}>
                        {loading ? "Signing In..." : "Sign In"}
                    </button>
                </form>
                <div style={{ display: 'flex' }}>

                    <p>Create new account?</p>
                    <a href="/" style={{ padding:'15px'}}>
                        SignUp
                    </a>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
