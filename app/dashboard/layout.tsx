import { Metadata } from "next";
import { Geist } from "next/font/google";
import "@/app/globals.css";

import { ThemeProvider } from "@/lib/providers/theme-provider";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Toaster } from "@/components/ui/sonner";
import DashboardHeader from "@/components/dashboard/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  adjustFontFallback: true,
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dashboard | Servio",
  description: "Restaurant Management System",
};

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={geistSans.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange={false}
          enableSystem
        >
          <div className="relative flex min-h-screen">
            <Sidebar />
            <div className="flex-1 pl-64">
              <DashboardHeader />
              <main>{children}</main>
            </div>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
