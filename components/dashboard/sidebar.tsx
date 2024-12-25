"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";

const sidebarLinks = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Icons.dashboard,
  },
  {
    title: "Menu",
    href: "/dashboard/menu",
    icon: Icons.menu,
  },
  {
    title: "Orders",
    href: "/dashboard/orders",
    icon: Icons.order,
  },
  {
    title: "Inventory",
    href: "/dashboard/inventory",
    icon: Icons.inventory,
  },
  {
    title: "Staff",
    href: "/dashboard/staff",
    icon: Icons.staff,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: Icons.analytics,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r">
      <div className="flex h-full flex-col">
        <div className="flex h-14 items-center border-b px-4">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Icons.menu className="h-6 w-6" />
            <span className="font-semibold">Servio</span>
          </Link>
        </div>
        <div className="flex-1 space-y-1 p-4">
          {sidebarLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent",
                pathname === link.href
                  ? "bg-accent font-medium"
                  : "text-muted-foreground"
              )}
            >
              <link.icon className="h-4 w-4" />
              {link.title}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
