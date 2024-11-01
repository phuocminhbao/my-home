import type { translationKey } from '~/i18n/vn_VN';
import { translationVN } from '~/i18n/vn_VN';
import { translationEN } from '~/i18n/en_US';
import { useRecoilValue } from 'recoil';
import { languageAtom } from '~/recoil/atoms/languageAtom';
import type { Language } from '~/recoil/atoms/languageAtom';

const LANGUAGE_MAP: Record<Language, Record<translationKey, string>> = {
    vietnamese: translationVN,
    english: translationEN
};

const useTranslation = () => {
    const language = useRecoilValue(languageAtom);
    const translation = LANGUAGE_MAP[language];
    const translate = (key: translationKey): string => {
        return translation[key];
    };

    return { translate };
};

export default useTranslation;
