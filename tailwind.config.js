/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    backgroundImage: {
      img1: "url('/car1.jpg')",
      img2: "url('/car2.jpg')",
      img3: "url('/car3.jpg')",
      img4: "url('/car4.jpg')",
      img5: "url('/car5.jpg')",
      img6: "url('/car6.jpg')",
      "img1-s": "url('/films.png')",
      "img2-s": "url('/nano.jpg')",
      "img3-s": "url('/paint-protection.png')",
      "img4-s": "url('/polish.jpg')",
      "img5-s": "url('/glass.jpg')",
      "img6-s": "url('/car6-s.jpeg')",
      main: "url('/landing.jpg')",
      carCabin: "url('/landing.jpg')",
      wheel: "url('/reserve.png')",
      shopping: "url('/shopping.png')",
      welcome: "url('/welcome.jpg')",
      carbon: "url('/carpon.webp')",
      who: "url('/whoAreUs.jpg')",
      map: "url('/map.jpg')",
      "opaque-gradient":
        "linear-gradient(to left, rgba(0,67,116,0.6) -26.48%, rgba(0,51,102,0.6) 73.52%)",
      room: "url('/3882.jpg')",
      package: "url('/package-bg.jpg')",
      "blue-red":
        "linear-gradient(to right, #f43b48 0%, #453a94 100%)",
    },
    fontFamily: {
      arabic: '"Almarai", sans-serif',
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      boxShadow: {
        blur: "#424584 0px 7px 29px 0px",
        box: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        "primary-gray": "#69696F",
        "light-gray": "#E4E4E7",
        primary: {
          DEFAULT: "#E62E2D",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
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
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
