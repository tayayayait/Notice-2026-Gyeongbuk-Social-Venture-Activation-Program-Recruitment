import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1rem",
        lg: "1.5rem",
      },
      screens: {
        "2xl": "1200px",
      },
    },
    screens: {
      xs: "360px",
      sm: "480px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px",
    },
    extend: {
      fontFamily: {
        sans: [
          "Pretendard Variable",
          "Pretendard",
          "Noto Sans KR",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "sans-serif",
        ],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Consolas",
          "Liberation Mono",
          "monospace",
        ],
      },
      fontSize: {
        display: ["2rem", { lineHeight: "1.25", fontWeight: "600" }],
        h1: ["1.5rem", { lineHeight: "1.25", fontWeight: "600" }],
        h2: ["1.25rem", { lineHeight: "1.25", fontWeight: "600" }],
        h3: ["1.125rem", { lineHeight: "1.25", fontWeight: "600" }],
        body: ["1rem", { lineHeight: "1.5", fontWeight: "400" }],
        body2: ["0.875rem", { lineHeight: "1.5", fontWeight: "400" }],
        caption: ["0.75rem", { lineHeight: "1.5", fontWeight: "400" }],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          hover: "hsl(var(--brand-green-700))",
          active: "hsl(var(--brand-green-800))",
          tint: "hsl(var(--brand-green-50))",
          "tint-strong": "hsl(var(--brand-green-100))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
          hover: "hsl(var(--semantic-danger-dark))",
          active: "hsl(var(--semantic-danger-darker))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        info: {
          DEFAULT: "hsl(var(--brand-blue-600))",
          foreground: "hsl(0 0% 100%)",
          tint: "hsl(var(--brand-blue-50))",
          "tint-strong": "hsl(var(--brand-blue-100))",
          hover: "hsl(var(--brand-blue-700))",
        },
        success: {
          DEFAULT: "hsl(var(--semantic-success))",
          tint: "hsl(var(--brand-green-50))",
        },
        warning: {
          DEFAULT: "hsl(var(--semantic-warning))",
        },
        danger: {
          DEFAULT: "hsl(var(--semantic-danger))",
        },
        neutral: {
          0: "hsl(var(--neutral-0))",
          50: "hsl(var(--neutral-50))",
          100: "hsl(var(--neutral-100))",
          200: "hsl(var(--neutral-200))",
          300: "hsl(var(--neutral-300))",
          400: "hsl(var(--neutral-400))",
          600: "hsl(var(--neutral-600))",
          700: "hsl(var(--neutral-700))",
          900: "hsl(var(--neutral-900))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
          6: "hsl(var(--chart-6))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) + 4px)",
        sm: "calc(var(--radius))",
        xl: "16px",
        pill: "9999px",
      },
      boxShadow: {
        1: "var(--shadow-1)",
        2: "var(--shadow-2)",
        3: "var(--shadow-3)",
        "focus-ring": "0 0 0 2px hsl(var(--brand-blue-600)), 0 0 0 4px hsl(var(--brand-blue-600) / 0.22)",
      },
      spacing: {
        "topbar": "var(--topbar-height)",
        "sidebar": "var(--sidebar-width)",
        "sidebar-collapsed": "var(--sidebar-width-collapsed)",
        "bottombar": "var(--bottombar-height)",
        "appbar": "var(--appbar-height)",
      },
      zIndex: {
        sticky: "30",
        dropdown: "40",
        overlay: "50",
        modal: "60",
        toast: "70",
        tooltip: "80",
      },
      transitionDuration: {
        fast: "120ms",
        base: "200ms",
        slow: "320ms",
      },
      transitionTimingFunction: {
        standard: "cubic-bezier(0.2, 0, 0, 1)",
        emphasis: "cubic-bezier(0.2, 0, 0, 0.6)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
