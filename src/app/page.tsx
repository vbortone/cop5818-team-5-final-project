import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronRight, PieChart, TrendingUp, ShieldCheck } from "lucide-react";

export default async function Home() {

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <Image
                alt="Hero image of financial growth chart"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
                height={550}
                src="/images/hero-1.png"
                width={550}
              />
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Smart Investing for Your Future
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    Our AI-powered robo advisor optimizes your investments,
                    ensuring your money works as hard as you do.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild>
                    <Link href="/signup">
                      Learn More <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Why Choose RoboAdviz?
            </h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <Card>
                <CardHeader>
                  <TrendingUp className="h-8 w-8 mb-2 text-primary" />
                  <CardTitle>Data-Driven Strategies</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Our AI analyzes market trends and economic indicators to
                    make informed investment decisions.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <ShieldCheck className="h-8 w-8 mb-2 text-primary" />
                  <CardTitle>Risk Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    We optimize your portfolio to balance potential returns with
                    your personal risk tolerance.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <PieChart className="h-8 w-8 mb-2 text-primary" />
                  <CardTitle>Diversified Portfolios</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Spread your investments across various asset classes to
                    minimize risk and maximize returns.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Start Your Financial Journey Today
                </h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Join thousands of investors who trust RoboAdviz to manage
                  their portfolios. Our easy-to-use platform makes investing
                  accessible to everyone, regardless of experience or account
                  size.
                </p>
                <Button className="w-fit" asChild>
                  <Link href="/signup">Create Your Account</Link>
                </Button>
              </div>
              <Image
                alt="Financial planning illustration"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
                height={550}
                src="/images/hero-2.png"
                width={550}
              />
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {new Date().getFullYear()} Portfolio Projections. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
