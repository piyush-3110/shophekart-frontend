import { HttpRequestService } from "@/services";
import { IProduct } from "@/types";
import { useMutation } from "@tanstack/react-query";
import useCreateProductOnChain from "../web3/useCreateProductOnChain";
import { createTokenUri } from "@/utils";
import customToast from "@/utils/toasts";
import useUpdateProductNftId from "./useUpdateProductOnChainId";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ContractFunctionExecutionError } from "viem";
import { waitForTransactionReceipt } from "@wagmi/core";
import { config } from "@/config";

export default function useAddProduct(userWalletAddress: `0x${string}`) {
	const [productId, setProductId] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isProductCreateSuccess, setIsProductCreateSuccess] =
		useState<boolean>(false);
	const { push, prefetch } = useRouter();

	const { mutateAsync, ...props } = useMutation({
		async mutationFn(params: FormData) {
			setIsProductCreateSuccess(false);
			const { data } = await HttpRequestService.postApi<IProduct, FormData>(
				"/fixedProduct/create",
				params,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);
			return data;
		},
	});

	const { createProductOnChain, isSuccess, onChainIds } =
		useCreateProductOnChain(userWalletAddress);
	const { updateProductOnChainId } = useUpdateProductNftId();

	const updateProductOnChainIdCallback = useCallback(
		async ({
			onChainId,
			productId,
		}: {
			onChainId: string;
			productId: string;
		}) => {
			await updateProductOnChainId({ onChainId, productId });
		},
		[updateProductOnChainId]
	);

	useEffect(() => {
		if (productId) {
			prefetch(`/itemDetails/${productId}`);
		}

		if (isSuccess && onChainIds) {
			(async () => {
				const onChainId = (onChainIds as bigint[])[
					(onChainIds as number[]).length - 1
				].toString();

				try {
					await updateProductOnChainIdCallback({
						onChainId,
						productId,
					});
					setIsProductCreateSuccess(true);
					push(`/itemDetails/${productId}`);
					customToast.success("Product created successfully");
				} catch {
					customToast.error("There was an error while creating product");
				} finally {
					setIsLoading(false);
				}
			})();
		}
	}, [
		isSuccess,
		onChainIds,
		productId,
		prefetch,
		push,
		updateProductOnChainIdCallback,
	]);

	const addProduct = useCallback(
		async (params: FormData) => {
			setIsLoading(true);
			try {
				const product = await mutateAsync(params);
				setProductId(product._id);
				try {
					const tokenUri = await createTokenUri({
						name: product.name,
						category: product.category,
						currencyType: product.currencyType,
						description: product.description,
						image: product.images[0],
						price: product.price.toString(),
					});
					const hash = await createProductOnChain({
						currencyAddress: product.currencyAddress as `0x${string}`,
						price: product.price,
						shippingCharges: product.shippingCharges,
						tokenUri,
						stock: product.stock,
					});
					await waitForTransactionReceipt(config, { hash });
				} catch (error) {
					if (error instanceof ContractFunctionExecutionError) {
						if (
							error.message.includes(
								"executing this transaction exceeds the balance of the account."
							)
						) {
							customToast.error("You don't have enough funds");
						}
					} else {
						customToast.error("Error while creating product");
					}
					await HttpRequestService.deleteApi<IProduct>(
						`/product/${product._id}/delete`
					);
					setIsLoading(false);
				}
			} catch {
				setIsLoading(false);
				customToast.error("Error while creating product");
			}
		},
		[mutateAsync, createProductOnChain, setIsLoading]
	);

	return { addProduct, ...props, isLoading, isProductCreateSuccess };
}
