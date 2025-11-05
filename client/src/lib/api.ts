import axios from 'axios';
import { Employee } from '@/types/employee';

// Configure json-server endpoint
// To use: npm install -g json-server
// Then run: json-server --watch db.json --port 3001
const API_BASE_URL = 'https://employees-mngmntsstm.onrender.com/';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Employee API endpoints
export const employeeAPI = {
  getAll: () => api.get<Employee[]>('/employees'),
  getById: (id: string) => api.get<Employee>(`/employees/${id}`),
  create: (employee: Omit<Employee, 'id'>) => api.post<Employee>('/employees', employee),
  update: (id: string, employee: Partial<Employee>) => api.put<Employee>(`/employees/${id}`, employee),
  delete: (id: string) => api.delete(`/employees/${id}`),
};
