import React from 'react'
import {Formik , Form, Field , ErrorMessage} from 'formik';
import { employeeSchema } from './ValidationSchema';
import Button from '@mui/material/Button';

function EmployeeForm() {
  return (
<>
    
     <h1>Signup</h1>
     <Formik
       initialValues={{
         name: '',
         email: '',
         password: '',
       }}
       validationSchema={employeeSchema}
       onSubmit={values => {
         
         console.log(values);
         alert("Form submitted")
       }}
     >
    <Form>
   <div>
       <label>Enter Name :</label>
       <Field name="name"></Field>
       <ErrorMessage name="name"></ErrorMessage>
   </div>
     <div>
       <label>Enter Email :</label>
       <Field name="email"></Field>
       <ErrorMessage name="email"></ErrorMessage>
   </div>
     <div>
       <label>Enter Name :</label>
       <Field name="password"></Field>
       <ErrorMessage name="password"></ErrorMessage>
   </div>
    
       <Button variant="contained" color="success">
        Success
      </Button>
    </Form>
</Formik></>
  )
}
export default EmployeeForm