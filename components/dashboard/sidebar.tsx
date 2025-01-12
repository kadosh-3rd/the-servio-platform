"use client";

import { DashboardLinks } from "./dashboard-links";
import { superSimpleBeautifulLogo as Logo } from "../s2bl";

export default function Sidebar() {
  return (
    <aside className="hidden border-0 md:block">
      <div className="flex flex-col max-h-screen h-full gap-2">
        <div className="h-14 flex items-center border-0 px-4 lg:h-[60px] lg:px-6">
          <Logo
            pointTo="default"
            title="wer"
            clipedPartText="mi_"
            clipedPartStyle="bg-gradient-to-r from-blue-300 to-blue-700 text-3xl font-extrabold"
          />
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
