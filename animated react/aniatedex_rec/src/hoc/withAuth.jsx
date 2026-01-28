import React from 'react'
function withAuth(Component) {
   return function WrappedComponent(props){ 
    
    const isLoggedIn = localStorage.getItem("loggedIn");
  
    
  if(!isLoggedIn)
    {
    return <h3 style={{color:"red"}}> You are not Authorized..</h3>
    }
    return <Component {...props} />
}
}
export default withAuth