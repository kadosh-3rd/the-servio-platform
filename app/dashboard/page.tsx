"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/icons";
import { getRestaurantData } from "@/lib/actions/restaurant";
import { toast } from "sonner";

interface RestaurantData {
  businessName: string;
  ownerName: string;
  email: string;
  phoneNumber: string;
  address: string;
  licenseNumber?: string;
  createdAt: string;
}

interface SalesData {
  name: string;
  email: string;
  amount: number;
}

const recentSales: SalesData[] = [
  {
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    amount: 1999.0,
  },
  {
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    amount: 39.0,
  },
  {
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    amount: 299.0,
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [restaurant, setRestaurant] = useState<RestaurantData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    async function fetchRestaurantData() {
      try {
        const result = await getRestaurantData();
        if (result.error) {
          toast.error(result.error);
          if (result.error === "Not authenticated") {
            router.push("/auth/login");
          }
          return;
        }
        if (result.success && result.data) {
          setRestaurant(result.data);
        }
      } catch (error) {
        toast.error("Failed to fetch restaurant data");
      } finally {
        setLoading(false);
      }
    }

    fetchRestaurantData();
  }, [router]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US").format(num);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Icons.spinner className="size-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              {restaurant?.businessName || "Dashboard"}
            </h2>
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
            <Card className="bg-background">
              <CardContent className="py-2 px-4">
                <p className="text-sm font-medium">Status</p>
                <p className="text-2xl font-bold text-primary">Open</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <Icons.revenue className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(45231.89)}
              </div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Orders</CardTitle>
              <Icons.order className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{formatNumber(2350)}</div>
              <p className="text-xs text-muted-foreground">
                +180.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Tables
              </CardTitle>
              <Icons.table className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+12</div>
              <p className="text-xs text-muted-foreground">
                +19% from last hour
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Inventory Status
              </CardTitle>
              <Icons.inventory className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">95%</div>
              <p className="text-xs text-muted-foreground">
                +4% from last week
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Restaurant Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Owner
                  </p>
                  <p className="text-base">{restaurant?.ownerName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Email
                  </p>
                  <p className="text-base">{restaurant?.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Phone
                  </p>
                  <p className="text-base">{restaurant?.phoneNumber}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Address
                  </p>
                  <p className="text-base">{restaurant?.address}</p>
                </div>
                {restaurant?.licenseNumber && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      License
                    </p>
                    <p className="text-base">{restaurant.licenseNumber}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Member Since
                  </p>
                  <p className="text-base">
                    {new Date(restaurant?.createdAt || "").toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Recent Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {recentSales.map((sale, index) => (
                  <div key={index} className="flex items-center">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {sale.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {sale.email}
                      </p>
                    </div>
                    <div className="ml-auto font-medium">
                      {formatCurrency(sale.amount)}
                    </div>
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
