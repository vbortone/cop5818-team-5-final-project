"use client";

import { UserProfile } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import React from "react";

interface UserProfileProps {
  user: UserProfile | undefined;
}

const MainNav: React.FC<UserProfileProps> = ({user}) => {
  return (
    user && (
      <nav className="ml-8 flex gap-4 sm:gap-6">
        <Link className="flex items-center justify-center" href="/portfolio">
          Portfolio Workshop
        </Link>
        <Link className="flex items-center justify-center" href="/education">
          Educational Videos
        </Link>
      </nav>
    )
  );
}

export default MainNav;