import { ServiceContext } from "../context.jsx/ServiceContext"
import { useContext } from "react"

export function useEmployeeService()
{
return useContext(ServiceContext);
}