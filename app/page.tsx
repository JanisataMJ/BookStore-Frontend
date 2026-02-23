"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardHome from "./dashboard/page";
export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {
      router.push("/login");
    }
  }, []);

  return (
    <DashboardHome />
  );
}
