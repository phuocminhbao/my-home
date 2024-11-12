import { PlayArrow, KeyboardArrowLeft, KeyboardArrowRight, Pause } from '@mui/icons-material';
import { IconButton, Stack, Typography } from '@mui/material';

const CarouselControls = ({
    onNext,
    onPrevious,
    active,
    length,
    resumeOrPauseAutoPlay,
    isPaused
}: {
    onNext: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    onPrevious: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    length: number;
    active: number;
    isPaused: boolean;
    resumeOrPauseAutoPlay: () => void;
}) => {
    return (
        <Stack direction="row" width="100%" justifyContent="center">
            <IconButton onClick={resumeOrPauseAutoPlay}>
                {isPaused ? <Pause color="primary" /> : <PlayArrow color="primary" />}
            </IconButton>

            <IconButton onClick={onPrevious}>
                <KeyboardArrowLeft color="primary" />
            </IconButton>

            <Typography variant="body2" alignContent="center">{`${active} / ${length}`}</Typography>

            <IconButton onClick={onNext}>
                <KeyboardArrowRight color="primary" />
            </IconButton>
        </Stack>
    );
};

export default CarouselControls;
