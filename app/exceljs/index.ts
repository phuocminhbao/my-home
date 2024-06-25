import type { Worksheet } from 'exceljs';
import Excel from 'exceljs';
import path from 'path';
import type { ConstructionSettlementTable } from '~/types';
import { addTitle, formatRows, formatTitleRow, processConstructionSettlement } from './excelHelper';
import { COLUMNS } from '~/contants';

const WORK_SHEET = 'Construction Settlement';
const TABLE_HEADER_ROW_INDEX = 3;

const processTitle = (worksheet: Worksheet) => {
    addTitle('Bang quyet toan cong trinh', worksheet);
    formatTitleRow(worksheet);
};

const processTable = (
    worksheet: Worksheet,
    constructionSettlement: ConstructionSettlementTable[]
) => {
    setupTableHead(worksheet);
    addTableBody(worksheet, constructionSettlement);
    formatRows(worksheet);
};

const setupTableHead = (worksheet: Worksheet) => {
    worksheet.getRow(TABLE_HEADER_ROW_INDEX).values = COLUMNS.map((col) => col.header);
    worksheet.columns = COLUMNS.map((col) => ({
        key: col.key
    }));
};

const addTableBody = (
    worksheet: Worksheet,
    constructionSettlement: ConstructionSettlementTable[]
) => {
    const processedConstructionSettlement = processConstructionSettlement(constructionSettlement);
    worksheet.addRows(processedConstructionSettlement);
};

const setupWorksheet = (worksheet: Worksheet) => {};

export async function doExcel(constructionSettlement: ConstructionSettlementTable[]) {
    if (!constructionSettlement) {
        throw new Error('No data is provided');
    }

    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet(WORK_SHEET);
    setupWorksheet(worksheet);
    processTitle(worksheet);
    processTable(worksheet, constructionSettlement);

    const exportPath = path.resolve('./', 'Bang quyet toan cong trinh.xlsx');
    await workbook.xlsx.writeFile(exportPath);
}
