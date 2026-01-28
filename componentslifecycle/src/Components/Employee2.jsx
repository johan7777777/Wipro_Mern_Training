import { useEffect } from "react";

function Employee2() {
  useEffect(() => {
    console.log("Mounted");

    return () => {
      console.log("Unmounted");
    };
  }, []);

  return (
    <div>
      <h3>Employee2 Component rendered</h3>
    </div>
  );
}

export default Employee2;