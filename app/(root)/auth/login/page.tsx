import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import LoginForm from "@/components/login-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Login | Servio",
  description:
    "Join Servio's restaurant management platform and streamline your operations today.",
};

export default function LoginPage() {
  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          Servio Platform
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              "Servio has revolutionized how we manage our restaurant. The
              platform is intuitive, efficient, and has helped us grow our
              business significantly."
            </p>
            <footer className="text-sm">Sofia Davis - Restaurant Owner</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <Card>
            <CardHeader className="space-y-1 text-center">
              <CardTitle>Welcome back!🙂</CardTitle>
              <CardDescription>Sign in to your dashboard</CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<div>Loading...</div>}>
                <LoginForm />
              </Suspense>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-sm text-muted-foreground text-center">
                Don't have an account?{" "}
                <Link
                  href="/auth/register"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Register now!
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
