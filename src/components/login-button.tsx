"use client";

import { UserProfile } from "@auth0/nextjs-auth0/client";
import { Button } from "@/components/ui/button";
import React from "react";

interface UserProfileProps {
  user: UserProfile | undefined;
}

const LoginButton: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <nav className="ml-auto flex gap-4 sm:gap-6">
      {user ? (
        <Button asChild>
          <a href="/api/auth/logout">Logout</a>
        </Button>
      ) : (
        <Button asChild>
          <a href="/api/auth/login">Login</a>
        </Button>
      )}
    </nav>
  );
};

export default LoginButton;
