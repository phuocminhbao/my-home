import { atom } from 'recoil';
import type { ThemeOption } from '~/config/mui.config';

const globalThemeAtom = atom<ThemeOption>({
    key: 'globalThemeAtom',
    default: 'light'
});

export { globalThemeAtom };
