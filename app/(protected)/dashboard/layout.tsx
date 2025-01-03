import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "@/app/globals.css";

import { ThemeProvider } from "@/lib/providers/theme-provider";
import Sidebar from "@/components/dashboard/sidebar";
import Header from "@/components/dashboard/header";
import { checkProfileCompletion } from "@/lib/actions/profile";
import { cn } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  adjustFontFallback: true,
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dashboard | Servio",
  description: "Manage your restaurant operations with ease.",
};

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  // Check if profile is complete
  await checkProfileCompletion();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          geistSans.className
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex-1 overflow-y-auto">
              <Header />
              <main className="p-6">{children}</main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
