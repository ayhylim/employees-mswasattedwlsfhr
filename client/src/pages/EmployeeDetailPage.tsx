import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Employee } from '@/types/employee';
import { EmployeeDetail } from '@/components/EmployeeDetail';
import { employeeAPI } from '@/lib/api';
import { toast } from '@/hooks/use-toast';

const EmployeeDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmployee();
  }, [id]);

  const fetchEmployee = async () => {
    if (!id) return;

    try {
      const response = await employeeAPI.getById(id);
      setEmployee(response.data);
    } catch (error) {
      console.error('Failed to fetch employee:', error);
      toast({
        title: "Error",
        description: "Failed to load employee data.",
        variant: "destructive",
      });
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!id) return;

    try {
      await employeeAPI.delete(id);
      toast({
        title: "Success",
        description: "Employee deleted successfully.",
      });
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to delete employee:', error);
      toast({
        title: "Error",
        description: "Failed to delete employee.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading employee details...</p>
        </div>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Employee Not Found</h2>
          <p className="text-muted-foreground">The employee you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return <EmployeeDetail employee={employee} onDelete={handleDelete} />;
};

export default EmployeeDetailPage;
