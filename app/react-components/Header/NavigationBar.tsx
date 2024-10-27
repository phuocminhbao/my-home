import { CloseRounded, Menu } from '@mui/icons-material';
import {
    AppBar,
    Box,
    Button,
    Container,
    Divider,
    Drawer,
    IconButton,
    MenuItem
} from '@mui/material';
import { useState } from 'react';

const NavigationBar = () => {
    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };
    return (
        <AppBar position="fixed">
            <Container maxWidth="lg">
                <Box>
                    <Box>
                        <Button variant="text" color="info" size="small">
                            Features
                        </Button>
                        <Button variant="text" color="info" size="small">
                            Testimonials
                        </Button>
                        <Button variant="text" color="info" size="small">
                            Highlights
                        </Button>
                        <Button variant="text" color="info" size="small">
                            Pricing
                        </Button>
                        <Button variant="text" color="info" size="small">
                            FAQ
                        </Button>
                        <Button variant="text" color="info" size="small">
                            Blog
                        </Button>
                    </Box>
                </Box>
                <Box>
                    <Button color="primary" variant="text" size="small">
                        Sign in
                    </Button>
                    <Button color="primary" variant="contained" size="small">
                        Sign up
                    </Button>
                    {/* <ColorModeIconDropdown /> */}
                </Box>
                <Box>
                    {/* <ColorModeIconDropdown size="medium" /> */}
                    <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
                        <Menu />
                    </IconButton>
                    <Drawer anchor="top" open={open} onClose={toggleDrawer(false)} PaperProps={{}}>
                        <Box>
                            <Box>
                                <IconButton onClick={toggleDrawer(false)}>
                                    <CloseRounded />
                                </IconButton>
                            </Box>

                            <MenuItem>Features</MenuItem>
                            <MenuItem>Testimonials</MenuItem>
                            <MenuItem>Highlights</MenuItem>
                            <MenuItem>Pricing</MenuItem>
                            <MenuItem>FAQ</MenuItem>
                            <MenuItem>Blog</MenuItem>
                            <Divider />
                            <MenuItem>
                                <Button color="primary" variant="contained" fullWidth>
                                    Sign up
                                </Button>
                            </MenuItem>
                            <MenuItem>
                                <Button color="primary" variant="outlined" fullWidth>
                                    Sign in
                                </Button>
                            </MenuItem>
                        </Box>
                    </Drawer>
                </Box>
            </Container>
        </AppBar>
    );
};

export default NavigationBar;
