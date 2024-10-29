import { AppBar, Toolbar, Stack, Typography, Button } from '@mui/material';
import useLayoutSize from '~/hook/useLayoutSize';
import { useNavigate } from '@remix-run/react';
import { DrawerMenu, BreadcrumbsMenu } from './AppMenu';

const TopBar = () => {
    const { isMobile } = useLayoutSize();
    const navigate = useNavigate();
    return (
        <AppBar
            position="static"
            variant="outlined"
            elevation={0}
            enableColorOnDark={true}
            sx={[(theme) => ({ backgroundColor: theme.palette.background.default })]}
        >
            <Toolbar variant="dense">
                <Stack direction="row" width="100%" justifyContent="space-between">
                    <Button
                        variant="text"
                        disableElevation
                        onClick={() => {
                            navigate('/');
                        }}
                    >
                        <Typography variant="h5">VĂN TRỊ</Typography>
                    </Button>
                    {isMobile ? <DrawerMenu /> : <BreadcrumbsMenu />}
                </Stack>
            </Toolbar>
        </AppBar>
    );
};

export default TopBar;
