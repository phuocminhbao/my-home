import { useLayoutEffect, useState } from 'react';
import MaterialDataContext from '../context/MaterialDataContext';
import { getInitTableData } from '~/utils';
import type { ConstructionSettlementTable } from '~/types';
import { EXCEL_DATA, EXCEL_DATA_SAVE_TIME } from '~/constants';

const MAX_EXCEL_DATA_TTL = 24;

const MaterialDataProvider = ({ children }: { children: JSX.Element }) => {
    const [materialData, setMaterialData] = useState<ConstructionSettlementTable[]>([]);

    useLayoutEffect(() => {
        const localStorageData = localStorage.getItem(EXCEL_DATA);
        const lastSaveTime = localStorage.getItem(EXCEL_DATA_SAVE_TIME);
        if (localStorageData && lastSaveTime) {
            const isExpire =
                new Date().getHours() - new Date(lastSaveTime).getHours() > MAX_EXCEL_DATA_TTL;
            setMaterialData(isExpire ? getInitTableData() : JSON.parse(localStorageData));
        } else setMaterialData(getInitTableData());
    }, []);

    return (
        <MaterialDataContext.Provider value={{ data: materialData, updateData: setMaterialData }}>
            {children}
        </MaterialDataContext.Provider>
    );
};

export { MaterialDataProvider };
