import React from 'react'
import { useRef, useState } from "react";


function JsonRegistrationForm() {
      const emailRef = useRef();
      const passwordRef = useRef();
      const [getMessage, setMessage] = useState("");
      const emailRegex =   /^[a-z][a-zA-Z0-9_]*(\.[a-zA-Z][a-zA-Z0-9_]*)*@([a-z][a-zA-Z0-9-]*)\.[a-z]+(\.[a-z]+)?$/;
      const passwordRegex =   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/;
 
        const handleSubmit = (e) => {
            e.preventDefault();
           // alert("Message");
            setMessage("");
            const email = emailRef.current.value;
            const password = passwordRef.current.value;
            if(!emailRegex.test(email)){
                setMessage(" Invalid email format");
                return;
            }
 
              if(!passwordRegex.test(password)){
                setMessage(" Invalid password format");
                return;
            }
            setMessage("Registration done");
            e.target.reset();
        } 
      return (
    <div>
      
        <h2> Registration Form</h2>
        <form onSubmit={handleSubmit}>
            <input  ref={emailRef} placeholder=' email'/>
            <input type ="password" ref={passwordRef} placeholder='password'/>
            <button type="submit">Register</button>
        </form>
      
      {getMessage & <p>{getMessage}</p>}
    </div>
  )
}
export default JsonRegistrationForm