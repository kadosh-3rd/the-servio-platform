"use client";

import { Progress } from "@/components/ui/progress";
import { setupSteps } from "@/config/setup";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export function SetupProgress() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const currentStepIndex = setupSteps.findIndex(
      (step) => step.path === pathname
    );
    const progressValue = ((currentStepIndex + 1) / setupSteps.length) * 100;
    setProgress(progressValue);
  }, [pathname]);

  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold mb-2 px-4">Restaurant Setup</h1>
      <p className="text-muted-foreground mb-4 px-4">
        Complete your restaurant profile to start using the platform
      </p>
      <Progress value={progress} className="h-2" />
      <div className="flex justify-between mt-2 px-4">
        {setupSteps.map((step, index) => (
          <div
            key={step.path}
            className={`text-sm ${
              pathname === step.path
                ? "text-primary font-medium"
                : "text-muted-foreground"
            }`}
          >
            Step {index + 1}: {step.label}
          </div>
        ))}
      </div>
    </div>
  );
}
