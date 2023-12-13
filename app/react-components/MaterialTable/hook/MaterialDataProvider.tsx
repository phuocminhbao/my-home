import { useState } from 'react';
import MaterialDataContext from '../context/MaterialDataContext';
import { getInitTableData } from '~/utils';

const MaterialDataProvider = ({ children }: { children: JSX.Element }) => {
    const [materialData, setMaterialData] = useState(() => getInitTableData());

    return (
        <MaterialDataContext.Provider value={{ data: materialData, updateData: setMaterialData }}>
            {children}
        </MaterialDataContext.Provider>
    );
};

export { MaterialDataProvider };
