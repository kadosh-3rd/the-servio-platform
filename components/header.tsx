"use client";

import Link from "next/link";
import { ThemeToggle } from "./theme-toogle";

export function Header() {
  return (
    // header wrapper's optional
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
      <div className="flex justify-between items-center py-5">
        <Link href="/">
          <h3 className="text-3xl font-semibold">Servio</h3>
        </Link>

        <div className="flex gap-x-4">
          <Link href="/auth/login" className="rounded-md px-4 py-2 text-center">
            Login
          </Link>
          <Link
            href="/auth/register"
            className="bg-primary text-primary-foreground rounded-md px-4 py-2 text-center"
          >
            Register
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
