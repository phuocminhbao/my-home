import Loading from '../Loading/Loading';
import { isGlobalLoadingAtom } from '~/recoil/atoms/isGlobalLoadingAtom';
import { useRecoilValue } from 'recoil';

const InitializeSetUp = ({ children }: { children: React.ReactNode }) => {
    const isLoading = useRecoilValue(isGlobalLoadingAtom);
    return isLoading ? <Loading /> : children;
};

export default InitializeSetUp;
