import { useMutation } from "@tanstack/react-query";
import { toast } from "../use-toast";
import { OrderService } from "@/services";
import { TCreateOrderParams } from "@/services/order.service";
import { TCurrencyType } from "@/types/product";
import { useEffect, useState } from "react";
import useCreateOrderOnChain from "../web3/useCreateOrderOnChain";
import useGetUserNftIds from "../web3/useGetUserNftIds";
import { TOrder } from "@/types";

export default function useCreateOrder(walletAddress: `0x${string}`) {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const [onChainSuccess, setOnChainSuccess] = useState<boolean>(false);
	const [order, setOrder] = useState<null | TOrder>(null);

	const { createOrderOnChain } = useCreateOrderOnChain();
	const { nftIds } = useGetUserNftIds(walletAddress, onChainSuccess);

	const { mutateAsync } = useMutation({
		mutationFn: async ({ ...params }: TCreateOrderParams) => {
			const response = await OrderService.createOrder({ ...params });
			return response;
		},
	});

	async function createOrder(
		{ ...data }: TCreateOrderParams,
		price: number,
		currencyType: TCurrencyType
	) {
		setIsLoading(true);
		setIsSuccess(false);
		setOnChainSuccess(false);
		try {
			const order = await mutateAsync(data);
			setOrder(order);
			try {
				await createOrderOnChain({
					currencyType,
					price,
					productIdOnChain: data.productIdOnChain,
					shippingPrice: data.shippingPrice,
				});
				setOnChainSuccess(true);
			} catch {
				toast({
					title: "There was an error placing order",
					variant: "destructive",
				});
				setIsSuccess(false);
				setOnChainSuccess(false);
				setIsLoading(false);
				await OrderService.deleteOrder(order._id);
			}
		} catch {
			setOnChainSuccess(false);
			toast({
				title: "There was an error placing order",
				variant: "destructive",
			});
			setIsLoading(false);
			setIsSuccess(false);
		}
	}

	useEffect(() => {
		console.log("onChainSuccess", onChainSuccess);
		console.log("nftIds:", nftIds?.length);
		console.log("order:", order);
		if (onChainSuccess && nftIds?.length && nftIds.length > 0 && order) {
			(async () => {
				const stringNftId = nftIds[nftIds.length - 1].toString();
				try {
					await OrderService.updateOrderNftId({
						orderId: order._id,
						nftId: Number(stringNftId),
					});
					toast({
						title: "Order placed successfully",
					});
					setIsSuccess(true);
				} catch {
					toast({
						title: "There was an error placing order",
						variant: "destructive",
					});
				} finally {
					setIsLoading(false);
				}
			})();
		}
	}, [nftIds, order, onChainSuccess]);

	return { createOrder, isLoading, isSuccess, orderId: order?._id };
}
