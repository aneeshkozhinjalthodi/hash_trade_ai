/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            colors: {
                background: "#0B0F19", // Deep rich dark
                surface: "#151B2B",    // Card background
                "surface-hover": "#1E2538",
                primary: "#3B82F6",    // Electric Blue
                "primary-dark": "#2563EB",
                secondary: "#64748B",  // Muted text
                accent: "#06B6D4",     // Cyan accent
                success: "#10B981",
                warning: "#F59E0B",
                danger: "#EF4444",
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'hero-glow': 'conic-gradient(from 180deg at 50% 50%, #2a8af6 0deg, #a853ba 180deg, #e92a67 360deg)',
            }
        },
    },
    plugins: [],
}
