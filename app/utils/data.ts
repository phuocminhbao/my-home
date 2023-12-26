import { initDetailsRowData } from '~/contants';
import { getUniqueID, toRoman } from '.';
import { ConstructionSettlement, ConstructionSettlementTable } from '~/types';
import _ from 'lodash';

function calculatingMeters(data: ConstructionSettlementTable | ConstructionSettlement) {
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
}

function formatRow(data: ConstructionSettlementTable | ConstructionSettlement) {
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
}

function updateTableData(tableData: ConstructionSettlementTable[]) {
    console.log('Updating data ...');
    tableData.forEach((row, index) => {
        row.order = toRoman(index + 1);
        formatRow(row);
        calculatingMeters(row);

        let subOrder = 1;
        row.details?.forEach((subRow) => {
            if (_.isEmpty(subRow.category)) {
                subRow.order = null;
            } else {
                subRow.order = subOrder;
                subOrder++;
            }
            formatRow(subRow);
            calculatingMeters(subRow);
        });
    });
}

function getInitDetailsRowData(): ConstructionSettlement {
    return {
        id: getUniqueID(),
        ...initDetailsRowData
    };
}

function getInitDetailsRowDataWithNumber(detailsAmount: number = 4): ConstructionSettlement[] {
    const detailrows: ConstructionSettlement[] = [];
    for (let i = 0; i < detailsAmount; i++) {
        detailrows.push(getInitDetailsRowData());
    }
    return detailrows;
}

function getInitAccordionRowData(): ConstructionSettlementTable {
    return {
        ...getInitDetailsRowData(),
        details: getInitDetailsRowDataWithNumber()
    };
}

function getInitTableData(amount: number = 2): ConstructionSettlementTable[] {
    const rows: ConstructionSettlementTable[] = [];
    for (let i = 0; i < amount; i++) {
        rows.push(getInitAccordionRowData());
    }
    
    return rows;
}

export {
    updateTableData,
    getInitTableData,
    getInitAccordionRowData,
    getInitDetailsRowData,
    getInitDetailsRowDataWithNumber
};
