"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";

const WelcomePage: FC = () => {
  const router = useRouter();

  const navigateToEducation = () => {
    router.push("/education");
  };

  const navigateToPortfolio = () => {
    router.push("/portfolio");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <header className="w-full text-center">
        <h1 className="text-4xl font-bold text-primary mb-4">Portfolio Projections & Personal Finance Education</h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Learn to manage your finances, plan for your future, and grow your investment portfolio with our insightful guides and tools.
        </p>
      </header>
      <main className="flex flex-col items-center mt-10">
        <button 
          onClick={navigateToPortfolio}
          className="px-6 py-3 bg-primary text-primary-foreground rounded hover:bg-primary-foreground hover:text-primary transition duration-300 ease-in-out mb-4">
          Portfolio Workshop
        </button>
        <button 
          onClick={navigateToEducation}
          className="px-6 py-3 bg-primary text-primary-foreground rounded hover:bg-primary-foreground hover:text-primary transition duration-300 ease-in-out">
          Educational Videos
        </button>
      </main>
      <footer className="w-full text-center mt-auto pt-10 text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Portfolio Projections. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default WelcomePage;
