import {useState, useEffect} from "react";
import {Employee} from "@/types/employee";
import {EmployeeList} from "@/components/EmployeeList";
import {employeeAPI} from "@/lib/api";
import {useNavigate} from "react-router-dom";
import {toast} from "@/hooks/use-toast";

const Index = () => {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await employeeAPI.getAll();
            setEmployees(response.data);
        } catch (error) {
            console.error("Failed to fetch employees:", error);
            toast({
                title: "Error",
                description: "Failed to load employees. Please make sure the API server is running.",
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    };

    const handleAddEmployee = () => {
        navigate("/employee/new");
    };

    const handleDeleteEmployee = async (id: string) => {
        try {
            await employeeAPI.delete(id);
            toast({
                title: "Success",
                description: "Employee deleted successfully."
            });
            // ✅ FIXED: Refresh employee list after delete
            fetchEmployees();
        } catch (error) {
            console.error("Failed to delete employee:", error);
            toast({
                title: "Error",
                description: "Failed to delete employee.",
                variant: "destructive"
            });
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Loading employees...</p>
                </div>
            </div>
        );
    }

    return (
        <EmployeeList employees={employees} onAddEmployee={handleAddEmployee} onDeleteEmployee={handleDeleteEmployee} />
    );
};

export default Index;
