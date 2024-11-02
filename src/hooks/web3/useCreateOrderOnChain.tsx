import { TCurrencyType } from "@/types/product"
import useApproveTokenTransaction from "./useApproveTokenTransaction"
import useCreateOrderUsingBNB from "./useCreateOrderUsingBNB"
import useCreateOrderUsingOtherToken from "./useCreateOrderUsingOtherToken"

export default function useCreateOrderOnChain(){

    const { createOrderUsingBNB } = useCreateOrderUsingBNB()
    const {approveTokenTransaction} = useApproveTokenTransaction()
    const {createOrderUsingOtherToken} = useCreateOrderUsingOtherToken()

    async function createOrderOnChain({currencyType, productIdOnChain, shippingPrice, price}:TParams){
        if (currencyType === "BNB") {
            await createOrderUsingBNB(productIdOnChain, shippingPrice, price)
        } else{
            await approveTokenTransaction(currencyType.toLowerCase(),(shippingPrice+price))
            await createOrderUsingOtherToken(productIdOnChain)
        }
    }

    return {createOrderOnChain}
}

type TParams = {
    currencyType:TCurrencyType;
    productIdOnChain:number;
    shippingPrice:number;
    price:number
}
