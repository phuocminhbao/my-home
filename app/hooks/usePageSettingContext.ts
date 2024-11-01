import { useContext } from 'react';
import PageSettingContext from '~/context/PageSettingContext';

const usePageSettingContext = () => {
    const pageSetting = useContext(PageSettingContext);
    if (!pageSetting) {
        throw new Error('Context is not called inside it provider');
    }
    return pageSetting;
};

export default usePageSettingContext;
