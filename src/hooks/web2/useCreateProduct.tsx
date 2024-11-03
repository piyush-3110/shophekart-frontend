import { HttpRequestService } from "@/services";
import { IProduct } from "@/types";
import { useMutation } from "@tanstack/react-query";
import useCreateProductOnChain from "../web3/useCreateProductOnChain";
import { createTokenUri } from "@/utils";
import customToast from "@/utils/toasts";
import useUpdateProductNftId from "./useUpdateProductOnChainId";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function useAddProduct(userWalletAddress: `0x${string}`) {
	const [productId, setProductId] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { push, prefetch } = useRouter();

	const { mutateAsync, ...props } = useMutation({
		async mutationFn(params: FormData) {
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
					await updateProductOnChainId({
						onChainId,
						productId,
					});
					push(`/itemDetails/${productId}`);
					customToast.success("Product created successfully");
				} catch {
					customToast.error("There was an error while creating product");
				} finally {
					setIsLoading(false);
				}
			})();
		}
	}, [isSuccess, onChainIds, productId]);

	async function addProduct(params: FormData) {
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
				await createProductOnChain({
					currencyAddress: product.currencyAddress as `0x${string}`,
					price: product.price,
					shippingCharges: product.shippingCharges,
					tokenUri,
					stock: product.stock,
				});
			} catch {
				customToast.error("Error while creating product");
				await HttpRequestService.deleteApi<IProduct>(
					`/product/${product._id}/delete`
				);
				setIsLoading(false);
			}
		} catch {
			setIsLoading(false);
			customToast.error("Error while creating product");
		}
	}

	return { addProduct, ...props, isLoading };
}
