import { createContext } from 'react';
import type { ConstructionSettlementTable } from '~/types';

type MaterialDataProps = {
    data: ConstructionSettlementTable[];
    updateData: React.Dispatch<React.SetStateAction<ConstructionSettlementTable[]>>;
};

const MaterialDataContext = createContext<MaterialDataProps | null>(null);

export default MaterialDataContext;
