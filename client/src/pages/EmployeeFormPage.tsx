import {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {Employee} from "@/types/employee";
import {EmployeeForm} from "@/components/EmployeeForm";
import {employeeAPI} from "@/lib/api";
import {toast} from "@/hooks/use-toast";

const EmployeeFormPage = () => {
    const {id} = useParams<{id: string}>();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState<Employee | undefined>(undefined);
    const [loading, setLoading] = useState(!!id && id !== "new");

    useEffect(() => {
        if (id && id !== "new") {
            fetchEmployee();
        }
    }, [id]);

    const fetchEmployee = async () => {
        if (!id || id === "new") return;

        try {
            const response = await employeeAPI.getById(id);
            setEmployee(response.data);
        } catch (error) {
            console.error("Failed to fetch employee:", error);
            toast({
                title: "Error",
                description: "Failed to load employee data.",
                variant: "destructive"
            });
            navigate("/dashboard");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (employeeData: Omit<Employee, "id">) => {
        try {
            if (employee?.id) {
                // UPDATE existing employee
                await employeeAPI.update(employee.id, employeeData);
                toast({
                    title: "Success",
                    description: "Employee updated successfully."
                });
            } else {
                // CREATE new employee
                await employeeAPI.create(employeeData);
                toast({
                    title: "Success",
                    description: "Employee created successfully."
                });
            }
            navigate("/dashboard");
        } catch (error) {
            console.error("Failed to save employee:", error);
            // ✅ FIXED: Show error toast BEFORE throwing
            toast({
                title: "Error",
                description: "Failed to save employee data.",
                variant: "destructive"
            });
            // Don't re-throw, let user retry
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Loading...</p>
                </div>
            </div>
        );
    }

    return <EmployeeForm employee={employee} onSubmit={handleSubmit} />;
};

export default EmployeeFormPage;
