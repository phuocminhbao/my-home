import { Backdrop, CircularProgress } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { isGlobalLoadingAtom } from '~/recoil/atoms/isGlobalLoadingAtom';

export default function Loading() {
    const isLoading = useRecoilValue(isGlobalLoadingAtom);

    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    );
}
