"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateAccount() {
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function createNewAccount() {
    const newAccount = { username: userName, password: passWord };
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("http://51.20.251.254:3001/createaccount", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAccount),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Unknown error");
      }

      setUserName("");
      setPassWord("");

      router.push("/login");
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col w-screen h-screen items-center justify-center gap-4">
      <h1 className="text-4xl mb-4">Create a New Account</h1>

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

      {errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>}

      <button
        className={`btn ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={createNewAccount}
        disabled={isLoading}
      >
        {isLoading ? "Creating..." : "Create Account"}
      </button>

      <div className="mt-4">
        <p>
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}
