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

export { columnType, getColWidth };
