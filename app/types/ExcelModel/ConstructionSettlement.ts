export interface ConstructionSettlement {
    order?: string | number;
    category?: string;
    length?: number | string;
    width?: number;
    quantity?: number;
    squareMeters?: number;
    price?: number;
    totalCost?: number;
}

export interface ConstructionSettlementTable extends ConstructionSettlement {
    details?: ConstructionSettlement[];
}
