import { useContext } from 'react';
import MaterialDataContext from '../context/MaterialDataContext';

const useMaterialDataContext = () => {
    const context = useContext(MaterialDataContext);
    if (!context) {
        throw new Error('MaterialDataContext should be called in it provider');
    }
    return context;
};

export default useMaterialDataContext;
