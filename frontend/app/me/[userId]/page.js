"use client";

import { useEffect } from "react";
import { useSession } from "../../../context/sessionContext";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { session, logout } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [session, router]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  if (!session) {
    return null;
  }

  return (
    <div className="flex flex-col w-screen h-screen items-center justify-center gap-4">
      <h1>Welcome: {session.username}</h1>
      <p>Balance: ${session.balance}</p>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
}
