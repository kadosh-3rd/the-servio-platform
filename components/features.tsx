import { LayoutDashboard, Users, BarChart } from "lucide-react";

const features = [
  {
    name: "Restaurant Management Dashboard",
    description:
      "Centralized control center for efficient restaurant operations, including menu management, order processing, and staff management.",
    icon: LayoutDashboard,
  },
  {
    name: "Customer-Facing Web Interface",
    description:
      "Frictionless dining experience through QR code access, enabling menu browsing, ordering, and payment processing.",
    icon: Users,
  },
  {
    name: "Analytics and Intelligence Engine",
    description:
      "Sophisticated data processing for actionable insights, enabling data-driven decision-making and business improvement.",
    icon: BarChart,
  },
];

export function Features() {
  return (
    <section
      id="features"
      className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
    >
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
          Core Features
        </h2>
        <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="flex flex-col items-center text-center"
            >
              <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-primary/10">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-bold">{feature.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
