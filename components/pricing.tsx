import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Starter",
    price: "$99",
    features: [
      "Basic dashboard",
      "Customer web interface",
      "Limited analytics",
      "Email support",
    ],
  },
  {
    name: "Pro",
    price: "$199",
    features: [
      "Advanced dashboard",
      "Custom branding",
      "Full analytics suite",
      "Priority support",
    ],
  },
  {
    name: "Multi-Business",
    price: "Custom",
    features: [
      "Fully customizable solution",
      "Dedicated account manager",
      "On-site training",
      "24/7 phone support",
    ],
  },
];

export function Pricing() {
  return (
    <section
      id="pricing"
      className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
    >
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
          Pricing Plans
        </h2>
        <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="flex flex-col p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg"
            >
              <h3 className="text-2xl font-bold text-center">{plan.name}</h3>
              <div className="mt-4 text-center text-4xl font-bold">
                {plan.price}
              </div>
              <p className="mt-2 text-center text-gray-500 dark:text-gray-400">
                per month
              </p>
              <ul className="mt-6 space-y-4">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button className="mt-8">Get Started</Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
