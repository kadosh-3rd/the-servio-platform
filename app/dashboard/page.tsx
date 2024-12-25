"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/icons";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface SalesData {
  name: string;
  email: string;
  amount: number;
}

const stats = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1%",
    changeLabel: "from last month",
    icon: Icons.revenue,
  },
  {
    title: "Orders",
    value: "+2350",
    change: "+180.1%",
    changeLabel: "from last month",
    icon: Icons.order,
  },
  {
    title: "Active Tables",
    value: "+12",
    change: "+19%",
    changeLabel: "from last hour",
    icon: Icons.table,
  },
  {
    title: "Inventory Status",
    value: "95%",
    change: "+4%",
    changeLabel: "from last week",
    icon: Icons.inventory,
  },
];

const recentSales = [
  {
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    amount: "+$1,999.00",
  },
  {
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    amount: "+$39.00",
  },
  {
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    amount: "+$299.00",
  },
];

export default function DashboardPage() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US").format(num);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <p className="text-muted-foreground">
              {currentTime.toLocaleString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Card className="bg-primary/5">
              <CardContent className="py-2 px-4">
                <p className="text-sm font-medium">Status</p>
                <p className="text-2xl font-bold text-primary">Open</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex items-baseline justify-between">
                  <h2 className="text-2xl font-bold">{stat.value}</h2>
                  <p className="text-sm text-green-500">
                    {stat.change}
                    <span className="text-xs text-muted-foreground ml-1">
                      {stat.changeLabel}
                    </span>
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] w-full bg-muted/10 rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Chart coming soon...</p>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Recent Sales</CardTitle>
              <p className="text-sm text-muted-foreground">
                You made 265 sales this month.
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {recentSales.map((sale) => (
                  <div key={sale.email} className="flex items-center">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback>
                        {sale.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium">{sale.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {sale.email}
                      </p>
                    </div>
                    <div className="ml-auto font-medium">{sale.amount}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
