import Excel from 'exceljs';
import path from 'path';
import type { ConstructionSettlementTable } from '~/types';
import { addTitle, formatRows, processConstructionSettlement } from './excelHelper';
import { COLUMNS } from '~/contants';

export async function doExcel(constructionSettlement: ConstructionSettlementTable[]) {
    if (!constructionSettlement) {
        throw new Error('No data is provided');
    }

    const processedConstructionSettlement = processConstructionSettlement(constructionSettlement);
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet('Construction Settlement');
    addTitle('Bang quyet toan cong trinh', worksheet);
    worksheet.getRow(3).values = COLUMNS.map((col) => col.header);
    worksheet.columns = COLUMNS.map((col) => ({
        key: col.key
    }));

    worksheet.addRows(processedConstructionSettlement);
    formatRows(worksheet);
    const exportPath = path.resolve('./', 'Bang quyet toan cong trinh.xlsx');

    await workbook.xlsx.writeFile(exportPath);
}
