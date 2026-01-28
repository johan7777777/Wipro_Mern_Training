import * as Yup from "yup";

export const employeeSchema = Yup.object({
    name:Yup.string().required("Name is Mandatory to fill"),
    email: Yup.string().email("Invalid email").required("Email is Mandatory to fill"),
    password: Yup.string().min(6,"Min 6 characters to be entered").required("Password required")
})