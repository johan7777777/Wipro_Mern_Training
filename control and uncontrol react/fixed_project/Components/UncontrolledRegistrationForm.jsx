import React from 'react'
import JsonRegistrationForm from './JsonRegistrationForm';
import {useRef} from "react"
function JsonRegistrationForm() {
    const usernameRef = useRef();  // reference variable
    
     const handleSubmit =(e) =>
    {
        e.preventDefault();
        alert("Value :"+  usernameRef.current.value)
    }
  return (
   <div>
      <form >  
        
        <input ref={usernameRef} />
        
      
        <button onClick= {handleSubmit}> Submit</button>
      </form>
    </div>
  )
}
export default JsonRegistrationForm