import Link from "next/link";
import { Button } from "@/components/ui/button";

export function DemoCTA() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Ready to Revolutionize Your Restaurant?
            </h2>
            <p className="max-w-[900px] text-primary-foreground/90 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              See Servio in action and discover how it can transform your
              business. Schedule a personalized demo today.
            </p>
          </div>
          <Button asChild size="lg" variant="secondary">
            <Link href="/schedule-demo">Schedule a Demo</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
