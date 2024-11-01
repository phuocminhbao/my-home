import { atom } from 'recoil';

type Language = 'vietnamese' | 'english';

const languageAtom = atom<Language>({
    key: 'languageAtom',
    default: 'english'
});

export { languageAtom };
export type { Language };
