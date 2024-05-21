import Excel from 'exceljs';
import path from 'path';
import type { ConstructionSettlement, ConstructionSettlementTable } from '~/types';

type ProccessRow = Pick<
    ConstructionSettlement,
    'order' | 'category' | 'length' | 'width' | 'quantity' | 'squareMeters' | 'price' | 'totalCost'
>;

export async function doExcel(constructionSettlement: ConstructionSettlementTable[]) {
    if (!constructionSettlement) {
        throw new Error('No data is provided');
    }

    const processedConstructionSettlement = processConstructionSettlement(constructionSettlement);
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet('Construction Settlement');

    worksheet.columns = [
        { key: 'order', header: 'STT' },
        { key: 'category', header: 'HẠNG MỤC' },
        { key: 'length', header: 'DÀI' },
        { key: 'width', header: 'RỘNG' },
        { key: 'quantity', header: 'SL' },
        { key: 'squareMeters', header: 'M2' },
        { key: 'price', header: 'ĐƠN GIÁ' },
        { key: 'totalCost', header: 'THÀNH TIỀN' }
    ];

    worksheet.addRows(processedConstructionSettlement);
    worksheet.eachRow((row, rowNumber) => {
        let merged = false;
        row.eachCell((cell) => {
            if (rowNumber === 1) {
                cell.border = {
                    top: {
                        style: 'double'
                    }
                };
            }
            if (rowNumber === worksheet.rowCount) {
                cell.border = {
                    bottom: {
                        style: 'double'
                    }
                };
            }
            if (merged) return;
            if (cell.value === 'CỘNG') {
                worksheet.mergeCells(+cell.row, +cell.col, +cell.row, +cell.col + 2);
                merged = true;
                cell.alignment = { horizontal: 'center' };
                return;
            }
            if (cell.value?.toString().includes('+')) {
                worksheet.mergeCells(+cell.row, +cell.col, +cell.row, +cell.col + 1);
                merged = true;
                cell.alignment = { horizontal: 'center' };
                return;
            }
        });
    });
    const exportPath = path.resolve('./', 'Bang quyet toan cong trinh.xlsx');

    await workbook.xlsx.writeFile(exportPath);
}

const processConstructionSettlement = (
    constructionSettlement: ConstructionSettlementTable[]
): ProccessRow[] => {
    return constructionSettlement.flatMap((row) => {
        const processedRow = convertToProcessRow(row);
        const processedSubRows = row.details.map((subRow) => convertToProcessRow(subRow));
        return [processedRow, ...processedSubRows];
    });
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
