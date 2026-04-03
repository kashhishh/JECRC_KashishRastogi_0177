import React, { createContext, useState, useContext, useEffect } from 'react';

const EmployeeContext = createContext();

export const useEmployees = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error('useEmployees must be used within EmployeeProvider');
  }
  return context;
};

// Initial mock data
const initialEmployees = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@company.com',
    role: 'admin',
    department: 'IT',
    position: 'System Administrator',
    joinDate: '2023-01-15'
  },
  {
    id: 2,
    name: 'John Doe',
    email: 'employee@company.com',
    role: 'employee',
    department: 'Marketing',
    position: 'Marketing Specialist',
    joinDate: '2023-06-20'
  },
  {
    id: 3,
    name: 'Jane Smith',
    email: 'jane.smith@company.com',
    role: 'employee',
    department: 'Sales',
    position: 'Sales Representative',
    joinDate: '2024-01-10'
  }
];

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState(() => {
    const stored = localStorage.getItem('employees');
    return stored ? JSON.parse(stored) : initialEmployees;
  });
  const [loading, setLoading] = useState(false);

  // Save to localStorage whenever employees change
  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]);

  const addEmployee = (employeeData) => {
    setLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        const newEmployee = {
          ...employeeData,
          id: Date.now(),
        };
        setEmployees([...employees, newEmployee]);
        setLoading(false);
        resolve(newEmployee);
      }, 800);
    });
  };

  const updateEmployee = (id, updatedData) => {
    setLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        const updatedEmployees = employees.map(emp =>
          emp.id === id ? { ...emp, ...updatedData } : emp
        );
        setEmployees(updatedEmployees);
        setLoading(false);
        resolve(updatedData);
      }, 800);
    });
  };

  const deleteEmployee = (id) => {
    setLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        const filteredEmployees = employees.filter(emp => emp.id !== id);
        setEmployees(filteredEmployees);
        setLoading(false);
        resolve();
      }, 800);
    });
  };

  const getEmployeeById = (id) => {
    return employees.find(emp => emp.id === id);
  };

  return (
    <EmployeeContext.Provider value={{
      employees,
      addEmployee,
      updateEmployee,
      deleteEmployee,
      getEmployeeById,
      loading
    }}>
      {children}
    </EmployeeContext.Provider>
  );
};