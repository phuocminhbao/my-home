import Excel from 'exceljs';
import path from 'path';
import { mockData } from './mockData';

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
    const exportPath = path.resolve('./', 'Bang quyet toan cong trinh.xlsx');

    await workbook.xlsx.writeFile(exportPath);
    console.log('Backend here');
};