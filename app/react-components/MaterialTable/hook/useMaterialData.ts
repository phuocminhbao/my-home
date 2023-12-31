import { useContext, useEffect, useMemo } from 'react';
import MaterialDataContext from '../context/MaterialDataContext';
import {
    getInitAccordionRowData,
    getInitDetailsRowData,
    roundNumber,
    updateTableData
} from '~/utils';
import _, { forIn } from 'lodash';
import { ConstructionSettlement, ConstructionSettlementTable } from '~/types';

const useMaterialData = () => {
    const { data, updateData } = useContext(MaterialDataContext);

    const clonedData = useMemo(() => _.cloneDeep(data), [data]);

    const forceUpdateData = () => {
        updateTableData(clonedData);
        updateData(clonedData);
    };

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
        for (const row of clonedData) {
            if (row.id === id) return row;
            if (!_.isEmpty(row.details)) {
                for (const subRow of row.details!) {
                    if (subRow.id === id) return subRow;
                }
            }
        }

        throw new Error("Can't find row with id: " + id);
    };

    const formatValue = (
        fieldToUpdate: keyof ConstructionSettlement,
        valueToupdate: string | number | null
    ): string | number | null => {
        if (valueToupdate === null) return null;
        switch (fieldToUpdate) {
            case 'length':
            case 'width':
            case 'squareMeters':
                if (_.isNumber(valueToupdate)) {
                    return roundNumber(valueToupdate);
                }
            default:
                return valueToupdate;
        }
    };

    const updateRowDataById = (
        id: number,
        fieldToUpdate: keyof ConstructionSettlement,
        valueToupdate: string | number | null
    ) => {
        const rowData = getRowData(id);
        const value = formatValue(fieldToUpdate, valueToupdate);
        rowData[fieldToUpdate] = value as never;
        checkAndUpdateData();
    };

    const removeRowById = (id: number) => {
        for (let i = 0; i < clonedData.length; i++) {
            if (clonedData[i].id === id) {
                clonedData.splice(i, 1);
                checkAndUpdateData();
                return;
            }
            const details = clonedData[i].details!;
            if (!_.isEmpty(details)) {
                for (let j = 0; j < details.length; j++) {
                    if (details[j].id === id) {
                        details.splice(j, 1);
                        checkAndUpdateData();
                        return;
                    }
                }
            }
        }
        throw new Error('No element matched id: ' + id);
    };

    const addRowBelowById = (id: number) => {
        for (let i = 0; i < clonedData.length; i++) {
            if (clonedData[i].id === id) {
                clonedData.splice(i + 1, 0, getInitAccordionRowData());
                checkAndUpdateData();
                return;
            }
            const details = clonedData[i].details!;
            if (!_.isEmpty(details)) {
                for (let j = 0; j < details.length; j++) {
                    if (details[j].id === id) {
                        details.splice(j + 1, 0, getInitDetailsRowData());
                        checkAndUpdateData();
                        return;
                    }
                }
            }
        }
        throw new Error('No element matched id: ' + id);
    };

    const addRowAboveById = (id: number) => {
        for (let i = 0; i < clonedData.length; i++) {
            if (clonedData[i].id === id) {
                if (i === 0) {
                    clonedData.splice(0, 0, getInitAccordionRowData());
                } else {
                    clonedData.splice(i - 1, 0, getInitAccordionRowData());
                }
                checkAndUpdateData();
                return;
            }
            const details = clonedData[i].details!;
            if (!_.isEmpty(details)) {
                for (let j = 0; j < details.length; j++) {
                    if (details[j].id === id) {
                        if (j === 0) {
                            details.splice(0, 0, getInitDetailsRowData());
                        } else {
                            details.splice(j - 1, 0, getInitDetailsRowData());
                        }
                        checkAndUpdateData();
                        return;
                    }
                }
            }
        }
        throw new Error('No element matched id: ' + id);
    };

    return {
        data,
        generateData,
        updateRowDataById,
        forceUpdateData,
        removeRowById,
        addRowAboveById,
        addRowBelowById
    };
};

export default useMaterialData;
