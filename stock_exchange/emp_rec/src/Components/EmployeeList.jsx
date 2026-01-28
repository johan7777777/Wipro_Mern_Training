import React from "react";
import Employee from "./Employee";

function EmployeeList() {

  return (
    <div>

      <h2>Employee List</h2>

      <Employee 
        name="John"
        role="Frontend Developer"
      />

      <Employee 
        name="Sarah"
        role="Backend Developer"
      />

      <Employee 
        name="Mike"
        role="UI Designer"
      />

    </div>
  );
}

export default EmployeeList;
