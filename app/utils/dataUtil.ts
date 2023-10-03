import { ConstructionSettlementTable } from '~/types/ExcelModel/ConstructionSettlement';

export function getDefaultData(): ConstructionSettlementTable[] {
    return [
        {
            order: 'I',
            category: '',
            length: 0,
            width: 0,
            quantity: 0,
            squareMeters: null,
            price: 0,
            totalCost: null,
            details: [
                {
                    order: null,
                    category: '',
                    length: 0,
                    width: 0,
                    quantity: 0,
                    squareMeters: null,
                    price: 0,
                    totalCost: null
                },
                {
                    order: null,
                    category: '',
                    length: 0,
                    width: 0,
                    quantity: 0,
                    squareMeters: null,
                    price: 0,
                    totalCost: null
                },
                {
                    order: null,
                    category: '',
                    length: 0,
                    width: 0,
                    quantity: 0,
                    squareMeters: null,
                    price: 0,
                    totalCost: null
                },
                {
                    order: null,
                    category: '',
                    length: 0,
                    width: 0,
                    quantity: 0,
                    squareMeters: null,
                    price: 0,
                    totalCost: null
                }
            ]
        },
        {
            order: 'II',
            category: '',
            length: 0,
            width: 0,
            quantity: 0,
            squareMeters: null,
            price: 0,
            totalCost: null,
            details: [
                {
                    order: null,
                    category: '',
                    length: 0,
                    width: 0,
                    quantity: 0,
                    squareMeters: null,
                    price: 0,
                    totalCost: null
                },
                {
                    order: null,
                    category: '',
                    length: 0,
                    width: 0,
                    quantity: 0,
                    squareMeters: null,
                    price: 0,
                    totalCost: null
                },
                {
                    order: null,
                    category: '',
                    length: 0,
                    width: 0,
                    quantity: 0,
                    squareMeters: null,
                    price: 0,
                    totalCost: null
                },
                {
                    order: null,
                    category: '',
                    length: 0,
                    width: 0,
                    quantity: 0,
                    squareMeters: null,
                    price: 0,
                    totalCost: null
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
