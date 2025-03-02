import { heroui } from '@heroui/react';
import type { Config } from 'tailwindcss';

export default {
  content: [
    '.src/app/**/*.{js,ts,jsx,tsx,mdx}', // Folder 'app' contains UI elements.
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [heroui()],
} satisfies Config