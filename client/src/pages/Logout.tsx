import React, {useEffect} from "react";
import "../styles/Logout.css";
import {useNavigate} from "react-router-dom";
import {useAuth} from "./context/AuthContext"; // ✅ Import AuthContext

const Logout: React.FC = () => {
    const navigate = useNavigate();
    const {logout} = useAuth(); // ✅ Use AuthContext

    useEffect(() => {
        // ✅ FIXED: Use AuthContext logout instead of direct localStorage
        logout();

        const timer = setTimeout(() => {
            navigate("/login");
        }, 3000);

        return () => clearTimeout(timer);
    }, [logout, navigate]);

    return (
        <div className="logout-main">
            <h1>Logout Successful!</h1>
            <p>Redirecting to login page...</p>
        </div>
    );
};

export default Logout;
