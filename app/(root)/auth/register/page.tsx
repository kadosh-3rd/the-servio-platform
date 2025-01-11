import { Metadata } from "next";
import RegistrationForm from "@/components/registration-form";

export const metadata: Metadata = {
  title: "Register Your Restaurant | Wermi",
  description:
    "Join Wermi's restaurant management platform and streamline your operations today.",
};

export default function RegisterPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Register Your Restaurant
      </h1>
      <RegistrationForm />
    </div>
  );
}
