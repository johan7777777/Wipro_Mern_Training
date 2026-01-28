import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AnimatedRoutes from './components/AnimatedRoutes'
import {Link} from 'react-router-dom'
import Login from './pages/Login'
import EmployeeForm from './forms/EmployeeForm'


import {ProtectedAdminPage , ProtectedCoursesPage,ProtectedEmployeePage} from '../src/Pages/ProtectedPages'

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
      



       <nav>
        <Link to="/">Home</Link> { " | "}
        <Link to="/employees">Employees</Link>{ " | "}
        <Link to="/courses">Courses</Link>{ " | "}
        <Link to="/admin">Admin</Link>{ " | "}
       </nav>
       <AnimatedRoutes/>
            
        <Login/>
        <ProtectedEmployeePage/>
        <ProtectedAdminPage/>
        <ProtectedCoursesPage />
        <EmployeeForm/>
      
    </>
  )
}
export default App