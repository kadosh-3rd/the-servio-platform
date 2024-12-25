"use client";

// import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { toast } from "@/components/ui/use-toast";

export function Newsletter() {
  // const [email, setEmail] = useState("");

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   // Here you would typically send the email to your backend
  //   console.log("Submitted email:", email);
  //   toast({
  //     title: "Subscribed!",
  //     description: "Thank you for subscribing to our newsletter.",
  //   });
  //   setEmail("");
  // };

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Stay Updated
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Subscribe to our newsletter for the latest updates, industry
              insights, and exclusive offers.
            </p>
          </div>
          <form
            // onSubmit={handleSubmit}
            className="flex w-full max-w-sm items-center space-x-2"
          >
            <Input
              type="email"
              placeholder="Enter your email"
              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit">Subscribe</Button>
          </form>
        </div>
      </div>
    </section>
  );
}
