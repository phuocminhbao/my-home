import { useState } from 'react';
import MaterialDataContext from '../context/MaterialDataContext';
import { getInitTableData } from '~/utils';
import type { ConstructionSettlementTable } from '~/types';
import { EXCEL_DATA, EXCEL_DATA_SAVE_TIME } from '~/constants';

const MAX_EXCEL_DATA_TTL = 24;

const MaterialDataProvider = ({ children }: { children: JSX.Element }) => {
    const [materialData, setMaterialData] = useState<ConstructionSettlementTable[]>(() => {
        const localStorageData = localStorage.getItem(EXCEL_DATA) ?? '[]';
        const lastSaveTime = new Date(localStorage.getItem(EXCEL_DATA_SAVE_TIME) ?? '');
        const isExpire = new Date().getHours() - lastSaveTime.getHours() > MAX_EXCEL_DATA_TTL;
        return isExpire ? getInitTableData() : JSON.parse(localStorageData);
    });

    return (
        <MaterialDataContext.Provider value={{ data: materialData, updateData: setMaterialData }}>
            {children}
        </MaterialDataContext.Provider>
    );
};

export { MaterialDataProvider };
