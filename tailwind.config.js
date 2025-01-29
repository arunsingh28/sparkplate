import { colors } from './src/media/colors.ts';

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                roboto: ['Roboto', 'sans-serif'],
            },
            colors: {
                ...colors,
            },
        },
    },
    plugins: [],
};
