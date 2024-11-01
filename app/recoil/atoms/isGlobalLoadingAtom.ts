import { atom } from 'recoil';

const isGlobalLoadingAtom = atom({
    key: 'isGlobalLoadingAtom',
    default: true
});

export { isGlobalLoadingAtom };
