// tailwind.config.js
const plugin = require('tailwindcss/plugin');

module.exports = {

     content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],

  theme: {
    extend: {
      colors: {
        whiteBgText: '#060C2A',  // Text on white background
        whiteBgTextHover: '#f31524',
        whiteBgButtonBg: '#f31524',
        whiteBgButtonText: '#ffffff',
        darkBgText: '#ffffff',    // Text on dark background
        darkBgTextHover: '#ffffff',
        darkBgButtonBg: '#f2f2f2',
        darkBgButtonText: '#1d1d1d',
      },
      fontFamily: {
        primary: ['Titillium Web'],  // Primary font
        secondary: ['Mulish'],       // Secondary font
      },
    },
  },
  plugins: [
    // Optional typography plugin customization
    require('@tailwindcss/typography'),
    plugin(function({ addBase, theme }) {
      function toFontString(value) {
        return Array.isArray(value) ? value.join(', ') : value;
      }

      addBase({
        'body': {
          fontFamily: toFontString(theme('fontFamily.secondary')),
          color: theme('colors.whiteBgText'),
        },
        'h1, h2, h3, h4, h5, h6': {
          fontFamily: toFontString(theme('fontFamily.primary')),
        },
        'a': {
          color: theme('colors.whiteBgText'),
          transitionProperty: 'color',
          transitionDuration: '200ms',
          '&:hover': {
            color: theme('colors.whiteBgTextHover'),
          }
        },
        'button': {
          fontFamily: toFontString(theme('fontFamily.primary')),
          backgroundColor: theme('colors.whiteBgButtonBg'),
          color: theme('colors.whiteBgButtonText'),
          transitionProperty: 'background-color, color',
          transitionDuration: '200ms',
          '&:hover': {
            backgroundColor: theme('colors.whiteBgTextHover'),
            color: theme('colors.whiteBgButtonText'),
          }
        }
      });
    }),
  ],
};

// ---------------
// Colors 
// ---------------
// Variable Name      |  Usage Description                     |  Hex Color
// -------------------+----------------------------------------+-----------
// whiteBgText        |  Text color on white/light background  |  #060C2A  
// whiteBgTextHover   |  Text hover color on white/light bg    |  #f31524  
// whiteBgButtonBg    |  Button background color on white bg   |  #f31524  
// whiteBgButtonText  |  Button text color on white bg         |  #ffffff  
// darkBgText         |  Text color on dark background         |  #ffffff  
// darkBgTextHover    |  Text hover color on dark background   |  #ffffff  
// darkBgButtonBg     |  Button background color on dark bg    |  #f2f2f2  
// darkBgButtonText   |  Button text color on dark bg          |  #1d1d1d  

// ---------------
// Font typography
// ---------------

// Variable Name  |  Font Family (Google Fonts)   |  Usage                                  
// ---------------+-------------------------------+-----------------------------------------
// primary        |  'Titillium Web', sans-serif  |  Used for headings, important typography
// secondary      |  'Mulish', sans-serif         |  Used for body text, general typography 
