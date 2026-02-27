import * as React from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface FilterChipProps extends React.HTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  onRemove?: () => void;
  disabled?: boolean;
}

const FilterChip = React.forwardRef<HTMLButtonElement, FilterChipProps>(
  ({ className, selected = false, onRemove, disabled = false, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-pill px-3 py-1.5 text-body2 font-medium transition-colors duration-fast cursor-pointer",
          "border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
          selected
            ? "bg-primary-tint border-primary text-accent-foreground"
            : "bg-card border-neutral-200 text-muted-foreground hover:bg-muted hover:border-neutral-300",
          disabled && "opacity-55 cursor-not-allowed",
          className
        )}
        {...props}
      >
        {children}
        {selected && onRemove && (
          <X
            className="h-3.5 w-3.5 opacity-70 hover:opacity-100"
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
          />
        )}
      </button>
    );
  }
);
FilterChip.displayName = "FilterChip";

export { FilterChip };
