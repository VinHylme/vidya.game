const colors = require('tailwindcss/colors')
const SIZES = require('./common/static.js')

const allowableSizes = Object.keys(SIZES).reduce((o, key) => Object.assign(o, {[key]: `${SIZES[key]}px`}), {});

module.exports = {
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwind-scrollbar')
  ],
  content: [
    './pages/**/*.tsx',
    './components/**/*.tsx',
    './react-bricks/**/*.tsx',
    './node_modules/react-bricks-ui/**/*.js',
  ],
  darkMode: 'class',
  variants: {
    scrollbar: ['dark', 'rounded']
  },
  theme: {
    extend: {
      keyframes: {
        scroll: {
          '0%': {
            opacity: 1
          },
          '100%': {
            opacity: 0,
            transform: 'translateY(40px)'
          }
        }
      },
      animation: {
        scroll: 'scroll 1.5s infinite'
      },
      width: {
        ...allowableSizes,
      },
      maxWidth: {
        ...allowableSizes,
      },
      minWidth: {
        ...allowableSizes,
      },
      height: {
        ...allowableSizes,
      },
      maxHeight: {
        ...allowableSizes,
      },
      minHeight: {
        ...allowableSizes,
      },
      typography: {
        DEFAULT: {
          css: {
            'scrollbar-thin': {
              '&::-webkit-scrollbar': {
                width: '5px',
              }
      
            },
            margin: '0 auto',
            padding: '0',
            'max-width': '100%',
            'text-decoration': 'none',
            'color': colors.gray['100'],
            img: {
              'margin-top' : '0',
              'margin-bottom' : '0',
            },
            a: {
              'text-decoration': 'none',
              'font-size': '14px',
              'line-height': '22px',
              'letter-spacing': '2px',
              'font-family': 'Saira Semi Condensed',
              'margin-top': 0,
              'margin-bottom': 0,
            },
            h1: {
              'font-weight': 900,
              'font-size': '80px',
              'line-height': '80px',
              'font-family': 'Saira Semi Condensed',
              'text-transform': 'uppercase',
              'margin-top': 0,
              'margin-bottom': 0,
            },
            h2: {
              'font-weight': 900,
              'font-size': '60px',
              'line-height': '60px',
              'font-family': 'Saira Semi Condensed',
              'text-transform': 'uppercase',
              'margin-top': 0,
              'margin-bottom': 0,
              'text-decoration': 'none',
              'border': 'none'
            },
            h3: {
              'font-weight': 900,
              'font-size': '45px',
              'line-height': '45px',
              'font-family': 'Saira Semi Condensed',
              'text-transform': 'uppercase',
              'margin-top': 0,
              'margin-bottom': 0,
            },
            h4: {
              'font-weight': 900,
              'font-size': '32px',
              'font-family': 'Saira Semi Condensed',
              'line-height': '32px',
              'text-transform': 'uppercase',
              'margin-top': 0,
              'margin-bottom': 0,
            },
            h5: {
              'font-weight': 900,
              'font-size': '20px',
              'line-height': '20px',
              'font-family': 'Saira Semi Condensed',
              'text-transform': 'uppercase',
              'margin-top': 0,
              'margin-bottom': 0,
            },
            h6: {
              'font-weight': 900,
              'font-size': '14px',
              'line-height': '14px',
              'font-family': 'Saira Semi Condensed',
              'text-transform': 'uppercase',
              'margin-top': 0,
              'margin-bottom': 0,
            },
            p: {
              'font-size': '14px',
              'line-height': '22px',
              'font-family': 'Saira Semi Condensed',
              'letter-spacing': '2px',
              'margin-top': 0,
              'margin-bottom': 0,
            },
            div: {
              'line-height': '22px',
              'letter-spacing': '2px',
            }
          }
        }
      },
      letterSpacing: {
        'high-wide': '2px'
      },
      fontFamily: {
        'saria': ['Saira Semi Condensed', 'Roboto'],
        'nunito': ['Nunito', 'Roboto'],
        'poppins': ['Poppins', 'sans-serif'] 
      },
      transitionProperty: {
        'width': 'width',
        'margin': 'margin',
      }
    },
    boxShadow: {
      'dark-md': '0px 0px 80px rgba(0, 0, 0, 0.5)',
      'light-md': '0px 0px 60px rgba(199, 207, 255, 0.3)',
      'light': '0px 40px 60px -25px #C7CFFF4D',
      'dark': '0px 40px 80px -25px rgba(0, 0, 0, 0.5)',
    },
    colors: {
      ...colors,
      'primary': {
        '100': '#651AB7',
      },
      'secondary': {
        '100': '#C7CFFF'
      },
      'tertiary': {
        '100': '#E49696'
      },
      'true-red': {
        100: '#FF4365'
      },
      'true-teal': {
        100: '#63ADB7'
      },
      'true-dark': {
        100: '#0d0d0d',
        200: '#11081F',
        300: '#211436'
      },
      'true-light': {
        100: '#fafafa',
        200: '#FAFBFF',
        300: '#E9EBF3'
      },
      'accent-dark': {
        100: '#d3aaff',
        200: '#c574e8',
        700: '#734a9e',
        800: '#651AB7'
      },
      'accent-light': {
        100: '#c7cfff'
      }
    }
  },
}
