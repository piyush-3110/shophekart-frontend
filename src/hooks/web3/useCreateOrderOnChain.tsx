import { TCurrencyType } from "@/types/product";
import useApproveTokenTransaction from "./useApproveTokenTransaction";
import useCreateOrderUsingBNB from "./useCreateOrderUsingBNB";
import useCreateOrderUsingOtherToken from "./useCreateOrderUsingOtherToken";
import { useState } from "react";

export default function useCreateOrderOnChain() {
	const [isSuccess, setIsSuccess] = useState<boolean>(false);

	const { createOrderUsingBNB } = useCreateOrderUsingBNB();
	const { approveTokenTransaction } = useApproveTokenTransaction();
	const { createOrderUsingOtherToken } = useCreateOrderUsingOtherToken();

	async function createOrderOnChain({
		currencyType,
		productIdOnChain,
		shippingPrice,
		price,
	}: TParams) {
		setIsSuccess(false);
		if (currencyType === "BNB") {
			await createOrderUsingBNB(productIdOnChain, shippingPrice, price);
		} else {
			await approveTokenTransaction(
				currencyType.toLowerCase(),
				shippingPrice + price
			);
			await createOrderUsingOtherToken(productIdOnChain);
		}
		setIsSuccess(true);
	}

	return { createOrderOnChain, isSuccess };
}

type TParams = {
	currencyType: TCurrencyType;
	productIdOnChain: number;
	shippingPrice: number;
	price: number;
};
