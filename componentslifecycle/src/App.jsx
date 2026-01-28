import { Suspense, lazy, useState } from "react";
import NotificationPanel from "./Components/NotificationPanel";
import Employee from "./Components/Employee";
import Employee2 from "./Components/Employee2";


const Dashboard = lazy(() => {
  console.log("Importing Dashboard...");
  return import("./Components/Dashboard");
});

function App() {
  const [showDash, setShowDash] = useState(false);
  const [showNoti, setShowNoti] = useState(false);
  const [showEmp, setShowEmp] = useState(false);
  const [showEmp2, setShowEmp2] = useState(false);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Component Lifecycle Demo</h1>

      {/* ✅ Lazy Loading Dashboard */}
      <button onClick={() => setShowDash(!showDash)}>
        {showDash ? "Hide Dashboard" : "Load Dashboard"}
      </button>

      <br />
      <br />

      {showDash && (
        <Suspense fallback={<h2>Loading Dashboard...</h2>}>
          <Dashboard />
        </Suspense>
      )}

      <hr />

      {/* ✅ Notifications useEffect + cleanup */}
      <button onClick={() => setShowNoti(!showNoti)}>
        {showNoti ? "Hide Notifications" : "Show Notifications"}
      </button>

      <br />
      <br />

      {showNoti && <NotificationPanel />}

      <hr />

      {/* ✅ Employee Class Component mount/unmount */}
      <button onClick={() => setShowEmp(!showEmp)}>
        {showEmp ? "Hide Employee (Class)" : "Show Employee (Class)"}
      </button>

      <br />
      <br />

      {showEmp && <Employee />}

      <hr />

      {/* ✅ Employee2 Functional Component mount/unmount */}
      <button onClick={() => setShowEmp2(!showEmp2)}>
        {showEmp2 ? "Hide Employee2 (Func)" : "Show Employee2 (Func)"}
      </button>

      <br />
      <br />

      {showEmp2 && <Employee2 />}
    </div>
  );
}

export default App;