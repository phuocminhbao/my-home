import { createContext } from 'react';
import type { ThemeOption } from '~/config/mui.config';

type PageSetting = { theme: ThemeOption; language: 'vietnamese' | 'english' };

const PageSettingContext = createContext<
    [PageSetting, React.Dispatch<React.SetStateAction<PageSetting>>]
>([{ theme: 'light', language: 'vietnamese' }, () => {}]);

export default PageSettingContext;

export type { PageSetting };
