import { createTheme } from '@mui/material';

const THEME = createTheme({
    typography: {
        fontFamily: [
            'Roboto',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
            '-apple-system'
        ].join(','),
        fontSize: 14
    }
});

export { THEME };
