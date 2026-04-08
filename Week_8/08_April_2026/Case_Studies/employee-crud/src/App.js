import React from "react";
import EmployeeList from "./app/features/employees/employeeList";
import EmployeeAdd from "./app/features/employees/employeeAdd";
import EmployeeEdit from "./app/features/employees/employeeEdit";
import { useState } from "react";
import store from "./app/store";


function App() {
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  
  return (
    <div className="App">
      <h1>Employee Management</h1>
      <EmployeeAdd />
      <EmployeeList onEdit={(employee) => setSelectedEmployee(employee)} />
      {selectedEmployee && (
        <EmployeeEdit 
          selectedEmployee={selectedEmployee} 
          clearEdit = {() => setSelectedEmployee(null)}
        />
        )}
    </div>
  );
}

export default App;