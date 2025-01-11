"use client";

import { useActionState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { logoutRestaurant } from "@/lib/actions/auth";
import { Icons } from "@/components/icons";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "../theme-toogle";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Menu } from "lucide-react";
import { DashboardLinks } from "./dashboard-links";

export default function Header() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [state, formAction] = useActionState<ActionResponse>(
    logoutRestaurant,
    null
  );

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
      startTransition(() => {
        router.push("/auth/login");
      });
    }
    if (state?.error) {
      toast.error(state.error);
    }
  }, [state, router]);

  const handleLogout = () => {
    startTransition(() => {
      formAction();
    });
  };

  return (
    <header className="sticky flex items-center justify-between gap-4 px-4 lg:h-[60px] lg:px-6 top-0 z-50 w-full h-14 border-0 backdrop-blur supports-[backdrop-filter]:bg-muted/5">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden rounded-full"
          >
            <Menu size="size-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side={"left"} className="rounded-tr-3xl rounded-br-3xl">
          <SheetHeader>
            <SheetTitle className="text-2xl font-bold">Wermi</SheetTitle>
            <SheetDescription className="italic">
              Powering smarter restaurants.
            </SheetDescription>
          </SheetHeader>
          <nav className="grid gap-2 mt-10">
            <DashboardLinks />
          </nav>
        </SheetContent>
      </Sheet>

      <div className="flex items-center ml-auto gap-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative size-8 rounded-full">
              <Avatar className="size-8">
                <AvatarImage src="" alt="Profile" />
                <AvatarFallback>SR</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  Restaurant Name
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  restaurant@example.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Icons.staff className="mr-2 size-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Icons.settings className="mr-2 size-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <Icons.logout className="mr-2 size-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <ThemeToggle />
      </div>
    </header>
  );
}
