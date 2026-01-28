import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function withAuth(WrappedComponent) {
  return function ProtectedComponent(props) {
    const navigate = useNavigate();

    useEffect(() => {
      const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn");
      if (isAdminLoggedIn !== "true") {
        navigate("/admin-login", { replace: true });
      }
    }, [navigate]);

    return <WrappedComponent {...props} />;
  };
}
