import React from "react";
import {Outlet} from "react-router-dom";

const HomeLayout: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Optional: Add Navigation here untuk public routes */}
            {/* <PublicNavbar /> */}

            {/* Main Content - Renders Login, Register, Landing, Logout */}
            <main className="flex-1">
                <Outlet />
            </main>

            {/* Optional: Add Footer here */}
            {/* <Footer /> */}
        </div>
    );
};

export default HomeLayout;
