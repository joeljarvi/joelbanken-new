"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "../../context/sessionContext";

export default function LoginPage() {
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");
  const { login } = useSession();
  const router = useRouter();

  async function handleLogin() {
    const loginData = { username: userName, password: passWord };

    setPassWord("");
    setUserName("");

    try {
      const response = await fetch("http://51.20.251.254:3001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Unknown error");
      }

      const data = await response.json();
      console.log("Login successful:", data);

      login(data.user);

      router.push(`/me/${data.user.userId}`);
    } catch (error) {
      console.error("Login error:", error);
      alert(error.message);
    }
  }

  return (
    <div className="flex flex-col w-screen h-screen items-center justify-center gap-4">
      <input
        type="text"
        value={userName}
        placeholder="Username"
        className="input"
        onChange={(e) => setUserName(e.target.value)}
      />
      <input
        type="password"
        value={passWord}
        placeholder="Password"
        className="input"
        onChange={(e) => setPassWord(e.target.value)}
      />
      <button className="btn" onClick={handleLogin}>
        Log In
      </button>
    </div>
  );
}
