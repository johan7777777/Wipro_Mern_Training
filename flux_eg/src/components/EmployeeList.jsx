import { useEffect, useState } from "react";
import employeeStore from "../stores/EmployeeStore";
import { addEmployee, removeEmployee } from "../actions/EmployeeActions";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    setEmployees(employeeStore.getAllEmployees());

    const updateUI = () => {
      setEmployees([...employeeStore.getAllEmployees()]);
    };

    employeeStore.addChangeListener(updateUI);

    return () => {
      employeeStore.removeChangeListener(updateUI);
    };
  }, []);

  return (
    <div>
      <h2>Employee List</h2>

      <button onClick={() => addEmployee("Niti")}>
        Add Employee
      </button>

      {employees.map((emp, index) => (
        <div key={index} style={{ display: "flex", gap: "10px" }}>
          <span>{emp}</span>
          <button onClick={() => removeEmployee(index)}>
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

export default EmployeeList;cd 