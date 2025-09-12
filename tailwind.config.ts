import type { Config } from 'tailwindcss';

const config: Config = {
    darkMode: ['class'],
    content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        extend: {
            colors: {
                background: 'oklch(var(--color-background) / <alpha-value>)',
                foreground: 'oklch(var(--color-foreground) / <alpha-value>)',
                'secondary-dark': 'oklch(var(--color-secondary-dark) / <alpha-value>)',
                
                card: {
                    DEFAULT: 'oklch(var(--color-card) / <alpha-value>)',
                    foreground: 'oklch(var(--color-card-foreground) / <alpha-value>)',
                },

                popover: {
                    DEFAULT: 'oklch(var(--color-popover) / <alpha-value>)',
                    foreground: 'oklch(var(--color-popover-foreground) / <alpha-value>)',
                },

                primary: {
                    DEFAULT: 'oklch(var(--color-primary) / <alpha-value>)',
                    foreground: 'oklch(var(--color-primary-foreground) / <alpha-value>)',
                },

                secondary: {
                    DEFAULT: 'oklch(var(--color-secondary) / <alpha-value>)',
                    foreground: 'oklch(var(--color-secondary-foreground) / <alpha-value>)',
                },

                muted: {
                    DEFAULT: 'oklch(var(--color-muted) / <alpha-value>)',
                    foreground: 'oklch(var(--color-muted-foreground) / <alpha-value>)',
                },

                accent: {
                    DEFAULT: 'oklch(var(--color-accent) / <alpha-value>)',
                    foreground: 'oklch(var(--color-accent-foreground) / <alpha-value>)',
                },

                destructive: 'oklch(var(--color-destructive) / <alpha-value>)',
                border: 'oklch(var(--color-border) / <alpha-value>)',
                input: 'oklch(var(--color-input) / <alpha-value>)',
                ring: 'oklch(var(--color-ring) / <alpha-value>)',

                chart: {
                    1: 'oklch(var(--color-chart-1) / <alpha-value>)',
                    2: 'oklch(var(--color-chart-2) / <alpha-value>)',
                    3: 'oklch(var(--color-chart-3) / <alpha-value>)',
                    4: 'oklch(var(--color-chart-4) / <alpha-value>)',
                    5: 'oklch(var(--color-chart-5) / <alpha-value>)',
                },

                cards: {
                    1: 'oklch(var(--color-card-1) / <alpha-value>)',
                    2: 'oklch(var(--color-card-2) / <alpha-value>)',
                    3: 'oklch(var(--color-card-3) / <alpha-value>)',
                    4: 'oklch(var(--color-card-4) / <alpha-value>)',
                },

                sidebar: {
                    DEFAULT: 'oklch(var(--color-sidebar) / <alpha-value>)',
                    foreground: 'oklch(var(--color-sidebar-foreground) / <alpha-value>)',
                    primary: 'oklch(var(--color-sidebar-primary) / <alpha-value>)',
                    'primary-foreground': 'oklch(var(--color-sidebar-primary-foreground) / <alpha-value>)',
                    accent: 'oklch(var(--color-sidebar-accent) / <alpha-value>)',
                    'accent-foreground': 'oklch(var(--color-sidebar-accent-foreground) / <alpha-value>)',
                    border: 'oklch(var(--color-sidebar-border) / <alpha-value>)',
                    ring: 'oklch(var(--color-sidebar-ring) / <alpha-value>)',
                },
            },
            fontFamily: {
                sans: ['var(--font-rubik)', 'sans-serif'],
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
        },
    },
    plugins: [],
};
export default config;
