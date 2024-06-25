import type { Border, Cell, Worksheet } from 'exceljs';
import type { ConstructionSettlement, ConstructionSettlementTable } from '~/types';
import type { ProccessRow } from './types';
import {
    END_MERGED_TITLE_CELL,
    FIRST_ROW_INDEX,
    SECOND_ROW_INDEX,
    START_MERGED_TITLE_CELL,
    SUM_VALUE
} from '~/contants';
import type { COLUMN } from './config';
import { COLUMN_WIDTH } from './config';
import { roundNumber } from '~/utils';
import _ from 'lodash';

const formatRows = (worksheet: Worksheet) => {
    adjustColWidth(worksheet);
    worksheet.eachRow((row, rowNumber) => {
        if ([FIRST_ROW_INDEX, SECOND_ROW_INDEX].includes(row.number)) {
            return;
        }
        row.font = { name: 'Times New Roman', size: 12 };
        let merged = false;
        row.eachCell((cell) => {
            formatCellWithBorder(rowNumber, cell, worksheet);
            if (merged) return;
            merged = mergeCells(cell, worksheet);
        });
    });
};

const formatCellWithBorder = (row: number, cell: Cell, worksheet: Worksheet) => {
    const FIRST_ROW = 3;
    const LAST_ROW = worksheet.rowCount;
    if (row === FIRST_ROW || row === LAST_ROW) {
        const isFirstRow = row === FIRST_ROW;
        cell.border = {
            [isFirstRow ? 'top' : 'bottom']: {
                style: 'medium'
            } as Border
        };
    }
};

const mergeCells = (cell: Cell, worksheet: Worksheet): boolean => {
    const isSumCell = cell.value === SUM_VALUE;
    const isMultiplyCell = cell.value?.toString().includes('+');
    if (!isSumCell && !isMultiplyCell) {
        return false;
    }
    const { row, col } = cell;
    const startRow = +row;
    const startCol = +col;
    const endRow = startRow;
    const endCol = startCol + 2;
    worksheet.mergeCells(startRow, startCol, endRow, endCol);
    cell.alignment = { horizontal: 'center' };
    return true;
};

const roundIfDefined = (value?: number | null, decimalPlaces?: number): number | null => {
    return value ? roundNumber(value, decimalPlaces) : null;
};

const convertToProcessRow = (
    row: ConstructionSettlementTable | ConstructionSettlement
): ProccessRow => {
    const { order, category, length, width, quantity, squareMeters, price, totalCost, isSum } = row;
    const processedLength = () => {
        if (isSum && price !== 0) {
            return SUM_VALUE;
        }
        if (_.isString(length)) {
            return length;
        }
        return roundIfDefined(length);
    };
    return {
        order,
        category,
        length: processedLength(),
        width: roundIfDefined(width),
        quantity,
        squareMeters: roundIfDefined(squareMeters),
        price: roundIfDefined(price, 0),
        totalCost: roundIfDefined(totalCost, 0)
    };
};

const processConstructionSettlement = (
    constructionSettlement: ConstructionSettlementTable[]
): ProccessRow[] => {
    return constructionSettlement.flatMap((row) => {
        const processedRow = convertToProcessRow(row);
        const processedSubRows = row.details.map((subRow) => convertToProcessRow(subRow));
        return [processedRow, ...processedSubRows];
    });
};

const addTitle = (title: string, worksheet: Worksheet) => {
    worksheet.addRow([title]);
};

const formatTitleRow = (worksheet: Worksheet) => {
    worksheet.mergeCells(START_MERGED_TITLE_CELL, END_MERGED_TITLE_CELL);
    const row = worksheet.getRow(FIRST_ROW_INDEX);
    row.alignment = { vertical: 'middle', horizontal: 'center' };
    row.font = { name: 'Times New Roman', size: 16, bold: true };
};

const adjustColWidth = (worksheet: Worksheet) => {
    worksheet.eachColumnKey((col) => {
        col.width = COLUMN_WIDTH[col.number as COLUMN];
    });
};

export { formatRows, processConstructionSettlement, addTitle, formatTitleRow };
