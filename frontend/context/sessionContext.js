"use client";
import { createContext, useState, useContext, useEffect } from "react";

const SessionContext = createContext();

export const useSession = () => {
  return useContext(SessionContext);
};

export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const savedSession = localStorage.getItem("userSession");
    if (savedSession) {
      setSession(JSON.parse(savedSession));
    }
  }, []);

  useEffect(() => {
    if (session) {
      localStorage.setItem("userSession", JSON.stringify(session));
    }
  }, [session]);

  const login = (userData) => {
    setSession(userData);
  };

  const logout = () => {
    setSession(null);
    localStorage.removeItem("userSession");
  };

  return (
    <SessionContext.Provider value={{ session, login, logout }}>
      {children}
    </SessionContext.Provider>
  );
};
