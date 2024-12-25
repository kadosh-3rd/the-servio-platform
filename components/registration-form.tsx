"use client";

import { useEffect, useTransition } from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/lib/validations/auth";
import { registerRestaurant } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { toast } from "sonner";
import type { z } from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { ActionResponse } from "@/lib/types";

function SubmitButton({ loading }: { loading: boolean }) {
  const { pending } = useFormStatus();
  const isLoading = pending || loading;

  return (
    <Button type="submit" className="w-full" disabled={isLoading}>
      {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
      {isLoading ? "Creating your account..." : "Register Restaurant"}
    </Button>
  );
}

export default function RegistrationForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [state, formAction] = useActionState<ActionResponse>(registerRestaurant, null);

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      businessName: "",
      ownerName: "",
      email: "",
      password: "",
      phoneNumber: "",
      address: "",
      licenseNumber: "",
    },
  });

  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
    }
    if (state?.success) {
      toast.success(state.message || "Registration successful!");
      form.reset();
      startTransition(() => {
        router.push("/auth/login?registered=true");
      });
    }
  }, [state, form, router]);

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    toast.promise(
      new Promise((resolve, reject) => {
        startTransition(async () => {
          try {
            const result = await formAction(values);
            if (result?.error) {
              reject(result.error);
            } else {
              resolve(result);
            }
          } catch (error) {
            reject(error);
          }
        });
      }),
      {
        loading: "Creating your account...",
        success: "Account created successfully!",
        error: (error) => `${error}`,
      }
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-2xl mx-auto">
        <FormField
          control={form.control}
          name="businessName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Name</FormLabel>
              <FormControl>
                <Input placeholder="Your Restaurant Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ownerName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Owner's Name</FormLabel>
              <FormControl>
                <Input placeholder="Full Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="restaurant@example.com" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Create a strong password" type="password" {...field} />
              </FormControl>
              <FormDescription>
                Must be at least 8 characters with uppercase, lowercase, number, and special character.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Controller
                  name="phoneNumber"
                  control={form.control}
                  render={({ field }) => (
                    <PhoneInput
                      international
                      defaultCountry="RW"
                      value={field.value}
                      onChange={field.onChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    />
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="Restaurant Address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="licenseNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>License Number (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Restaurant License Number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton loading={isPending} />
      </form>

      <div className="text-center mt-6">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="underline underline-offset-4 hover:text-primary"
          >
            Login
          </Link>
        </p>
      </div>
    </Form>
  );
}
