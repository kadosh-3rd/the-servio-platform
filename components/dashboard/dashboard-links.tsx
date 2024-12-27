"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";

export const dashboardLinks = [
  {
    id: 0,
    title: "Dashboard",
    href: "/dashboard",
    icon: Icons.dashboard,
  },
  {
    id: 1,
    title: "Menu",
    href: "/dashboard/menu",
    icon: Icons.restaurantMenu,
  },
  {
    id: 2,
    title: "Orders",
    href: "/dashboard/orders",
    icon: Icons.order,
  },
  {
    id: 3,
    title: "Inventory",
    href: "/dashboard/inventory",
    icon: Icons.inventory,
  },
  {
    id: 4,
    title: "Staff",
    href: "/dashboard/staff",
    icon: Icons.staff,
  },
  {
    id: 5,
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: Icons.analytics,
  },
];

export function DashboardLinks() {
  const pathname = usePathname();

  return (
    <>
      {dashboardLinks.map((link) => (
        <Link
          className={cn(
            pathname === link.href
              ? "font-medium bg-primary/10"
              : "text-muted-foreground hover:text-foreground",
            "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary text-base"
          )}
          href={link.href}
          key={link.id}
        >
          <link.icon className="size-6" />
          {link.title}
        </Link>
      ))}
    </>
  );
}
