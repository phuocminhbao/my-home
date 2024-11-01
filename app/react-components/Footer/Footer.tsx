import {
    Box,
    Container,
    List,
    ListItem,
    ListItemText,
    Stack,
    Typography,
    useTheme
} from '@mui/material';
import _ from 'lodash';

const Footer = () => {
    const { palette } = useTheme();
    const backgroundColor = palette.primary.main;
    const contentColor = palette.background.default;
    const contents = _.range(1, 6).map((num) => `content ${num}`);
    const ContentCol = () => (
        <Stack direction="column" alignItems="center" useFlexGap>
            <Typography variant="h4" color={contentColor}>
                {`Header ${_.random(100000, false)}`}
            </Typography>
            <List>
                {contents.map((content) => {
                    return (
                        <ListItem key={content} alignItems="center">
                            <ListItemText primary={content} sx={{ color: contentColor }} />
                        </ListItem>
                    );
                })}
            </List>
        </Stack>
    );
    return (
        <Box component="footer" bgcolor={backgroundColor}>
            <Container sx={{ padding: '1rem' }}>
                <Stack direction="column">
                    <Typography variant="h2" color={contentColor} marginBottom="2rem">
                        Văn Trị
                    </Typography>
                    <Stack
                        direction="row"
                        justifyContent={'space-between'}
                        useFlexGap
                        flexWrap="wrap"
                        spacing={4}
                    >
                        <ContentCol />
                        <ContentCol />
                        <ContentCol />
                        <Box />
                        <ContentCol />
                    </Stack>
                </Stack>
            </Container>
        </Box>
    );
};

export default Footer;
