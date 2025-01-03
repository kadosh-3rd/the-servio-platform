"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Icons } from "@/components/icons";
import { updateBusinessHours } from "@/lib/actions/profile";
import { useTransition } from "react";

const businessHoursSchema = z.object({
  businessHours: z.array(
    z.object({
      day: z.number().min(0).max(6),
      open: z.string(),
      close: z.string(),
      isClosed: z.boolean(),
    })
  ),
});

type BusinessHoursValues = z.infer<typeof businessHoursSchema>;

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function BusinessHoursSetup() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<BusinessHoursValues>({
    resolver: zodResolver(businessHoursSchema),
    defaultValues: {
      businessHours: daysOfWeek.map((_, index) => ({
        day: index,
        open: "09:00",
        close: "22:00",
        isClosed: false,
      })),
    },
  });

  async function onSubmit(values: BusinessHoursValues) {
    startTransition(async () => {
      try {
        const result = await updateBusinessHours(values);

        if (result.error) {
          toast.error(result.error);
          return;
        }

        toast.success("Business hours updated successfully");
        router.push("/setup/menu");
      } catch (error) {
        toast.error("Something went wrong");
      }
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Business Hours</CardTitle>
        <CardDescription>
          Set your restaurant's operating hours for each day of the week
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              {daysOfWeek.map((day, index) => (
                <div
                  key={day}
                  className="grid grid-cols-[1fr,auto,auto,auto] gap-4 items-center"
                >
                  <div className="font-medium">{day}</div>

                  <FormField
                    control={form.control}
                    name={`businessHours.${index}.isClosed`}
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Switch
                            checked={!field.value}
                            onCheckedChange={(checked) =>
                              field.onChange(!checked)
                            }
                          />
                        </FormControl>
                        <FormLabel className="!mt-0">
                          {field.value ? "Closed" : "Open"}
                        </FormLabel>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`businessHours.${index}.open`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="time"
                            {...field}
                            disabled={form.watch(
                              `businessHours.${index}.isClosed`
                            )}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`businessHours.${index}.close`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="time"
                            {...field}
                            disabled={form.watch(
                              `businessHours.${index}.isClosed`
                            )}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/setup")}
              >
                Back
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
