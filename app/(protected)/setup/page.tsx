"use client";

import { useState, useTransition } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Icons } from "@/components/icons";
import { updateBasicInfo } from "@/lib/actions/profile";
import { ImageUpload } from "@/components/ui/image-upload";
import { cuisineTypes } from "@/lib/utils/cuisines";
import { currencies } from "@/lib/utils/currencies";
import { timezones } from "@/lib/utils/timezones";
import { CuisineSelect } from "@/components/ui/cuisine-select";

const basicInfoSchema = z.object({
  logo: z.string().optional(),
  coverImage: z.string().optional(),
  cuisine: z.array(z.string()).min(1, "Select at least one cuisine type"),
  settings: z.object({
    currency: z.string(),
    timezone: z.string(),
    taxRate: z.number().min(0).max(100),
    serviceCharge: z.number().min(0).max(100),
  }),
});

type BasicInfoValues = z.infer<typeof basicInfoSchema>;

export default function BasicInfoSetup() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<BasicInfoValues>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      cuisine: [],
      settings: {
        currency: "USD",
        timezone: "UTC",
        taxRate: 0,
        serviceCharge: 0,
      },
    },
  });

  async function onSubmit(values: BasicInfoValues) {
    startTransition(async () => {
      try {
        const result = await updateBasicInfo(values);

        if (result.error) {
          toast.error(result.error);
          return;
        }

        toast.success("Basic information updated successfully");
        router.push("/setup/hours");
      } catch (error) {
        toast.error("Something went wrong");
      }
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
        <CardDescription>
          Set up your restaurant's basic information and preferences
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="logo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Restaurant Logo</FormLabel>
                    <FormControl>
                      <ImageUpload
                        onUpload={(url) => field.onChange(url)}
                        defaultImage={field.value}
                        aspectRatio="square"
                        folder="restaurant-logos"
                        className="w-40 h-40 mx-auto"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="coverImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cover Image</FormLabel>
                    <FormControl>
                      <ImageUpload
                        onUpload={(url) => field.onChange(url)}
                        defaultImage={field.value}
                        aspectRatio="landscape"
                        folder="restaurant-covers"
                        className="w-full h-40"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="cuisine"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cuisine Types</FormLabel>
                  <FormControl>
                    <CuisineSelect
                      selected={field.value}
                      options={cuisineTypes}
                      onChange={field.onChange}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="settings.currency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Currency</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {currencies.map((currency) => (
                          <SelectItem key={currency.code} value={currency.code}>
                            {currency.code} - {currency.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="settings.timezone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Timezone</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {timezones.map((timezone) => (
                          <SelectItem
                            key={timezone.value}
                            value={timezone.value}
                          >
                            {timezone.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="settings.taxRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tax Rate (%)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        step="0.1"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="settings.serviceCharge"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Charge (%)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        step="0.1"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Continue
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
