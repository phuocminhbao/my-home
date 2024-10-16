export interface ConstructionSettlement {
    isSelected: boolean;
    id: number;
    order: string | number | null;
    category: string | null;
    length: number | string | null;
    width: number | null;
    quantity: number | null;
    squareMeters: number | null;
    price: number | null;
    totalCost: number | null;
    isSum: boolean;
    isMultiply: boolean;
}

export interface ConstructionSettlementTable extends ConstructionSettlement {
    details: ConstructionSettlement[];
}

export interface ExcelDownload {
    constructionName: string;
    data: ConstructionSettlementTable[];
}
