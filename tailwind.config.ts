import type { Config } from "tailwindcss";

export default {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "rgb(var(--background) / <alpha-value>)",
                surface: "rgb(var(--surface) / <alpha-value>)",
                "surface-elevated": "rgb(var(--surface-elevated) / <alpha-value>)",
                border: "rgb(var(--border) / <alpha-value>)",
                primary: {
                    DEFAULT: "rgb(var(--primary) / <alpha-value>)",
                    hover: "rgb(var(--primary-hover) / <alpha-value>)",
                },
                text: {
                    primary: "rgb(var(--text-primary) / <alpha-value>)",
                    secondary: "rgb(var(--text-secondary) / <alpha-value>)",
                    muted: "rgb(var(--text-muted) / <alpha-value>)",
                },
                success: "rgb(var(--success) / <alpha-value>)",
                warning: "rgb(var(--warning) / <alpha-value>)",
                error: "rgb(var(--error) / <alpha-value>)",
                info: "rgb(var(--info) / <alpha-value>)",
            },
            fontFamily: {
                sans: [
                    "var(--font-geist-sans)",
                    "Inter",
                    "system-ui",
                    "-apple-system",
                    "sans-serif",
                ],
                mono: [
                    "var(--font-geist-mono)",
                    "JetBrains Mono",
                    "Fira Code",
                    "monospace",
                ],
            },
            animation: {
                "fade-in": "fadeIn 0.5s ease-in-out",
                "slide-up": "slideUp 0.5s ease-out",
                "slide-down": "slideDown 0.5s ease-out",
                "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                slideUp: {
                    "0%": { transform: "translateY(20px)", opacity: "0" },
                    "100%": { transform: "translateY(0)", opacity: "1" },
                },
                slideDown: {
                    "0%": { transform: "translateY(-20px)", opacity: "0" },
                    "100%": { transform: "translateY(0)", opacity: "1" },
                },
            },
        },
    },
    plugins: [],
} satisfies Config;
