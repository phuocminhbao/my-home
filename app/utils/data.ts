import { initDetailsRowData } from '~/contants';
import { idHandler, toRoman } from '.';
import type { ConstructionSettlement, ConstructionSettlementTable } from '~/types';
import _ from 'lodash';

const calculatingMeters = (data: ConstructionSettlementTable | ConstructionSettlement) => {
    const { length, width, quantity } = data;
    let result = 0;
    if (_.isNumber(length) && length && width && quantity) {
        result = length * width * quantity;
    }
    if (length && String(length).includes('+')) {
        // Removing all spaces and split by +
        const lengths = String(length).replaceAll(' ', '').split('+');
        lengths.forEach((len) => {
            result += Number(len);
        });
    }

    data.squareMeters = Number(result.toFixed(2));
};

const formatRow = (data: ConstructionSettlementTable | ConstructionSettlement) => {
    const { length, width, quantity, price } = data;
    if (length) {
        data.length = _.isNaN(Number(length)) ? length : Number(length);
    }
    if (width) {
        data.width = Number(width);
    }
    if (quantity) {
        data.quantity = Number(quantity);
    }
    if (price) {
        data.price = Number(price);
    }
};
const updateSelectAccRow = (data: ConstructionSettlementTable) => {
    const isSelected = !data.isSelected;
    data.isSelected = isSelected;
    if (!_.isEmpty(data.details)) {
        data.details.forEach((row) => (row.isSelected = isSelected));
    }
};

const updateSelectAccRowOnly = (data: ConstructionSettlementTable) => {
    if (!data.details.some((value) => value.isSelected === false)) {
        data.isSelected = true;
        return;
    }
    data.isSelected = false;
};

export const updateSelectSubRow = (accData: ConstructionSettlementTable, startLoop: number) => {
    if (!_.isEmpty(accData.details)) return;
    const rowsWithCategoryIndex = accData.details
        .map((subRow, ind) => {
            if (_.isEmpty(subRow.category)) return;
            return ind;
        })
        .filter((i) => !_.isNil(i));
    if (_.isEmpty(rowsWithCategoryIndex) || !rowsWithCategoryIndex) return;
    const isSelected = !accData.details[startLoop].isSelected;

    // Update select rows
    accData.details[startLoop].isSelected = isSelected;

    // Update rows below until reach to row that existed category
    const startIndex = rowsWithCategoryIndex?.indexOf(startLoop);
    let endLoop = rowsWithCategoryIndex[startIndex + 1] as number;
    // If end = undifined then end = details length
    if (!endLoop) endLoop = accData.details.length;
    for (let i = startLoop; i < endLoop; i++) {
        if (accData.details) {
            accData.details[i].isSelected = isSelected;
        }
    }
};

const calculateTotalCost = (row: ConstructionSettlementTable) => {
    const { squareMeters, price } = row;
    if (!_.isNil(price) && price >= 0) {
        row.totalCost = squareMeters! * price;
    }
};

const updateTableData = (tableData: ConstructionSettlementTable[]) => {
    console.log('Updating data ...');
    tableData.forEach((row, index) => {
        row.order = toRoman(index + 1);
        formatRow(row);
        calculatingMeters(row);
        calculateTotalCost(row);
        // updateSelectAccRowOnly(row);

        let subOrder = 1;

        if (!_.isEmpty(row.details)) {
            row.details.forEach((subRow) => {
                if (_.isEmpty(subRow.category)) {
                    subRow.order = null;
                } else {
                    subRow.order = subOrder;
                    subOrder++;
                }
                formatRow(subRow);
                calculatingMeters(subRow);
                // if (subRow.category)
                //     updateSelectSubRow(row, subInd, rowWithCategoryIndex, subRow.isSelected);
            });
        }
    });
};

const ID_HANDLER = idHandler();

const getInitDetailsRowData = (): ConstructionSettlement => {
    return {
        ...initDetailsRowData,
        id: ID_HANDLER.getUniqueID()
    };
};

const getInitDetailsRowDataWithNumber = (detailsAmount: number = 4): ConstructionSettlement[] => {
    const detailrows: ConstructionSettlement[] = [];
    for (let i = 0; i < detailsAmount; i++) {
        detailrows.push(getInitDetailsRowData());
    }
    return detailrows;
};

const getInitAccordionRowData = (): ConstructionSettlementTable => {
    return {
        ...getInitDetailsRowData(),
        details: getInitDetailsRowDataWithNumber(),
        isSum: true
    };
};

const getInitTableData = (amount: number = 2): ConstructionSettlementTable[] => {
    const rows: ConstructionSettlementTable[] = [];
    for (let i = 0; i < amount; i++) {
        rows.push(getInitAccordionRowData());
    }
    return rows;
};

export {
    updateTableData,
    getInitTableData,
    getInitAccordionRowData,
    getInitDetailsRowData,
    getInitDetailsRowDataWithNumber,
    updateSelectAccRow,
    updateSelectAccRowOnly
};
