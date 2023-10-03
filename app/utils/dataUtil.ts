import { ConstructionSettlementTable } from '~/types/ExcelModel/ConstructionSettlement';

export function getDefaultData(): ConstructionSettlementTable[] {
    return [
        {
            order: 'I',
            category: undefined,
            length: undefined,
            width: undefined,
            quantity: undefined,
            squareMeters: undefined,
            price: undefined,
            totalCost: undefined,
            details: [
                {
                    order: undefined,
                    category: undefined,
                    length: undefined,
                    width: undefined,
                    quantity: undefined,
                    squareMeters: undefined,
                    price: undefined,
                    totalCost: undefined
                },
                {
                    order: undefined,
                    category: undefined,
                    length: undefined,
                    width: undefined,
                    quantity: undefined,
                    squareMeters: undefined,
                    price: undefined,
                    totalCost: undefined
                },
                {
                    order: undefined,
                    category: undefined,
                    length: undefined,
                    width: undefined,
                    quantity: undefined,
                    squareMeters: undefined,
                    price: undefined,
                    totalCost: undefined
                },
                {
                    order: undefined,
                    category: undefined,
                    length: undefined,
                    width: undefined,
                    quantity: undefined,
                    squareMeters: undefined,
                    price: undefined,
                    totalCost: undefined
                }
            ]
        },
        {
            order: 'II',
            category: undefined,
            length: undefined,
            width: undefined,
            quantity: undefined,
            squareMeters: undefined,
            price: undefined,
            totalCost: undefined,
            details: [
                {
                    order: undefined,
                    category: undefined,
                    length: undefined,
                    width: undefined,
                    quantity: undefined,
                    squareMeters: undefined,
                    price: undefined,
                    totalCost: undefined
                },
                {
                    order: undefined,
                    category: undefined,
                    length: undefined,
                    width: undefined,
                    quantity: undefined,
                    squareMeters: undefined,
                    price: undefined,
                    totalCost: undefined
                },
                {
                    order: undefined,
                    category: undefined,
                    length: undefined,
                    width: undefined,
                    quantity: undefined,
                    squareMeters: undefined,
                    price: undefined,
                    totalCost: undefined
                },
                {
                    order: undefined,
                    category: undefined,
                    length: undefined,
                    width: undefined,
                    quantity: undefined,
                    squareMeters: undefined,
                    price: undefined,
                    totalCost: undefined
                }
            ]
        }
    ];
}

export const columnType = [
    { key: 'index', header: 'STT' },
    { key: 'category', header: 'HẠNG MỤC' },
    { key: 'length', header: 'DÀI' },
    { key: 'width', header: 'RỘNG' },
    { key: 'quantity', header: 'SL' },
    { key: 'squareMeters', header: 'M2' },
    { key: 'price', header: 'ĐƠN GIÁ' },
    { key: 'totalCost', header: 'THÀNH TIỀN' }
];
