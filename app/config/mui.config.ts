import type { ThemeOptions } from '@mui/material';
import { createTheme } from '@mui/material';

const typography = {
    fontFamily: [
        'Roboto',
        'Open Sans',
        'Noto Sans',
        'Arial',
        'sans-serif',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Helvetica Neue',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        '-apple-system'
    ].join(','),
    fontSize: 14,
    h1: {
        fontSize: '2.4rem', // Main page headers
        fontWeight: 700,
        lineHeight: 1.3 // Increased line height for clarity with diacritics
    },
    h2: {
        fontSize: '2rem', // Section headers
        fontWeight: 600,
        lineHeight: 1.4
    },
    h3: {
        fontSize: '1.6rem', // Product title or smaller headers
        fontWeight: 600,
        lineHeight: 1.4
    },
    h4: {
        fontSize: '1.4rem', // Used for accent headers or product specifications
        fontWeight: 500,
        lineHeight: 1.5
    },
    body1: {
        fontSize: '1rem', // Main body text
        fontWeight: 400,
        lineHeight: 1.7 // Increased for readability with Vietnamese diacritics
    },
    body2: {
        fontSize: '0.875rem', // Secondary body text, e.g., for descriptions
        fontWeight: 400,
        lineHeight: 1.7
    },
    subtitle1: {
        fontSize: '1.1rem', // For product detail subtitles or small highlights
        fontWeight: 500,
        lineHeight: 1.6
    },
    button: {
        fontSize: '0.875rem',
        fontWeight: 600,
        textTransform: 'uppercase', // Capitalized style for buttons
        lineHeight: 1.5
    },
    caption: {
        fontSize: '0.75rem', // For small hints, labels, or footer text
        fontWeight: 400,
        lineHeight: 1.5
    }
};

const components: ThemeOptions['components'] = {
    MuiAppBar: {},
    MuiUseMediaQuery: {
        defaultProps: {
            noSsr: true
        }
    }
};

const themeOptions = {
    light: {
        palette: {
            mode: 'light',
            primary: {
                main: '#000000' // Black for primary accents and interactive elements
            },
            secondary: {
                main: '#333333' // Dark gray for secondary elements
            },
            background: {
                default: '#FFFFFF', // Pure white for main background
                paper: '#F9F9F9' // Near-white for card and modal backgrounds
            },
            text: {
                primary: '#000000', // Black for primary text
                secondary: '#555555' // Gray for secondary text
            },
            accent: {
                main: '#333333' // Optional dark gray for subtle highlights
            }
        },
        typography,
        components
    } as ThemeOptions,
    dark: {
        palette: {
            mode: 'dark',
            background: {
                default: '#000000', // Black for main background
                paper: '#1E1E1E' // Dark gray for cards or modals
            },
            primary: {
                main: '#FFFFFF' // White for primary accents and interactive elements
            },
            secondary: {
                main: '#CCCCCC' // Light gray for secondary elements
            },
            text: {
                primary: '#FFFFFF', // White for main text
                secondary: '#B0B0B0', // Light gray for secondary text
                disabled: '#666666' // Dim gray for disabled elements
            }
        },
        typography,
        components
    } as ThemeOptions
};

type ThemeOption = keyof typeof themeOptions;

const createCustomTheme = (mode: ThemeOption) => createTheme(themeOptions[mode]);

export { createCustomTheme, themeOptions };

export type { ThemeOption };
