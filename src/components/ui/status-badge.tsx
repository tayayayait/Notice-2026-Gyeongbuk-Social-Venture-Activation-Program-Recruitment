import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const statusBadgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-pill px-2.5 py-0.5 text-caption font-medium transition-colors",
  {
    variants: {
      variant: {
        success: "bg-primary-tint text-accent-foreground",
        warning: "bg-[hsl(38_92%_95%)] text-[hsl(var(--semantic-warning))]",
        danger: "bg-[hsl(var(--state-error-bg))] text-[hsl(var(--state-error-fg))]",
        info: "bg-info-tint text-info",
        neutral: "bg-muted text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  }
);

export interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof statusBadgeVariants> {
  dot?: boolean;
}

const StatusBadge = React.forwardRef<HTMLSpanElement, StatusBadgeProps>(
  ({ className, variant, dot = true, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(statusBadgeVariants({ variant, className }))}
        {...props}
      >
        {dot && (
          <span
            className={cn("h-1.5 w-1.5 rounded-full", {
              "bg-accent-foreground": variant === "success",
              "bg-warning": variant === "warning",
              "bg-destructive": variant === "danger",
              "bg-info": variant === "info",
              "bg-muted-foreground": variant === "neutral" || !variant,
            })}
          />
        )}
        {children}
      </span>
    );
  }
);
StatusBadge.displayName = "StatusBadge";

export { StatusBadge, statusBadgeVariants };
