import * as React from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface KpiCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string | number;
  unit?: string;
  trend?: { value: number; label?: string };
  icon?: React.ReactNode;
  loading?: boolean;
}

const KpiCard = React.forwardRef<HTMLDivElement, KpiCardProps>(
  ({ className, title, value, unit, trend, icon, loading = false, ...props }, ref) => {
    if (loading) {
      return (
        <div
          ref={ref}
          className={cn(
            "rounded-md border border-border bg-card p-4 shadow-1",
            className
          )}
          {...props}
        >
          <Skeleton className="h-4 w-24 mb-3" />
          <Skeleton className="h-8 w-32 mb-2" />
          <Skeleton className="h-3 w-20" />
        </div>
      );
    }

    const trendColor = trend
      ? trend.value > 0
        ? "text-success"
        : trend.value < 0
        ? "text-destructive"
        : "text-muted-foreground"
      : undefined;

    const TrendIcon = trend
      ? trend.value > 0
        ? TrendingUp
        : trend.value < 0
        ? TrendingDown
        : Minus
      : null;

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-md border border-border bg-card p-4 shadow-1 transition-shadow duration-fast hover:shadow-2",
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-body2 text-muted-foreground font-medium">{title}</span>
          {icon && <span className="text-muted-foreground">{icon}</span>}
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-display font-semibold text-foreground">{value}</span>
          {unit && <span className="text-caption text-muted-foreground">{unit}</span>}
        </div>
        {trend && (
          <div className={cn("flex items-center gap-1 mt-2 text-caption", trendColor)}>
            {TrendIcon && <TrendIcon className="h-3 w-3" />}
            <span className="font-medium">
              {trend.value > 0 ? "+" : ""}
              {trend.value}%
            </span>
            {trend.label && <span className="text-muted-foreground">{trend.label}</span>}
          </div>
        )}
      </div>
    );
  }
);
KpiCard.displayName = "KpiCard";

export { KpiCard };
