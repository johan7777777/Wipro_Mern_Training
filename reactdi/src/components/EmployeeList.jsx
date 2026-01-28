//Parent injects dependency into child via props

// function EmployeeList({service}){
//     const employees = service.fetchEmployees();
//   return(
//   <div>
//     <h3>Employees Prop DI</h3>
//     {employees.map((e)=> (<p key={e} >{e}</p>))}
//   </div>
//   )
// }
// export default EmployeeList
//Example using Context DI
// import {usecontext} from 'react'
// import { ServiceContext } from '../context.jsx/ServiceContext';
// import { useContext } from 'react';
// function EmployeeList(){
//     const service =   useContext(ServiceContext);
//     const employees = service.fetchEmployees();
//   return(
//   <div>
//     <h3>Employees Context DI</h3>
//     {employees.map((e)=> (<p key={e} >{e}</p>))}
//   </div>
//   )
// }
// export default EmployeeList


//Example using Hook DI
import { useEmployeeService } from '../hooks/useEmployeeService';
function EmployeeList(){
    const service =  useEmployeeService();
    const employees = service.fetchEmployees();
  return(
  <div>
    <h3>Employees Context DI</h3>
    {employees.map((e)=> (<p key={e} >{e}</p>))}
  </div>
  )
}
export default EmployeeList