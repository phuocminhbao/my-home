import type { ConstructionSettlement } from '~/types';

type ProccessRow = Pick<
    ConstructionSettlement,
    'order' | 'category' | 'length' | 'width' | 'quantity' | 'squareMeters' | 'price' | 'totalCost'
>;

export type { ProccessRow };
