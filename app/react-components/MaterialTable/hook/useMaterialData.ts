import { useMemo } from 'react';
import {
    getInitAccordionRowData,
    getInitDetailsRowData,
    getInitDetailsRowDataWithNumber,
    roundNumber,
    updateTableData
} from '~/utils';
import _ from 'lodash';
import type { ConstructionSettlement, ConstructionSettlementTable } from '~/types';
import { EXCEL_DATA, EXCEL_DATA_SAVE_TIME } from '~/constants';
import useMaterialDataContext from './useMaterialDataContext';

const saveToLocalStorage = _.debounce(
    (dataSnapshot: ConstructionSettlementTable[]) => {
        localStorage.setItem(EXCEL_DATA, JSON.stringify(dataSnapshot));
        localStorage.setItem(EXCEL_DATA_SAVE_TIME, new Date().getTime().toString());
        console.log('Saved to local storage');
    },
    3000,
    { maxWait: 5000 }
);

const useMaterialData = () => {
    const { data, updateData } = useMaterialDataContext();

    const dataSnapshot = useMemo(() => _.cloneDeep(data), [data]);

    const checkAndUpdateData = () => {
        console.time('Updating time');
        updateTableData(dataSnapshot);
        console.timeEnd('Updating time');
        if (!_.isEqual(data, dataSnapshot)) {
            updateData(dataSnapshot);
            saveToLocalStorage(dataSnapshot);
            console.log('Call debouce');
        }
    };

    const generateData = () => {
        updateData((data) => [...data, getInitAccordionRowData()]);
    };

    const getRowData = (id: number): ConstructionSettlementTable | ConstructionSettlement => {
        for (const row of dataSnapshot) {
            if (row.id === id) return row;
            if (!_.isEmpty(row.details)) {
                for (const subRow of row.details) {
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
                if (!_.isNaN(Number(valueToupdate))) {
                    return roundNumber(Number(valueToupdate));
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
        // Check in main rows
        for (let i = 0; i < dataSnapshot.length; i++) {
            if (dataSnapshot[i].id === id) {
                dataSnapshot.splice(i, 1);
                checkAndUpdateData();
                return;
            }
            // Check in sub rows
            const details = dataSnapshot[i].details;
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
        // Check in main rows
        for (let i = 0; i < dataSnapshot.length; i++) {
            if (dataSnapshot[i].id === id) {
                dataSnapshot.splice(i + 1, 0, getInitAccordionRowData());
                checkAndUpdateData();
                return;
            }
            // Check in sub rows
            const details = dataSnapshot[i].details;
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
        // Check in main rows
        for (let i = 0; i < dataSnapshot.length; i++) {
            if (dataSnapshot[i].id === id) {
                if (i === 0) {
                    dataSnapshot.splice(0, 0, getInitAccordionRowData());
                } else {
                    dataSnapshot.splice(i - 1, 0, getInitAccordionRowData());
                }
                checkAndUpdateData();
                return;
            }
            // Check in sub rows
            const details = dataSnapshot[i].details;
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

    const addSubRowsById = (rowId: number) => {
        const defaultSubRows = getInitDetailsRowDataWithNumber();
        const foundMainRow = getRowData(rowId) as ConstructionSettlementTable;
        foundMainRow.details = defaultSubRows;
        checkAndUpdateData();
    };

    const addRowBelowWithRowById = (rowToAdd: ConstructionSettlement, subRowId: number) => {
        const foundMainRow = dataSnapshot.find((row) =>
            row.details.some((subRow) => subRow.id === subRowId)
        );

        if (!foundMainRow)
            throw new Error('Cannot find any row contain sub row with id: ' + subRowId);

        foundMainRow.details.every((subRow, index) => {
            if (subRow.id === subRowId) {
                foundMainRow.details.splice(index + 1, 0, rowToAdd);
                checkAndUpdateData();
                // Break the loop
                return false;
            }
            return true;
        });
    };

    const addSumRowBelowById = (subRowId: number) => {
        const sumRow: ConstructionSettlement = {
            ...getInitDetailsRowData(),
            isSum: true
        };

        addRowBelowWithRowById(sumRow, subRowId);
    };

    const addMutipleBelowById = (subRowId: number) => {
        const sumRow: ConstructionSettlement = {
            ...getInitDetailsRowData(),
            length: '',
            isMultiply: true
        };

        addRowBelowWithRowById(sumRow, subRowId);
    };

    const getFinalCost = (): number => {
        let cost = 0;
        data.forEach((mainRow) => {
            cost += mainRow.totalCost ?? 0;
            mainRow.details.forEach((subRow) => {
                if (subRow.totalCost) {
                    cost += subRow.totalCost;
                }
            });
        });
        return cost;
    };

    return {
        data,
        generateData,
        updateRowDataById,
        removeRowById,
        addRowAboveById,
        addRowBelowById,
        addSubRowsById,
        addSumRowBelowById,
        addMutipleBelowById,
        getFinalCost,
        saveToLocalStorage
    };
};

export default useMaterialData;
