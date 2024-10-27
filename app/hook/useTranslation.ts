import type { PageSetting } from '~/context/PageSettingContext';
import type { translationKey } from '~/i18n/vn_VN';
import { translationVN } from '~/i18n/vn_VN';
import { translationEN } from '~/i18n/en_US';
import usePageSettingContext from './usePageSettingContext';

const LANGUAGE_MAP: Record<PageSetting['language'], Record<translationKey, string>> = {
    vietnamese: translationVN,
    english: translationEN
};

const useTranslation = () => {
    const [pageSetting] = usePageSettingContext();
    const { language } = pageSetting;
    const translation = LANGUAGE_MAP[language];
    const translate = (key: translationKey): string => {
        return translation[key];
    };

    return { translate };
};

export default useTranslation;
