import { Metadata } from "next";
import { Geist } from "next/font/google";
import "@/app/globals.css";

import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/lib/providers/theme-provider";
import Sidebar from "@/components/dashboard/sidebar";
import Header from "@/components/dashboard/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  adjustFontFallback: true,
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dashboard | Servio",
  description: "Restaurant Management System",
};

// async function getUser(userId: string) {
//   const data = await prisma.user.findUnique({
//     where: {
//       id: userId,
//     },
//     select: {
//       firstName: true,
//       lastName: true,
//       address: true,
//     },
//   });

//   if (!data?.firstName || !data.lastName || !data.address) {
//     redirect("/onboarding");
//   }
// }

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const session = await requireUser()
  // const data = await getUser(session.user?.id as string);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className} bg-muted/40 antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange={false}
          enableSystem
        >
          <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <Sidebar />
            <div className="flex flex-col">
              <Header />
              <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 rounded-tl-3xl bg-primary/10">
                {children}
              </main>
            </div>
          </div>
        </ThemeProvider>
        <Toaster richColors closeButton />
      </body>
    </html>
  );
}
