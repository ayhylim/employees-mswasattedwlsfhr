import React, {useEffect, useState} from "react";
import "../styles/Dashboard.css";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import axios from "axios";

interface DashboardData {
    msg: string;
    luckyNumber?: string | number;
    secret?: string | number;
}

const Dashboard: React.FC = () => {
    const [token, setToken] = useState<string>(localStorage.getItem("auth") || "");
    const [data, setData] = useState<DashboardData>({msg: ""});
    const navigate = useNavigate();

    const fetchLuckyNumber = async (): Promise<void> => {
        const axiosConfig = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        try {
            const response = await axios.get<{msg: string; secret: string | number}>(
                "https://hrd-loginsstm.onrender.com/api/v1/dashboard",
                axiosConfig
            );
            setData({msg: response.data.msg, luckyNumber: response.data.secret});
            localStorage.removeItem("auth");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.message);
            }
        }
    };

    useEffect(() => {
        if (token === "") {
            navigate("/login");
            toast.warn("Please login first to access dashboard");
        } else {
            fetchLuckyNumber();
        }
    }, [token, navigate]);

    return (
        <div className="dashboard-main">
            <p>{data.msg}! Do you want to Logout?</p>
            <Link to="/logout" className="logout-button">
                Logout
            </Link>
        </div>
    );
};

export default Dashboard;
