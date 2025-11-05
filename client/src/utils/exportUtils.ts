import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { Employee } from '@/types/employee';
import { calculateYearsOfService } from './bonusCalculator';

export const exportToPDF = (employees: Employee[]) => {
  const doc = new jsPDF();
  
  doc.setFontSize(18);
  doc.text('Employee List Report', 14, 22);
  doc.setFontSize(11);
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 30);

  const tableData = employees.map(emp => [
    emp.name,
    emp.nik,
    emp.position,
    emp.status,
    calculateYearsOfService(emp.joiningYear).toString(),
    emp.joiningYear.toString(),
    emp.department,
  ]);

  autoTable(doc, {
    head: [['Name', 'NIK', 'Position', 'Status', 'Years of Service', 'Joining Year', 'Department']],
    body: tableData,
    startY: 35,
    styles: { fontSize: 8 },
    headStyles: { fillColor: [37, 99, 235] },
  });

  doc.save(`employees-${new Date().toISOString().split('T')[0]}.pdf`);
};

export const exportToExcel = (employees: Employee[]) => {
  const worksheetData = employees.map(emp => ({
    'Name': emp.name,
    'NIK': emp.nik,
    'Position': emp.position,
    'Status': emp.status,
    'Years of Service': calculateYearsOfService(emp.joiningYear),
    'Joining Year': emp.joiningYear,
    'Date of Birth': emp.dateOfBirth,
    'Place of Birth': emp.placeOfBirth,
    'Religion': emp.religion,
    'Gender': emp.gender,
    'Department': emp.department,
    'Address': emp.address,
    'Phone Number': emp.phoneNumber,
    'Email': emp.email,
  }));

  const worksheet = XLSX.utils.json_to_sheet(worksheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Employees');

  // Auto-size columns
  const maxWidth = worksheetData.reduce((acc, row) => {
    Object.keys(row).forEach((key, i) => {
      const value = row[key as keyof typeof row]?.toString() || '';
      acc[i] = Math.max(acc[i] || 0, value.length, key.length);
    });
    return acc;
  }, [] as number[]);

  worksheet['!cols'] = maxWidth.map(w => ({ wch: Math.min(w + 2, 50) }));

  XLSX.writeFile(workbook, `employees-${new Date().toISOString().split('T')[0]}.xlsx`);
};
