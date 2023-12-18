import { useContext, useEffect, useMemo } from 'react';
import MaterialDataContext from '../context/MaterialDataContext';
import { getInitAccordionRowData, updateTableData } from '~/utils';
import _, { forIn } from 'lodash';
import { ConstructionSettlement, ConstructionSettlementTable } from '~/types';

const useMaterialData = () => {
    const { data, updateData } = useContext(MaterialDataContext);

    const clonedData = useMemo(() => _.cloneDeep(data), [data]);

    const forceUpdateData = () => {
        updateTableData(clonedData);
        updateData(clonedData);
    }

    const checkAndUpdateData = () => {
        console.time('Updating time');
        updateTableData(clonedData);
        console.timeEnd('Updating time');
        if (!_.isEqual(data, clonedData)) {
            updateData(clonedData);
        }
    };

    const generateData = () => {
        updateData((data) => [...data, getInitAccordionRowData()]);
    };

    const getRowData = (id: number): ConstructionSettlementTable | ConstructionSettlement => {
        for(const row of clonedData) {
            if(row.id === id) return row;
            if(!_.isEmpty(row.details)) {
                for(const subRow of row.details!) {
                    if(subRow.id === id) return subRow;
                }
            }
        }

        throw new Error("Can't find row with id: " + id);
    }

    const updateRowDataById = (id: number, fieldToUpdate: keyof ConstructionSettlement, valueToupdate: String | number | null) => {
        const rowData = getRowData(id);
        rowData[fieldToUpdate] = valueToupdate as never;
        checkAndUpdateData();
    }

    return { data, generateData, updateRowDataById, forceUpdateData };
};

export default useMaterialData;
