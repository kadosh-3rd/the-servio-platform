"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface CuisineSelectProps {
  options: string[];
  selected: string[];
  onChange: (values: string[]) => void;
  className?: string;
}

export function CuisineSelect({
  options,
  selected,
  onChange,
  className,
}: CuisineSelectProps) {
  const toggleCuisine = (cuisine: string) => {
    if (selected.includes(cuisine)) {
      onChange(selected.filter((item) => item !== cuisine));
    } else {
      onChange([...selected, cuisine]);
    }
  };

  return (
    <div className={cn("w-full space-y-4", className)}>
      <div className="flex flex-wrap gap-2">
        {selected.length > 0 && (
          <div className="w-full">
            <p className="text-sm text-muted-foreground mb-2">Selected cuisines:</p>
            <div className="flex flex-wrap gap-2">
              {selected.map((cuisine) => (
                <Badge
                  key={cuisine}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => toggleCuisine(cuisine)}
                >
                  {cuisine}
                  <span className="ml-1">×</span>
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {options.map((cuisine) => {
          const isSelected = selected.includes(cuisine);
          return (
            <div
              key={cuisine}
              className={cn(
                "flex items-center justify-between px-3 py-2 rounded-md cursor-pointer transition-colors",
                "border border-input hover:bg-accent hover:text-accent-foreground",
                isSelected && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
              )}
              onClick={() => toggleCuisine(cuisine)}
            >
              <span className="text-sm font-medium">{cuisine}</span>
              {isSelected && <Check className="h-4 w-4 ml-2" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
