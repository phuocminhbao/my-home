import { Close } from '@mui/icons-material';
import {
    Box,
    Paper,
    MenuList,
    MenuItem,
    Typography,
    Divider,
    Container,
    IconButton,
    Stack
} from '@mui/material';

const NavbarDropDown = ({ close }: { close: () => void }) => {
    return (
        <Box width="100%">
            <Paper square>
                <Stack direction="row">
                    <Container>
                        <MenuList variant="menu">
                            <MenuItem onClick={close}>
                                <Typography variant="overline">Đá đỏ</Typography>{' '}
                            </MenuItem>
                            <Divider />
                            <MenuItem onClick={close}>
                                <Typography variant="overline">Đá trắng</Typography>{' '}
                            </MenuItem>
                            <Divider />
                            <MenuItem onClick={close}>
                                <Typography variant="overline">Đá đen</Typography>{' '}
                            </MenuItem>
                        </MenuList>
                    </Container>
                    <Box alignItems="start">
                        <IconButton onClick={close}>
                            <Close />
                        </IconButton>
                    </Box>
                </Stack>
            </Paper>
        </Box>
    );
};

export default NavbarDropDown;
