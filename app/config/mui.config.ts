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

const themeOptions = {
    light: {
        palette: {
            mode: 'light',
            primary: {
                main: '#003366' // Deep Blue for primary buttons and accents
            },
            secondary: {
                main: '#8E8E8E' // Warm Gray for secondary elements
            },
            background: {
                default: '#F5F5F5', // Light gray for main background
                paper: '#FFFFFF' // Slightly lighter background for cards or modals
            },
            text: {
                primary: '#333333', // Charcoal for main text
                secondary: '#555555' // Slightly lighter for secondary text
            },
            accent: {
                main: '#3B7D57' // Optional olive green for special highlights
            }
        },
        typography
    } as ThemeOptions,
    dark: {
        palette: {
            mode: 'dark',
            primary: {
                main: '#4C8FFF' // Lighter blue for dark mode primary elements
            },
            secondary: {
                main: '#A6A6A6' // Soft gray for secondary accents
            },
            background: {
                default: '#1B1B1B', // Dark gray for main background
                paper: '#212121' // Slightly lighter for cards or modals
            },
            text: {
                primary: '#E0E0E0', // Light gray for main text
                secondary: '#BDBDBD' // Even lighter gray for secondary text
            },
            accent: {
                main: '#8BC683' // Softer green for interactive states or highlights
            }
        },
        typography,
        components: {
            MuiAppBar: {
                defaultProps: {
                    enableColorOnDark: true,
                    color: 'primary'
                }
            }
        }
    } as ThemeOptions
};

type ThemeOption = keyof typeof themeOptions;

const createCustomTheme = (mode: ThemeOption) => createTheme(themeOptions[mode]);

export { createCustomTheme, themeOptions };

export type { ThemeOption };
