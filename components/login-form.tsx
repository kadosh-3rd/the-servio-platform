"use client";

import { useEffect, useTransition } from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/validations/auth";
import { loginRestaurant } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";
import type { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import type { ActionResponse } from "@/lib/types";

function SubmitButton({ loading }: { loading: boolean }) {
  const { pending } = useFormStatus();
  const isLoading = pending || loading;

  return (
    <Button type="submit" className="w-full" disabled={isLoading}>
      {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
      {isLoading ? "Signing in..." : "Sign In"}
    </Button>
  );
}

export default function LoginForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [state, formAction] = useActionState<ActionResponse>(loginRestaurant, null);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
    }
    if (state?.success) {
      toast.success(state.message || "Login successful!");
      form.reset();
      startTransition(() => {
        router.push("/dashboard");
      });
    }
  }, [state, form, router]);

  async function onSubmit(values: z.infer<typeof loginSchema>) {
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
        loading: "Logging in...",
        success: "Logged in successfully!",
        error: (error) => `${error}`,
      }
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="restaurant@example.com"
                  type="email"
                  {...field}
                />
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
                <Input
                  placeholder="Enter your password"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton loading={isPending} />
      </form>
    </Form>
  );
}
