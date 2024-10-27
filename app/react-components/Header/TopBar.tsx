import { AppBar, Grid2, Box, Toolbar } from '@mui/material';
import LanguageChange from './LanguageChange';
import ThemeChange from './ThemeChange';

const TopBar = () => {
    return (
        <AppBar position="fixed" color="primary">
            <Toolbar>
                <Grid2 width={'100vh'} container>
                    <Grid2 size={6}></Grid2>
                    <Grid2 size="grow" justifyItems="flex-end">
                        <Box>
                            <LanguageChange />
                            <ThemeChange />
                        </Box>
                    </Grid2>
                </Grid2>
            </Toolbar>
        </AppBar>
    );
};

export default TopBar;
