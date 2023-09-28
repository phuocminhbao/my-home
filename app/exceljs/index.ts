import Excel from 'exceljs';
import path from 'path';
import type { ConstructionSettlement } from '~/types/ExcelModel/ConstructionSettlement';
import { mockData } from './mockData';

const EXPORT_FOLDER = `C:/Excel`;

const singleSum: ConstructionSettlement = {
    index: null,
    category: null,
    length: null,
    width: null,
    quantity: null,
    squareMeters: 13.48,
    price: 960000,
    totalCost: 12938208
};

export async function doExcel() {
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet('Construction Settlement');

    worksheet.columns = [
        { key: 'index', header: 'STT' },
        { key: 'category', header: 'HẠNG MỤC' },
        { key: 'length', header: 'DÀI' },
        { key: 'width', header: 'RỘNG' },
        { key: 'quantity', header: 'SL' },
        { key: 'squareMeters', header: 'M2' },
        { key: 'price', header: 'ĐƠN GIÁ' },
        { key: 'totalCost', header: 'THÀNH TIỀN' }
    ];

    worksheet.addRows(mockData);
    worksheet.addRow(singleSum);
    const exportPath = path.resolve('./', 'Bang quyet toan cong trinh.xlsx');

    await workbook.xlsx.writeFile(exportPath);
    console.log('Backend here');
};