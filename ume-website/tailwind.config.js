/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 🔵 Navy - យកពណ៌ខៀវពី Logo UME
        navy: {
          DEFAULT: '#0F4CBA',      // ពណ៌ខៀវ UME ពិតប្រាកដ
          light: '#2563EB',        // ខៀវភ្លឺ
          dark: '#0A3580',         // ខៀវងងឹត
          lighter: '#3B82F6',      // ខៀវស្រាល
          '50': '#EFF6FF',
          '100': '#DBEAFE',
          '200': '#BFDBFE',
          '300': '#93C5FD',
          '400': '#60A5FA',
          '500': '#3B82F6',
          '600': '#2563EB',
          '700': '#0F4CBA',
          '800': '#0A3580',
          '900': '#061F4A',
        },
        
        // 🟡 Gold - យកពណ៌មាសពី Logo UME
        gold: {
          DEFAULT: '#F5A623',      // ពណ៌មាស UME ពិតប្រាកដ
          light: '#F8BC5C',        // មាសភ្លឺ
          dark: '#C88110',         // មាសងងឹត
          lighter: '#FBD89D',      // មាសស្រាល
          '50': '#FFFDF5',
          '100': '#FEF3C7',
          '200': '#FDE68A',
          '300': '#FBD89D',
          '400': '#F8BC5C',
          '500': '#F5A623',
          '600': '#D97706',
          '700': '#C88110',
          '800': '#92400E',
          '900': '#78350F',
        },
        
        // 🔴 Crimson - យកពណ៌ក្រហមពី Logo UME
        crimson: {
          DEFAULT: '#E51B24',      // ពណ៌ក្រហម UME ពិតប្រាកដ
          light: '#EF4444',        // ក្រហមភ្លឺ
          dark: '#B91C1C',         // ក្រហមងងឹត
          '50': '#FEF2F2',
          '100': '#FEE2E2',
          '500': '#EF4444',
          '600': '#E51B24',
          '700': '#B91C1C',
        },
        
        // 🟠 Amber
        amber: {
          DEFAULT: '#F5A623',
          light: '#F8BC5C',
          dark: '#C88110',
          '50': '#FFFDF5',
          '100': '#FEF3C7',
          '200': '#FBD89D',
          '300': '#F8BC5C',
          '400': '#F5A623',
          '500': '#D97706',
          '600': '#C88110',
          '700': '#92400E',
        },
        
        // 🌙 Dark Mode - ស៊ីជាមួយ Logo (ខៀវងងឹត + មាស)
        dark: {
          bg: {
            primary: '#061F4A',     // ខៀវ UME ងងឹតបំផុត (navy-900)
            secondary: '#0A3580',   // ខៀវ UME ងងឹត (navy-800)
            card: '#0F1B3D',        // ខៀវងងឹតសម្រាប់ card
            hover: '#132B5C',       // ខៀវភ្លឺបន្តិចសម្រាប់ hover
            input: '#0F1B3D',
          },
          text: {
            primary: '#F8FAFC',     // សស្អាត
            secondary: '#CBD5E1',   // ស្រអាប់បន្តិច
            muted: '#94A3B8',       // ស្រអាប់
          },
          border: {
            DEFAULT: '#1E3A6E',     // ខៀវសម្រាប់ border
            light: '#2A4A8A',       // ខៀវភ្លឺសម្រាប់ border
          },
          accent: {
            gold: '#F5A623',        // មាស UME
            goldLight: '#F8BC5C',   // មាសភ្លឺ
            crimson: '#E51B24',     // ក្រហម UME
            navy: '#0F4CBA',        // ខៀវ UME
          }
        },
        
        // ☀️ Light Mode - សស្អាត
        light: {
          bg: {
            primary: '#F8FAFC',
            secondary: '#FFFFFF',
            card: '#FFFFFF',
            hover: '#F1F5F9',
          },
          text: {
            primary: '#0F172A',
            secondary: '#475569',
            muted: '#64748B',
          }
        },
        
        offwhite: '#F8FAFC',
        cream: '#FFFFFF',
        ice: '#F1F5F9',
      },
      
      fontFamily: {
        sans: ['Inter', 'Noto Sans Khmer', 'sans-serif'],
        heading: ['Inter', 'Noto Sans Khmer', 'sans-serif'],
      },
      
      animation: {
        'fade-in-down': 'fade-in-down 0.8s ease-out',
        'fade-in-up': 'fade-in-up 0.8s ease-out 0.2s both',
        'fade-in': 'fade-in 0.6s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'pulse-gold': 'pulse-gold 2s ease-in-out infinite',
      },
      
      keyframes: {
        'fade-in-down': {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-gold': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
      
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      
      boxShadow: {
        'gold': '0 4px 20px rgba(245, 166, 35, 0.4)',
        'navy': '0 4px 20px rgba(15, 76, 186, 0.25)',
        'card': '0 2px 15px rgba(0, 0, 0, 0.08)',
        'crimson': '0 4px 16px rgba(229, 27, 36, 0.3)',
        'dark-card': '0 4px 20px rgba(0, 0, 0, 0.5)',
        'dark-gold': '0 4px 20px rgba(245, 166, 35, 0.2)',
        'lg': '0 10px 30px rgba(0, 0, 0, 0.15)',
        'xl': '0 20px 40px rgba(0, 0, 0, 0.2)',
      },
      
      backgroundImage: {
        'dark-gradient': 'linear-gradient(135deg, #061F4A 0%, #0A3580 50%, #0F1B3D 100%)',
        'gold-gradient': 'linear-gradient(135deg, #F5A623 0%, #F8BC5C 100%)',
        'navy-gradient': 'linear-gradient(135deg, #0F4CBA 0%, #2563EB 100%)',
      },
    },
  },
  plugins: [],
};