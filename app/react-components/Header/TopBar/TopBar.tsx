import { AppBar, Toolbar, Stack, Typography, Button } from '@mui/material';
import useLayoutSize from '~/hooks/useLayoutSize';
import { useNavigate } from '@remix-run/react';
import { DrawerMenu, BreadcrumbsMenu } from './AppMenu';

const TopBar = () => {
    const {
        breakPoints: { desktopLarge }
    } = useLayoutSize();
    const navigate = useNavigate();
    return (
        <AppBar
            id="topbar"
            position="relative"
            variant="outlined"
            elevation={0}
            enableColorOnDark={true}
            sx={[
                (theme) => ({
                    backgroundColor: theme.palette.background.default,
                    zIndex: theme.zIndex.appBar
                })
            ]}
        >
            <Toolbar
                variant="dense"
                sx={{
                    justifyContent: 'center'
                }}
            >
                <Stack
                    direction="row"
                    width="100%"
                    justifyContent="space-between"
                    maxWidth={desktopLarge}
                >
                    <Button
                        variant="text"
                        disableElevation
                        onClick={() => {
                            navigate('/');
                        }}
                    >
                        <Typography variant="h5">VĂN TRỊ</Typography>
                    </Button>
                    <DrawerMenu />
                    <BreadcrumbsMenu />
                </Stack>
            </Toolbar>
        </AppBar>
    );
};

export default TopBar;
