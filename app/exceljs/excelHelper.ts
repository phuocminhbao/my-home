import type { Border, Cell, Column, Worksheet } from 'exceljs';
import type { ConstructionSettlement, ConstructionSettlementTable } from '~/types';
import type { ProccessRow } from './types';
import _ from 'lodash';

const formatRows = (worksheet: Worksheet) => {
    worksheet.eachColumnKey((col) => {
        adjustColWidth(col);
    });
    worksheet.eachRow((row, rowNumber) => {
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
    const isSumCell = cell.value === 'CỘNG';
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

const convertToProcessRow = (
    row: ConstructionSettlementTable | ConstructionSettlement
): ProccessRow => {
    const { order, category, length, width, quantity, squareMeters, price, totalCost, isSum } = row;
    return {
        order,
        category,
        length: isSum && price !== 0 ? 'CỘNG' : length,
        width: width ? width : null,
        quantity,
        squareMeters,
        price: price ? price : null,
        totalCost: totalCost ? totalCost : null
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

const adjustColWidth = (col: Column) => {
    const widths = col.values
        .map((value) => value?.toString().length)
        .filter((value) => !_.isNil(value)) as number[];
    console.log(widths);
    const maxColWidth = Math.max(...widths);
    console.log(maxColWidth);
    col.width = maxColWidth < 12 ? 12 : maxColWidth;
};

export { formatRows, processConstructionSettlement, addTitle };
