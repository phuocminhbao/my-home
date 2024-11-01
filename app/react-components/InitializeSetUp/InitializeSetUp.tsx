import { useLayoutEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { isGlobalLoadingAtom } from '~/recoil/atoms/isGlobalLoadingAtom';
import Loading from '../Loading/Loading';

const InitializeSetUp = ({ children }: { children: React.ReactNode }) => {
    const setIsLoading = useSetRecoilState(isGlobalLoadingAtom);

    useLayoutEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 100);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            {children}
            <Loading />
        </>
    );
};

export default InitializeSetUp;
