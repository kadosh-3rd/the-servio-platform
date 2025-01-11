import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "@/app/globals.css";

import { ThemeProvider } from "@/lib/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { SetupProgress } from "@/components/setup/progress";

const geistSans = Geist({
  variable: "--font-geist-sans",
  adjustFontFallback: true,
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Complete Setup | Wermi",
  description:
    "Let's complete your restaurant setup to start using the platform.",
};

export default function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
          <div className="min-h-screen bg-background flex flex-col">
            <div className="sticky top-0 z-10 bg-background border-b">
              <div className="container max-w-screen-xl mx-auto py-4">
                <SetupProgress />
              </div>
            </div>
            <div className="flex-1 overflow-auto">
              <div className="container max-w-screen-xl mx-auto py-6">
                {children}
              </div>
            </div>
          </div>
          <Toaster richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
