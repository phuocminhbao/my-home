import type { Worksheet } from 'exceljs';
import Excel from 'exceljs';
import path from 'path';
import type { ConstructionSettlementTable } from '~/types';
import { addTitle, formatRows, formatTitleRow, processConstructionSettlement } from './excelHelper';
import { COLUMNS } from '~/constants';
import { exec } from 'child_process';

const WORK_SHEET = 'Construction Settlement';
const TABLE_HEADER_ROW_INDEX = 3;

const processTitle = (worksheet: Worksheet, constructionName: string) => {
    addTitle(`BẢNG QUYẾT TOÁN CÔNG TRÌNH ${constructionName.toUpperCase()}`, worksheet);
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

export async function doExcel(
    constructionSettlement: ConstructionSettlementTable[],
    constructionName: string
) {
    if (!constructionSettlement) {
        throw new Error('No data is provided');
    }

    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet(WORK_SHEET);
    setupWorksheet(worksheet);
    processTitle(worksheet, constructionName);
    processTable(worksheet, constructionSettlement);
    const exportPath = path.resolve('./', 'bang_quyet_toan_cong_trinh.xlsx');
    await workbook.xlsx.writeFile(exportPath);
    if (process.env.NODE_ENV === 'development') {
        exec('.\\bang_quyet_toan_cong_trinh.xlsx', (error) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
        });
    }
}
