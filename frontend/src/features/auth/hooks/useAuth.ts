import { useState } from "react";
import { login as loginApi } from "../api";
import type { LoginPayload, User } from "../types";
import { useAuthStore } from "../../../store/authStore";

export function useAuth() {
  // const [user, setUser] = useState<User | null>(null);
  // const [token, setToken] = useState<string | null>(null);
  // will use zustand

  const { setAuth } = useAuthStore();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (payload: LoginPayload) => {
    try {
      setLoading(true);
      setError(null);

      const data = await loginApi(payload);

      // setUser(data.user);
      // setToken(data.token);
      
       console.log("API RESPONSE", data);


      setAuth(data.user, data.token);
      
      // console.log("m yh ahu auseaUthm")
      
      console.log("Login success", data);
      
      // localStorage.setItem("token",data.token)
      
      console.log("Auth state",useAuthStore.getState());
     
       return true;
    
    } catch (err: any) {
      console.log("FULL ERROR", err);

  console.log("ERROR RESPONSE", err?.response);

  console.log("ERROR DATA", err?.response?.data);
      setError(err.response?.data?.message || "Login failed");

      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    // user,
    // token,
    loading,
    error,
    login,
  };
}
