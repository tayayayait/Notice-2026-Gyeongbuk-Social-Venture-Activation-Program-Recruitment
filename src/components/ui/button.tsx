import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm font-medium transition-colors duration-fast ease-standard focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:shadow-focus-ring disabled:pointer-events-none disabled:opacity-55 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:shrink-0 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active",
        secondary:
          "bg-card text-accent-foreground border border-neutral-300 hover:bg-primary-tint hover:border-primary active:bg-primary-tint-strong",
        tertiary:
          "bg-transparent text-info hover:bg-info-tint active:bg-info-tint-strong",
        danger:
          "bg-destructive text-destructive-foreground hover:bg-destructive-hover active:bg-destructive-active",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-info underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 px-3 text-body2 [&_svg]:size-4",
        default: "h-10 px-4 text-body2 [&_svg]:size-4",
        lg: "h-12 px-[18px] text-body [&_svg]:size-5",
        icon: "h-10 w-10 [&_svg]:size-5",
        "icon-sm": "h-8 w-8 [&_svg]:size-4",
        "icon-lg": "h-11 w-11 [&_svg]:size-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, children, disabled, ...props }, ref) => {
    if (asChild) {
      return (
        <Slot
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        >
          {children}
        </Slot>
      );
    }

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Loader2 className="animate-spin" />}
        {loading && size !== "icon" && size !== "icon-sm" && size !== "icon-lg"
          ? "처리 중..."
          : children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
