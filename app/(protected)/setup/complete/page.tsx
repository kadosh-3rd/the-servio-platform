"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { completeProfile } from "@/lib/actions/profile";
import { useTransition } from "react";

export default function CompleteSetup() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleComplete = () => {
    startTransition(async () => {
      try {
        const result = await completeProfile();

        if (result.error) {
          toast.error(result.error);
          return;
        }

        toast.success("Profile setup completed successfully");
        router.push("/dashboard");
      } catch (error) {
        toast.error("Something went wrong");
      }
    });
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Complete Setup</CardTitle>
        <CardDescription>
          You're almost there! Review your information and complete the setup.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">What's Next?</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Your restaurant profile will be activated</li>
            <li>You can start adding staff members</li>
            <li>Set up your tables and floor plan</li>
            <li>Start accepting orders</li>
            <li>View analytics and reports</li>
          </ul>
        </div>

        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/setup/menu")}
          >
            Back
          </Button>
          <Button onClick={handleComplete} disabled={isPending}>
            {isPending && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Complete Setup
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
