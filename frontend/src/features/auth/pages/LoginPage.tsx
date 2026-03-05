import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";
import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  const { login, loading, error } = useAuth();

  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
       console.log("HANDLE LOGIN CALLED"); 
    const success =  await login({ email, password });

       console.log("LOGIN RESULT", success);

     if(success){

        navigate("/chats");
     }
  };

  return <LoginForm onSubmit={handleLogin} loading={loading} error={error} />;
}
