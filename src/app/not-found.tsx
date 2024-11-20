import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PieChart } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex-1 flex items-center justify-center">
      <div className="container px-4 md:px-6 flex flex-col items-center text-center space-y-4">
        <PieChart className="h-24 w-24 text-primary" />
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
          404 - Page Not Found
        </h1>
        <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
          Oops! The page you are looking for does not exist. It might have been
          moved or deleted.
        </p>
        <Button asChild size="lg">
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    </main>
  );
}
