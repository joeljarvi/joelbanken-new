"use client";
import { createContext, useState } from "react";

export const HandleAccountContext = createContext([]);

export default function AccountContext({ children }) {
  const [account, setAccount] = useState([]);

  return (
    <HandleAccountContext.Provider value={{ account, setAccount }}>
      {children}
    </HandleAccountContext.Provider>
  );
}
