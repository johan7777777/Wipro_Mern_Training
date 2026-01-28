import React from "react";

function Employee(props) {

  const handlePromote = () => {
    alert(props.name + " is Promoted!");
  };

  return (
    <div className="employee-card">

      <h3>Name: {props.name}</h3>
      <p>Role: {props.role}</p>

      <button onClick={handlePromote}>
        Promote
      </button>

    </div>
  );
}

export default Employee;
