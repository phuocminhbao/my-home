import { Box, Grid2, Typography } from '@mui/material';
import SectionContainer from '../SectionContainer/SectionContainer';

const TilecategoriesSection = () => {
    return (
        <SectionContainer>
            <Typography variant="h2">Tile Categories</Typography>
            <Box sx={{ flexGrow: 1 }}>
                <Grid2
                    container
                    spacing={{ mobile: 2, laptop: 3 }}
                    columns={{ mobile: 4, tablet: 8, laptop: 12 }}
                >
                    {Array.from(Array(6)).map((_, index) => (
                        <Grid2 key={index} size={{ mobile: 2, tablet: 4, laptop: 3 }}>
                            <Typography>{index + 1}</Typography>
                        </Grid2>
                    ))}
                </Grid2>
            </Box>
        </SectionContainer>
    );
};

export default TilecategoriesSection;
