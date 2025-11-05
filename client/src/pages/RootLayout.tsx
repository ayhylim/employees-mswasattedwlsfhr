import React from "react";
import {Outlet} from "react-router-dom";

const RootLayout: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Optional: Add Header/Navbar here */}
            {/* <Header /> */}

            {/* Main Content - This renders child routes */}
            <main className="flex-1">
                <Outlet />
            </main>

            {/* Optional: Add Footer here */}
            {/* <Footer /> */}
        </div>
    );
};

export default RootLayout;
