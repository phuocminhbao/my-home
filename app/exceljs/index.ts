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
        length: isSum ? 'CỘNG' : length,
        width,
        quantity,
        squareMeters,
        price,
        totalCost
    };
};
