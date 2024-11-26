"use client";

import LoginButton from "@/components/login-button";
import MainNav from "@/components/main-nav";
import Link from "next/link";
import { PieChart } from "lucide-react";
import { useUser } from "@auth0/nextjs-auth0/client";
import React from "react";

const TopNav: React.FC = () => {
  const { user } = useUser();

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center">
      <Link className="flex items-center justify-center" href="/">
        <PieChart className="h-6 w-6" />
        <span className="ml-2 text-lg font-bold">RoboAdviz</span>
      </Link>
      <MainNav user={user} />
      <LoginButton user={user} />
    </header>
  );
}

export default TopNav;