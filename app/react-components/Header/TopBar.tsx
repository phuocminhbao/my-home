import {
    AppBar,
    Box,
    Toolbar,
    Stack,
    Typography,
    Drawer,
    List,
    Divider,
    Button
} from '@mui/material';
import LanguageChange from './LanguageChange';
import ThemeChange from './ThemeChange';
import useLayoutSize from '~/hook/useLayoutSize';
import { Menu } from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from '@remix-run/react';

const TopBar = () => {
    const { isMobile } = useLayoutSize();
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const navigate = useNavigate();
    return (
        <>
            <AppBar position="fixed" color="primary">
                <Toolbar>
                    <Stack direction="row" width="100%" justifyContent="space-between">
                        <Button
                            variant="contained"
                            color="primary"
                            disableElevation
                            onClick={() => {
                                navigate('/');
                            }}
                        >
                            <Typography variant="h6">VĂN TRỊ</Typography>
                        </Button>
                        {isMobile ? (
                            <Box alignContent="center">
                                <Menu
                                    onClick={() => {
                                        setIsOpenDrawer(true);
                                    }}
                                />
                                <Drawer
                                    open={isOpenDrawer}
                                    onClose={() => {
                                        setIsOpenDrawer(false);
                                    }}
                                    anchor="top"
                                >
                                    <List></List>
                                    <Divider />
                                    <List>
                                        <LanguageChange />
                                        <ThemeChange />
                                    </List>
                                </Drawer>
                            </Box>
                        ) : (
                            <Box>
                                <LanguageChange />
                                <ThemeChange />
                            </Box>
                        )}
                    </Stack>
                </Toolbar>
            </AppBar>
        </>
    );
};

export default TopBar;
