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
	const [order, setOrder] = useState<null | TOrder>(null);

	const { createOrderOnChain } = useCreateOrderOnChain();
	const { nftIds } = useGetUserNftIds(walletAddress, isSuccess);

	const { mutateAsync, ...props } = useMutation({
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

				setIsSuccess(true);
			} catch {
				toast({
					title: "There was an error placing order",
					variant: "destructive",
				});
				setIsSuccess(false);
				setIsLoading(false);
				await OrderService.deleteOrder(order._id);
			}
		} catch {
			toast({
				title: "There was an error placing order",
				variant: "destructive",
			});
			setIsLoading(false);
			setIsSuccess(false);
		}
	}

	useEffect(() => {
		if (isSuccess && nftIds?.length && nftIds.length > 0 && order) {
			(async () => {
				console.log(nftIds);
				const stringNftId = nftIds[nftIds.length - 1].toString();
				console.log(stringNftId);
				try {
					await OrderService.updateOrderNftId({
						orderId: order._id,
						nftId: Number(stringNftId),
					});
					toast({
						title: "Order placed successfully",
					});
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
	}, [nftIds, order, isSuccess]);

	return { createOrder, isLoading, ...props };
}
