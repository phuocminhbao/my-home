import { createContext } from 'react';
import { ConstructionSettlementTable } from '~/types';

type MaterialDataProps = {
    data: ConstructionSettlementTable[];
    updateData: React.Dispatch<React.SetStateAction<ConstructionSettlementTable[]>>;
};

const MaterialDataContext = createContext<MaterialDataProps>({ data: [], updateData: () => {} });

export default MaterialDataContext;
