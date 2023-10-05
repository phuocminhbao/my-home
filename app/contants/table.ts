import { ConstructionSettlementTable } from "~/types";

const columnType = [
    { key: 'index', header: 'STT' },
    { key: 'category', header: 'HẠNG MỤC' },
    { key: 'length', header: 'DÀI' },
    { key: 'width', header: 'RỘNG' },
    { key: 'quantity', header: 'SL' },
    { key: 'squareMeters', header: 'M2' },
    { key: 'price', header: 'ĐƠN GIÁ' },
    { key: 'totalCost', header: 'THÀNH TIỀN' }
];

const getColWidth: Record<string, string> = {
    index: '5%',
    category: '20%',
    length: '14%',
    width: '14%',
    quantity: '5%',
    squareMeters: '8%',
    price: '14%',
    totalCost: '14%'
};

const initTableData: ConstructionSettlementTable[] = [
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

const initAccordionRowData = {
    order: null,
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

const initDetailsRowData = {
    order: null,
    category: '',
    length: 0,
    width: 0,
    quantity: 0,
    squareMeters: null,
    price: 0,
    totalCost: null
};

export { columnType, getColWidth, initTableData, initAccordionRowData, initDetailsRowData };
