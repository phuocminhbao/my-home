import Excel from 'exceljs';
import path from 'path';
import type { ConstructionSettlement } from '~/types/ExcelModel/ConstructionSettlement';

// type Country = {
//     name: string;
//     countryCode: string;
//     capital: string;
//     phoneIndicator: number;
// };

// const countries: Country[] = [
//     {
//         name: 'Cameroon',
//         capital: 'Yaounde',
//         countryCode: 'CM',
//         phoneIndicator: 237
//     },
//     { name: 'France', capital: 'Paris', countryCode: 'FR', phoneIndicator: 33 },
//     {
//         name: 'United States',
//         capital: 'Washington, D.C.',
//         countryCode: 'US',
//         phoneIndicator: 1
//     },
//     {
//         name: 'India',
//         capital: 'New Delhi',
//         countryCode: 'IN',
//         phoneIndicator: 91
//     },
//     {
//         name: 'Brazil',
//         capital: 'Brasília',
//         countryCode: 'BR',
//         phoneIndicator: 55
//     },
//     { name: 'Japan', capital: 'Tokyo', countryCode: 'JP', phoneIndicator: 81 },
//     {
//         name: 'Australia',
//         capital: 'Canberra',
//         countryCode: 'AUS',
//         phoneIndicator: 61
//     },
//     { name: 'Nigeria', capital: 'Abuja', countryCode: 'NG', phoneIndicator: 234 },
//     { name: 'Germany', capital: 'Berlin', countryCode: 'DE', phoneIndicator: 49 }
// ];

const EXPORT_FOLDER = `C:/Excel`;

const mockData: ConstructionSettlement[] = [
    {
        index: '1',
        category: 'cate 1',
        length: 1.22,
        width: 0.32,
        quantity: 22,
        squareMeters: 8.59,
        price: null,
        totalCost: null
    },
    {
        index: '2',
        category: 'cate 2',
        length: 1.22,
        width: 0.32,
        quantity: 22,
        squareMeters: 8.59,
        price: null,
        totalCost: null
    },
    {
        index: null,
        category: null,
        length: 1.22,
        width: 0.32,
        quantity: 22,
        squareMeters: 8.59,
        price: null,
        totalCost: null
    }
];

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

    // mockData.forEach((item) => {
    //     worksheet.addRow(item);
    // });
    worksheet.addRows(mockData);
    worksheet.addRow(singleSum);
    const exportPath = path.resolve('./', 'Bang quuyet toan cong trinh.xlsx');

    await workbook.xlsx.writeFile(exportPath);
    console.log('Backend here');
}
