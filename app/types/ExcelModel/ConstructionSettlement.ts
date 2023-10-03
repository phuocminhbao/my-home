export interface ConstructionSettlement {
    order: string | number | null;
    category: string | null;
    length: number | string | null;
    width: number | null;
    quantity: number | null;
    squareMeters: number | null;
    price: number | null;
    totalCost: number | null;
}

export interface ConstructionSettlementTable extends ConstructionSettlement {
    details: ConstructionSettlement[] | null;
}
