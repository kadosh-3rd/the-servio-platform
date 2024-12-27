"use client";

import Link from "next/link";
import { Icons } from "@/components/icons";
import { DashboardLinks } from "./dashboard-links";

export default function Sidebar() {
  return (
    <aside className="hidden border-0 md:block">
      <div className="flex flex-col max-h-screen h-full gap-2">
        <div className="h-14 flex items-center border-0 px-4 lg:h-[60px] lg:px-6">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Icons.restaurantMenu className="size-6" />
            <span className="text-2xl font-bold">Servio</span>
          </Link>
        </div>

        <div className="flex-1 space-y-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <DashboardLinks />
          </nav>
        </div>
      </div>
    </aside>
  );
}
