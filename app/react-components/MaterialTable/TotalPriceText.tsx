import useMaterialData from './hook/useMaterialData';

const TotalPriceText = () => {
    const { getFinalCost } = useMaterialData();
    const totalPrice = getFinalCost();
    return <>Todo: Display total price as text for {totalPrice}</>;
};

export default TotalPriceText;
