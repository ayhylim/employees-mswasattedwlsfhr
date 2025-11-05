import {Toaster} from "@/components/ui/toaster";
import {Toaster as Sonner} from "@/components/ui/sonner";
import {TooltipProvider} from "@/components/ui/tooltip";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Navigate} from "react-router-dom";
// ✅ Direct imports dari file (lebih reliable)
import RootLayout from "./pages/RootLayout.tsx";
import HomeLayout from "./pages/HomeLayout.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import Logout from "./pages/Logout.tsx";
import Landing from "./pages/Landing.tsx";
import Index from "./pages/Index.tsx";
import EmployeeDetailPage from "./pages/EmployeeDetailPage.tsx";
import EmployeeFormPage from "./pages/EmployeeFormPage.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

// ✅ FIXED: Added proper TypeScript interface
interface ProtectedRouteProps {
    element: React.ReactElement;
}

// Protected Route Component
const ProtectedRoute = ({element}: ProtectedRouteProps) => {
    const token = localStorage.getItem("authToken");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return element;
};

function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                {/* PUBLIC ROUTES - Grouped with HomeLayout */}
                <Route element={<HomeLayout />}>
                    <Route index path="/" element={<Landing />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/logout" element={<Logout />} />
                </Route>

                {/* PROTECTED ROUTES - Single protection point at parent */}
                <Route element={<ProtectedRoute element={<RootLayout />} />}>
                    {/* Dashboard/Employee List */}
                    <Route path="/dashboard" element={<Index />} />
                    <Route path="/employees" element={<Index />} />

                    {/* Employee Detail */}
                    <Route path="/employee/:id" element={<EmployeeDetailPage />} />

                    {/* Employee Form - Create & Edit */}
                    <Route path="/employee/:id/edit" element={<EmployeeFormPage />} />
                    <Route path="/employee/new" element={<EmployeeFormPage />} />
                </Route>

                {/* CATCH ALL - 404 */}
                <Route path="*" element={<NotFound />} />
            </>
        )
    );

    return (
        <QueryClientProvider client={queryClient}>
            <TooltipProvider>
                <Toaster />
                <Sonner />
                <RouterProvider router={router} />
            </TooltipProvider>
        </QueryClientProvider>
    );
}

export default App;
