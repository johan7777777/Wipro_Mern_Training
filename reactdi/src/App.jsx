import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { EmployeeService } from './services/EmployeeService'
import EmployeeList from "./components/EmployeeList"
import { ServiceContext } from './context/servicecontext'
function App() {
  const [count, setCount] = useState(0)
  return (
    <>
      <div>
        {/* <EmployeeList service={EmployeeService}/> */}
        <ServiceContext.Provider value={EmployeeService}>
          <EmployeeList/>
        </ServiceContext.Provider>
       </div>
    </>
  )
}
export default App